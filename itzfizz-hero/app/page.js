import HeroSection from "@/components/HeroSection"

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">

      <HeroSection />

      {/* Section after hero unpins */}
      <section className="h-screen flex flex-col items-center justify-center gap-6 bg-[#EEEBE4]">

        <p className="tracking-[0.5em] text-[10px] uppercase text-neutral-500">
          Scroll Up to Replay
        </p>

        <div className="w-px h-12 bg-gradient-to-t from-transparent to-orange-500" />

        <h2 className="text-6xl md:text-8xl tracking-[0.05em] font-bold text-neutral-900">
          ITZFIZZ
        </h2>

        <p className="text-sm font-light tracking-widest text-neutral-500 italic">
          Digital Experiences That Drive Results
        </p>

      </section>

    </main>
  )
}