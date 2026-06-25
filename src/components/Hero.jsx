import React from "react";

export default function Hero() {
  const heroImage =
    "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1782314232/6177d621-eb94-4861-aa2e-d97723f5a62b.png";

  return (
    <section
      className="relative overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: "85% center",
      }}
    >
      {/* Desktop Overlay */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,.97) 0%, rgba(255,255,255,.92) 35%, rgba(255,255,255,.65) 55%, rgba(255,255,255,0) 78%)",
        }}
      />

      {/* Mobile Overlay */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.92) 40%, rgba(255,255,255,.65) 70%, rgba(255,255,255,.2) 100%)",
        }}
      />

      <div className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-5 sm:px-8">
          <div className="max-w-xl py-16 md:py-24">

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-black">
              Stranded on the road?
              <br />
              <span className="text-yellow-400">
                We've got your back!
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg sm:text-xl text-gray-900 max-w-md">
              InformxMe connects you with nearby trusted professionals
              for all your vehicle needs.
            </p>

            {/* Feature Cards */}
            <div className="mt-8 flex flex-wrap gap-4">

              <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg">
                <img
                  src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1782319118/images-removebg-preview_tsapme.png"
                  alt="Quick Response"
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <p className="font-bold leading-none">Quick</p>
                  <p className="font-bold leading-none">Response</p>
                </div>
              </div>

              <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg">
                <img
                  src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1782320642/image-removebg-preview_ikghda.png"
                  alt="Trusted Experts"
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <p className="font-bold leading-none">Trusted</p>
                  <p className="font-bold leading-none">Experts</p>
                </div>
              </div>

              <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg">
                <img
                  src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1782320753/image-removebg-preview_1_jysg0s.png"
                  alt="24/7"
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <p className="font-bold leading-none">Available</p>
                  <p className="font-bold leading-none">24/7</p>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <a
                href="#join"
                className="rounded-xl bg-yellow-400 hover:bg-yellow-500 transition px-8 py-4 font-bold text-black shadow-lg text-center w-full sm:w-auto"
              >
                Join Early Access
              </a>

              <a
                href="#learn"
                className="rounded-xl bg-white hover:bg-gray-100 transition px-8 py-4 font-semibold text-black shadow-lg text-center w-full sm:w-auto"
              >
                Learn More
              </a>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}