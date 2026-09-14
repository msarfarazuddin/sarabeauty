const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const spa = 'Sara Beauty’s home spa';
const rules = [
  [/\bwithout (?:ever )?(?:leaving|stepping (?:out of|outside)) (?:your|the|their)?\s*(?:own )?(?:home|house|space|residence|comfort zone)\b/gi, `at ${spa}`],
  [/\bwithout (?:leaving home|stepping out|travel(?:ling|ing)?(?:, waiting, or leaving your home)?|the need to travel(?: to (?:a spa|a salon|a wellness center))?)\b/gi, `at ${spa}`],
  [/\b(?:in|from|within) the (comfort(?: and privacy)?|privacy(?: and (?:familiar )?comfort)?|sanctuary) of (?:your|their|her) (?:own )?home\b/gi, `in the $1 of ${spa}`],
  [/\b(?:in|from|within) (?:your|their|her) (?:own )?(?:home|residence|living room|bedroom|personal space|comfortable environment|familiar environment|space)\b/gi, `at ${spa}`],
  [/\b(?:at|right at|directly at) (?:your|their|her) (?:own )?(?:home|residence|doorstep|door|location)\b/gi, `at ${spa}`],
  [/\b(?:directly|straight|right) to (?:your|their) (?:home|doorstep|door|location)\b/gi, `at ${spa}`],
  [/\bto (?:your|their) (?:home|doorstep|door)\b/gi, `at ${spa}`],
  [/\b(?:your|their|her) own home\b/gi, spa],
  [/\b(?:your|their) home\b/gi, spa],
  [/\b(?:at[ -]home|in-home|home-based) (massage|spa|treatments?|sessions?|services?|deep tissue|wellness|care|therapy|therapists?|hammam|beauty|relaxation|prenatal|postnatal|aromatherapy|experience)/gi, 'home spa $1'],
  [/\b(?:at|in) home\b/gi, `at ${spa}`],
  [/\bhome[ -]services?\b/gi, 'home spa appointments'],
  [/\bmobile spa\b/gi, 'private home spa'],
  [/\bmobile (massage|therapists?)\b/gi, 'home spa $1'],
  [/\bdoorstep (service|massage|spa|convenience)\b/gi, 'home spa $1'],
  [/\bhome massage\b/gi, 'home spa massage'],
  [/\bhome sessions\b/gi, 'sessions at our home spa'],
  [/\bhome spa spa\b/gi, 'home spa'],
];
function rewrite(value) {
  if (/^(?:https?:|\/assets\/|\/|@|\.)/.test(value)) return value;
  let result = value;
  for (const [pattern, replacement] of rules) result = result.replace(pattern, replacement);
  return result;
}
const exact = new Map([
 ['No travel, no traffic, no waiting.', 'A private setting and appointments planned around your schedule.'],
 ['No travel or waiting time', 'Appointments at our private home spa'],
 ['No traffic or waiting time', 'A calm setting for your appointment'],
 ['No commuting required', 'Visit our private home spa'],
 ['No need to travel or wait at a spa', 'Book a time to visit our private home spa'],
 ['Time efficiency — no commute or waiting time', 'Flexible scheduling — book a time for your spa visit'],
 ['Time Efficiency – No commuting or waiting in queues.', 'Flexible Scheduling – Plan your home spa visit around your day.'],
 ['Convenience – No need to commute or wait in long queues.', 'Convenience – Book your preferred time to visit our home spa.'],
 ['No Travel Hassles : Avoid traffic and parking struggles.', 'Easy Booking: Contact our team to plan your spa visit.'],
 ['Convenience – No need to travel in the cooler evenings.', 'Convenience – Arrange a spa visit at a time that suits you.'],
 ['Mobile service. no need to travel after a tiring workout', 'Private home spa sessions for relaxation after a workout'],
 ['No commute time — especially valuable after a long work day', 'A relaxing home spa visit after a long work day'],
 ['Saves travel time in busy areas', 'Flexible appointment times'],
 ['Spa visit: Requires travel and waiting time', 'Spa visit: Book your appointment before you arrive'],
 ['Comfort of your own environment', 'Comfort of our private home spa'],
 ['Comfort and privacy of your own environment', 'Comfort and privacy of our home spa'],
 ['Options for home or hotel massage sessions', 'Massage sessions at Sara Beauty’s private home spa'],
 ['Prepare your space (quiet room, clean towels, optional candles or music)', 'Visit our home spa at your confirmed appointment time; our team prepares the treatment space.'],
 ['Share your location in Abu Dhabi.', 'Ask our team for directions to the home spa in Abu Dhabi.'],
 ['Prepare a quiet space before the therapist arrives.', 'Arrive at our home spa at your confirmed appointment time.'],
 ['Confirm your location', 'Confirm your appointment and ask for directions to our home spa'],
 ['Travel or parking charges', 'Any additional treatment charges'],
 ['Hotel access charges', 'What is included in the appointment'],
 ['Your service area and arrival time', 'The home spa address and your appointment time'],
 ['Items the therapist will bring', 'Products and equipment provided at the spa'],
 ['What does a therapist usually bring?', 'What is provided at the home spa?'],
 ['Can a therapist visit my hotel room?', 'Where do Sara Beauty appointments take place?'],
 ['Can I book a massage at my apartment, villa, or hotel?', 'Can I visit Sara Beauty’s home spa for a massage?'],
 ['Do I need to visit a salon for Sara Beauty services?', 'Do I need to visit Sara Beauty for my treatment?'],
 ['No, all services are provided at Sara Beauty’s home spa. Professional therapists bring complete spa setups to your location so you can enjoy comfort, privacy, and relaxation at Sara Beauty’s home spa.', 'Yes. All treatments take place at Sara Beauty’s private home spa in Abu Dhabi. Clients visit us for their appointments; we do not offer home visits.'],
 ['Sara Beauty provides home spa services across Abu Dhabi, including residential communities, apartments, villas, and hotel accommodations within the city.', 'Sara Beauty welcomes women from across Abu Dhabi to our private home spa. All treatments take place at our spa; we do not visit clients’ homes or hotels.'],
 ['Popular service areas include Khalifa City, Reem Island, Yas Island, Al Raha Beach, Mussafah, and Al Reef.', 'Women from across Abu Dhabi are welcome to book a visit to Sara Beauty’s private home spa. Contact our team for the spa address and directions.'],
 ['We provide home spa massage services in Al Reem Island, Al Maryah Island, Saadiyat Island, Khalifa City, Corniche, Khalidiya and surrounding areas.', 'We welcome women from Al Reem Island, Al Maryah Island, Saadiyat Island, Khalifa City, Corniche, Khalidiya and surrounding areas to Sara Beauty’s home spa in Abu Dhabi. All appointments take place at our spa.'],
 ['5. Zen at Sara Beauty’s home spa: A Wide Range of Massage Choices', '5. Zen at Home: A Wide Range of Massage Choices'],
]);
function polish(value) {
  let result = value;
  for (const [from, to] of exact) result = result.split(from).join(to);
  result = result
    .replace(/\ban home spa\b/gi, 'a home spa')
    .replace(/Massage at Sara Beauty’s home spa Abu Dhabi(?: services)?/g, 'massage services at our home spa in Abu Dhabi')
    .replace(/home spa appointments (massage|spa)/gi, 'home spa $1')
    .replace(/home spa appointments (?:eliminates travel stress and )?allows/gi, 'Home spa appointments allow')
    .replace(/at Sara Beauty’s home spa (?:anywhere in|across) Abu Dhabi/gi, 'at Sara Beauty’s home spa in Abu Dhabi')
    .replace(/(?:before|when) the therapist arrives/gi, 'before your spa appointment')
    .replace(/(?:On-time therapist arrival|Therapist arrives at Sara Beauty’s home spa, ready for the session|Arrival and setup by the female therapist)/g, 'A welcome and consultation at our home spa')
    .replace(/Therapists arrive on time and behave professionally/g, 'Therapists provide attentive, professional care at the spa')
    .replace(/Professional portable massage table/g, 'Professional massage table at the spa')
    .replace(/Professional Arrival and Home Spa Setup|Arrival and Professional Setup/g, 'Welcome and Preparation at Our Home Spa')
    .replace(/Punctual arrival builds trust\./g, 'Attentive care builds trust.')
    .replace(/On-time arrival|Punctual arrival/g, 'Attentive service')
    .replace(/Professional communication before arrival/g, 'Professional communication before your spa visit')
    .replace(/(?:Our|Their) (?:professional )?(?:team|therapists?) will arrive[^.!?]*[.!]/gi, 'Our team will welcome you at Sara Beauty’s home spa at your confirmed appointment time.')
    .replace(/(?:Our|Their|Sara Beauty’s) (?:certified |trained |skilled |professional |experienced )?(?:female )?therapists (?:arrive|visit your location)[^.!?]*[.!]/gi, 'Our therapists welcome you at Sara Beauty’s home spa, where everything is prepared for your session.')
    .replace(/We arrive fully equipped[^.!?]*[.!]/gi, 'Our home spa is prepared with the equipment, oils and fresh towels needed for your treatment.')
    .replace(/(?:Our|The|our) (?:licensed |certified |experienced |professional )?(?:female )?therapists? brings? (?:everything|all (?:the )?(?:necessary|required)|the (?:necessary|required))[^.!?]*[.!]/g, 'Our team prepares the treatment equipment and products at our home spa before your appointment.')
    .replace(/(?:The therapist brings|our therapist brings)[^.!?]*[.!]/gi, 'Our team provides the treatment supplies at the home spa.')
    .replace(/You only need a comfortable space where the session can be performed\./g, 'Simply visit our home spa at your confirmed appointment time.')
    .replace(/Just a quiet space where you can relax—/g, 'Visit our home spa, where ')
    .replace(/(?:Instead of (?:traveling|travelling) to a spa,|Instead of dealing with traffic, parking, or waiting times,)/gi, 'During your visit to Sara Beauty’s home spa,')
    .replace(/(?:there is )?no need to (?:travel|commute|navigate through traffic|drive)[^.!?]*[.!]/gi, 'you can book a private appointment at Sara Beauty’s home spa.')
    .replace(/without (?:the hassle of |wasting time )travel(?:ing|ling)?(?: to a spa(?: or clinic)?)?(?: or waiting)?/gi, 'during a visit to our private home spa')
    .replace(/without stepping outside/gi, 'at our private home spa')
    .replace(/(?:eliminate the need to commute to a spa, saving you valuable time|save time by eliminating travel and waiting room delays)/gi, 'plan a private spa visit around your schedule')
    .replace(/(?:removing the need to travel in heat or adjust your busy schedule|the convenience of skipping the commute)/gi, 'with appointments arranged around your schedule')
    .replace(/free from distractions or travel fatigue/gi, 'with personal attention from our team')
    .replace(/instead of visiting a spa/gi, 'for a private spa visit')
    .replace(/without having to commute home/gi, 'following your therapist’s aftercare advice')
    .replace(/in your own environment|in the comfort of your space/gi, 'in our private home spa')
    .replace(/Share your location, /g, 'Share your ')
    .replace(/confirm availability at your address/g, 'confirm availability for your visit to our home spa')
    .replace(/your location and wellness goals/g, 'your preferences and wellness goals')
    .replace(/service area, and booking time/g, 'and booking time at our home spa')
    .replace(/Transform Sara Beauty’s home spa into a (?:Wellness Oasis with Sara Beauty|sanctuary of peace and relaxation)/gi, 'Discover a peaceful retreat at Sara Beauty’s home spa')
    .replace(/transforming Sara Beauty’s home spa into a sanctuary of relaxation and recovery/gi, 'welcoming you into a peaceful setting for relaxation and recovery')
    .replace(/It turns Sara Beauty’s home spa into a complete wellness space focused on relaxation and self-care\./g, 'Our home spa offers a dedicated space for relaxation and self-care.')
    .replace(/(?:directly )?to you\b/g, 'at our home spa')
    .replace(/\bbrings\b(?=[^.!?]* (?:at|of|to) (?:Sara Beauty’s|our) home spa)/g, 'offers')
    .replace(/\bbring\b(?=[^.!?]* (?:at|of|to) (?:Sara Beauty’s|our) home spa)/g, 'provide')
    .replace(/\bbringing\b(?=[^.!?]* (?:at|of|to) (?:Sara Beauty’s|our) home spa)/g, 'providing')
    .replace(/brings premium relaxation treatments/g, 'offers premium relaxation treatments')
    .replace(/bring professional products and equipment/g, 'use professional products and equipment')
    .replace(/bring premium products/g, 'use premium products')
    .replace(/bring premium massage oils/g, 'use premium massage oils')
    .replace(/brings the spa experience/g, 'offers the spa experience')
    .replace(/bring the spa at/g, 'provide treatments at')
    .replace(/certified therapists visit Sara Beauty’s home spa to provide/g, 'clients visit Sara Beauty’s home spa for')
    .replace(/home spa appointments means/g, 'A home spa appointment means')
    .replace(/home spa appointments sessions/g, 'Home spa sessions')
    .replace(/\bhome deep tissue massage\b/gi, 'deep tissue massage at our home spa');
  return result;
}
const changes = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!/\.(?:tsx?|json)$/.test(file) || /(?:card-data|blog-images)\.json$/.test(file)) continue;
    const source = fs.readFileSync(file, 'utf8');
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : file.endsWith('.json') ? ts.ScriptKind.JSON : ts.ScriptKind.TS);
    const edits = [];
    function visit(node) {
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
        const parent = node.parent;
        const key = parent && ts.isPropertyAssignment(parent) ? parent.name.getText(ast).replace(/["']/g, '') : '';
        if (['slug', 'image', 'heroImage', 'canonical', 'url', '@id', '@context', 'href', 'src'].includes(key)) return;
        const start = node.getStart(ast);
        const raw = source.slice(start, node.end);
        const updated = process.argv.includes('--polish') ? polish(raw) : rewrite(raw);
        if (raw !== updated) {
          edits.push({start, end: node.end, updated});
          changes.push({file, before: raw, after: updated});
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
    let updated = source;
    for (const edit of edits.reverse()) updated = updated.slice(0, edit.start) + edit.updated + updated.slice(edit.end);
    if (source !== updated) fs.writeFileSync(file, updated);
  }
}
walk('src');
fs.writeFileSync(process.argv.includes('--polish') ? '.content-polish.json' : '.content-changes.json', JSON.stringify(changes, null, 2));
console.log(`Updated ${changes.length} text entries across ${new Set(changes.map(c => c.file)).size} files.`);
