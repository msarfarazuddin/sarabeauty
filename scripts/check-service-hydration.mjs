import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import WebSocket from 'next/dist/compiled/ws/index.js';

const data = JSON.parse(fs.readFileSync(new URL('../src/data/service-seo.json', import.meta.url), 'utf8'));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'sara-seo-browser-'));
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = spawn(chrome, ['--headless=new', '--disable-gpu', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
try {
  const portFile = path.join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !fs.existsSync(portFile); i++) await delay(100);
  assert.ok(fs.existsSync(portFile), 'Headless Chrome did not start');
  const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.once('open', resolve); socket.once('error', reject); });
  let id = 0;
  const pending = new Map();
  const errors = [];
  let currentPage = '';
  socket.on('message', raw => {
    const message = JSON.parse(raw.toString());
    if (message.id) {
      const request = pending.get(message.id);
      if (request) {
        pending.delete(message.id);
        if (message.error) request.reject(new Error(message.error.message));
        else request.resolve(message.result);
      }
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push({ page: currentPage, exception: message.params.exceptionDetails });
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push({ page: currentPage, console: message.params.args.map(arg => arg.value ?? arg.description).join(' ') });
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id;
    const timeout = setTimeout(() => { pending.delete(requestId); reject(new Error(`CDP timed out: ${method}`)); }, 20000);
    pending.set(requestId, { resolve: value => { clearTimeout(timeout); resolve(value); }, reject: error => { clearTimeout(timeout); reject(error); } });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
  const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true })).result.value;
  await send('Page.enable');
  await send('Runtime.enable');
  for (const slug of Object.keys(data)) {
    currentPage = slug;
    await send('Page.navigate', { url: `${process.argv[2] || 'http://localhost:3000'}/services/${slug}` });
    let ready = false;
    for (let i = 0; i < 100; i++) {
      await delay(100);
      ready = await evaluate(`location.pathname === ${JSON.stringify('/services/' + slug + '/')} && document.readyState === 'complete' && document.title === ${JSON.stringify(data[slug].metaTitle)}`);
      if (ready) break;
    }
    assert.ok(ready, `${slug}: page failed to load`);
    await delay(300);
    const faqButton = `[...document.querySelectorAll('button[aria-expanded]')].find(button => button.textContent.trim() === ${JSON.stringify(data[slug].faqs[1].question)})`;
    await evaluate(`${faqButton}.click()`);
    let expanded = false;
    for (let i = 0; i < 30; i++) {
      await delay(100);
      expanded = await evaluate(`${faqButton}?.getAttribute('aria-expanded') === 'true'`);
      if (expanded) break;
    }
    assert.ok(expanded, `${slug}: FAQ did not respond after hydration`);
  }
  assert.deepEqual(errors, [], 'Browser console/runtime errors');
  currentPage = 'home navigation';
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `${process.argv[2] || 'http://localhost:3000'}/` });
  for (let i = 0; i < 100; i++) {
    await delay(100);
    if (await evaluate(`location.pathname === '/' && document.readyState === 'complete'`)) break;
  }
  await delay(500);
  await evaluate(`document.querySelector('button[aria-label="Toggle services menu"]').click()`);
  await delay(200);
  assert.equal(await evaluate(`document.querySelector('button[aria-label="Toggle services menu"]').getAttribute('aria-expanded')`), 'true');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(`document.querySelector('button[aria-label="Toggle menu"]').click()`);
  await delay(200);
  assert.ok(await evaluate(`document.querySelector('button[aria-label="Close menu"]') !== null`));
  await evaluate(`document.querySelector('button[aria-label="Close menu"]').click()`);
  await delay(200);
  assert.equal(await evaluate(`document.querySelector('button[aria-label="Toggle menu"]').getAttribute('aria-expanded')`), 'false');
  fs.mkdirSync('reports', { recursive: true });
  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/navigation-mobile.png', Buffer.from(screenshot.data, 'base64'));
  assert.deepEqual(errors, [], 'Navigation browser errors');
  console.log(JSON.stringify({ pages: Object.keys(data).length, faqInteractions: Object.keys(data).length, browserErrors: errors.length, status: 'passed' }));
  await send('Browser.close').catch(() => {});
} finally {
  socket?.close();
  browser.kill();
  await delay(300);
  const resolved = path.resolve(profile);
  if (resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('sara-seo-browser-')) {
    fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
}
