export type BookingContext = {
  source: string;
  service?: string;
  packageName?: string;
  duration?: string | number;
  price?: number;
  phone?: string;
};

export function whatsappBookingUrl(context: BookingContext) {
  const message = [
    "Hi Sara Beauty, I would like to book an appointment.",
    context.service && `Service: ${context.service}`,
    context.packageName && `Package: ${context.packageName} (10 sessions)`,
    context.duration && `Duration: ${context.duration} minutes per session`,
    context.price !== undefined && `Package price: AED ${context.price.toLocaleString("en-US")}`,
    "Please confirm availability. Thank you!",
  ].filter(Boolean).join("\n");
  return `https://wa.me/${context.phone ?? "971544297974"}?text=${encodeURIComponent(message)}`;
}
