"use client";

import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { whatsappBookingUrl, type BookingContext } from "@/lib/whatsapp";

type Props = Omit<ComponentProps<"a">, "href"> & Omit<BookingContext, "source"> & { source?: string };

export function BookingLink({ source, service, packageName, duration, price, phone, children, ...props }: Props) {
  const pathname = usePathname();
  return <a {...props} href={whatsappBookingUrl({ source: source ?? pathname ?? "/", service, packageName, duration, price, phone })} target="_blank" rel="noopener noreferrer">{children}</a>;
}
