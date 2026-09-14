import type { Metadata } from "next";
import Link from "next/link";
import { allLocations } from "@/data/site";
import { socialMetadata } from "@/lib/social-metadata";

export const metadata: Metadata = {
  ...socialMetadata("Locations | Sara Beauty", "Explore Sara Beauty home spa massage and spa services across Abu Dhabi, including Saadiyat Island, Al Reem Island and Khalifa City.", "/locations/"),
  description: "Explore Sara Beauty home spa massage and spa services across Abu Dhabi, including Saadiyat Island, Al Reem Island and Khalifa City.",
  title: "Locations | Sara Beauty",
  alternates: { canonical: "https://sarabeauty.ae/locations/" },
};

export default function LocationsPage() {
  return <main className="mx-auto max-w-[1180px] px-6 py-20 text-[#395E4C]">
    <h1 className="mb-10 text-5xl" style={{ fontFamily: "var(--font-display), serif" }}>Locations</h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {allLocations.map(location => <Link key={location.slug} href={`/locations/${location.slug}`} className="rounded-2xl border border-[#395E4C]/15 bg-[#f8f7ef] p-7 hover:underline">
        <h2 className="mb-3 text-2xl">{location.name}</h2><p>{location.summary}</p>
      </Link>)}
    </div>
  </main>;
}
