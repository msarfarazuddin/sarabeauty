const googleEmbedUrl =
  "https://www.google.com/maps?q=Sara%20Beauty%20Home%20Massage%20%26%20Spa%20Service%20Abu%20Dhabi&z=11&output=embed";

export function MapSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#dcecf6]">
        <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[560px]">
          <iframe
            title="Sara Beauty home spa massage & Spa Service Abu Dhabi map"
            src={googleEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          
        </div>
      </div>
    </section>
  );
}
