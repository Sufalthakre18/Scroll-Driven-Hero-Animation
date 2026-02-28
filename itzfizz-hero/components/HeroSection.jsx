"use client"

import { useEffect, useRef, forwardRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = "WELCOME ITZFIZZ".split("")

const STATS = [
  { id: "a", value: 58, suffix: "%", label: "Increase in brand engagement", bg: "bg-[var(--color-sage)]",  accent: "#3A5A10" },
  { id: "b", value: 27, suffix: "%", label: "Decrease in customer calls",   bg: "bg-[var(--color-sand)]",  accent: "#5A4A20" },
  { id: "c", value: 23, suffix: "%", label: "Reduction in bounce rate",     bg: "bg-[var(--color-blue)]",  accent: "#1A3A5A" },
  { id: "d", value: 40, suffix: "%", label: "Increase in conversions",      bg: "bg-[var(--color-blush)]", accent: "#4A2A20" },
]

const TICKER = [
  "ITZFIZZ DIGITAL","ITZFIZZ DIGITAL","ITZFIZZ DIGITAL","ITZFIZZ DIGITAL","ITZFIZZ DIGITAL","ITZFIZZ DIGITAL"
]

export default function HeroSection() {
  const sectionRef    = useRef(null)
  const carRef        = useRef(null)
  const glowRef       = useRef(null)
  const letterRefs    = useRef([])
  const statARefs     = useRef([])
  const statBRefs     = useRef([])
  const counterRefs   = useRef([])
  const stripTextRef  = useRef(null)
  const scrollHintRef = useRef(null)
  const bgLinesRef    = useRef(null)
  const navRef        = useRef(null)

  const countersRan = useRef(false)

  useEffect(() => {
    const dot  = document.getElementById("cursor-dot")
    const ring = document.getElementById("cursor-ring")
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0

    const setDotX = dot  ? gsap.quickSetter(dot,  "x", "px") : () => {}
    const setDotY = dot  ? gsap.quickSetter(dot,  "y", "px") : () => {}

    const onMouseMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      setDotX(mouseX); setDotY(mouseY)
    }
    const ringTicker = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) gsap.set(ring, { x: ringX, y: ringY })
    }
    gsap.ticker.add(ringTicker)
    window.addEventListener("mousemove", onMouseMove)

    const bar = document.getElementById("scroll-progress")
    const onScroll = () => {
      if (!bar) return
      const total = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = (window.scrollY / total) * 100 + "%"
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const ctx = gsap.context(() => {

      gsap.set(carRef.current,  { x: -620 })
      gsap.set(glowRef.current, { x: -620, opacity: 0 })

      gsap.set(letterRefs.current.filter(Boolean), { opacity: 0 })

      gsap.set([...statARefs.current.filter(Boolean), ...statBRefs.current.filter(Boolean)], { opacity: 0, y: 20 })

      gsap.fromTo(navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out" }
      )
      gsap.fromTo(bgLinesRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 0.8 }
      )
      gsap.to(scrollHintRef.current, {
        y: 9, repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut", delay: 1.5,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1400",
          scrub: 1.4,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Car moves across full width
      tl.to(carRef.current, { x: () => window.innerWidth + 520, ease: "none" }, 0)
      tl.to(glowRef.current, { x: () => window.innerWidth + 520, opacity: 0.65, ease: "none" }, 0)

     
      tl.fromTo(letterRefs.current.filter(Boolean),
        { opacity: 0 },
        {
          opacity: 1,
          stagger: { each: 0.04, from: "start" },  // letters reveal left→right like car is uncovering them
          ease: "none",
          duration: 0.6,
        },
        0.05  
      )

      tl.to(bgLinesRef.current, { y: -40, ease: "none" }, 0)

     ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top+={650} top",  
        end: "top+={900} top",
        toggleActions: "play none none reverse",
        onEnter: () => {
         
          gsap.to(statARefs.current.filter(Boolean), {
            opacity: 1, y: 0,
            stagger: 0.18, duration: 0.7, ease: "power3.out",
          })
          gsap.to(statBRefs.current.filter(Boolean), {
            opacity: 1, y: 0,
            stagger: 0.18, duration: 0.7, ease: "power3.out", delay: 0.15,
          })
          // Run counters once
          if (!countersRan.current) {
            countersRan.current = true
            counterRefs.current.filter(Boolean).forEach((el, i) => {
              const stat = STATS[i]
              if (!el || !stat) return
              const proxy = { val: 0 }
              gsap.to(proxy, {
                val: stat.value,
                duration: 1.6,
                delay: i * 0.15,
                ease: "power2.out",
                onUpdate() { el.textContent = Math.round(proxy.val) + stat.suffix },
              })
            })
          }
        },
        onLeaveBack: () => {
      
          gsap.to([...statARefs.current.filter(Boolean), ...statBRefs.current.filter(Boolean)], {
            opacity: 0, y: 20,
            stagger: 0.08, duration: 0.4, ease: "power2.in",
          })
          countersRan.current = false  // allow counters to re-run if they scroll back
        },
      })

    }, sectionRef)

    return () => {
      ctx.revert()
      gsap.ticker.remove(ringTicker)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <div id="scroll-progress" />

      <section ref={sectionRef} className="relative w-full h-svh overflow-hidden flex flex-col bg-bg">

        {/* Decorative BG grid lines */}
        <div ref={bgLinesRef} className="absolute inset-0 pointer-events-none opacity-0" aria-hidden="true">
          {[18, 38, 62, 82].map((pct) => (
            <div key={pct} className="absolute left-0 right-0 h-px bg-[rgba(28,25,22,0.06)]" style={{ top: `${pct}%` }} />
          ))}
          <div className="absolute top-0 bottom-0 w-px bg-[rgba(28,25,22,0.05)] left-[6%]" />
          <div className="absolute top-0 bottom-0 w-px bg-[rgba(28,25,22,0.05)] right-[6%]" />
        </div>

        {/* Navbar */}
        <nav ref={navRef} className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center gap-16 px-10 md:px-16 py-6 opacity-0">
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-[0.12em] text-text">ITZFIZZ</span>
          </div>
          <div className="hidden md:flex gap-10">
            {["WORK", "SERVICES", "ABOUT", "CONTACT"].map((link) => (
              <a key={link} href="#" className="font-body text-[0.62rem] tracking-[0.25em] text-muted hover:text-text transition-colors duration-200 cursor-none no-underline">
                {link}
              </a>
            ))}
          </div>
        </nav>

        {/* Top-right stat cards */}
        <div className="absolute z-20 flex gap-3 top-[clamp(5rem,13%,7rem)] right-[clamp(1rem,5%,4rem)]">
          {STATS.slice(0, 2).map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              ref={(el) => (statARefs.current[i] = el)}
              counterRef={(el) => (counterRefs.current[i] = el)}
            />
          ))}
        </div>

       
        <div className="absolute left-0 right-0 z-10 flex items-center justify-center overflow-hidden top-1/2 -translate-y-1/2 h-[clamp(160px,23vh,240px)] bg-strip">

          <div className="absolute top-0 left-0 right-0 h-px bg-accent opacity-55" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-accent opacity-25" />

          {/* ── WELCOME ITZFIZZ — starts hidden, revealed by car movement (req 3) */}
          <div ref={stripTextRef} className="absolute inset-0 flex items-center justify-center gap-[0.1em] px-6 z-10 pointer-events-none">
            {HEADLINE.map((letter, i) => (
              <span
                key={i}
                ref={(el) => (letterRefs.current[i] = el)}
                className="font-display text-white tracking-widest leading-none inline-block select-none text-[clamp(2rem,5.5vw,5.5rem)]"
                style={{ minWidth: letter === " " ? "clamp(0.8rem,2vw,2rem)" : "auto", opacity: 0 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>

          
          <div className="absolute inset-0 pointer-events-none z-10 opacity-10" aria-hidden="true">
            {[44, 54, 64].map((top, i) => (
              <div key={i} className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-white to-transparent" style={{ top: `${top}%`, opacity: 1 - i * 0.1 }} />
            ))}
          </div>

         
          <div ref={glowRef} className="absolute z-20 left-0 top-1/2 -translate-y-[40%] rounded-full will-change-transform blur-[18px] w-[clamp(280px,36vw,480px)] h-[clamp(80px,10vw,150px)] bg-[radial-gradient(ellipse,rgba(191,107,61,0.40)_0%,transparent_70%)]" />

          <div ref={carRef} className="absolute z-30 left-0 top-1/2 -translate-y-1/2 will-change-transform w-[clamp(280px,36vw,480px)] h-[clamp(130px,18vw,220px)]">
            <Image src="/car.png" alt="Sports car top view" fill className="object-contain" priority />
          </div>
        </div>

        {/* Bottom stat cards */}
        <div className="absolute z-20  flex gap-3 bottom-[clamp(4rem,13%,7rem)] left-1/2 -translate-x-[45%]">
          {STATS.slice(2).map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              ref={(el) => (statBRefs.current[i] = el)}
              counterRef={(el) => (counterRefs.current[i + 2] = el)}
            />
          ))}
        </div>

        
       
        <div ref={scrollHintRef} className="absolute z-30 flex flex-col items-center gap-2 bottom-[1.8rem] right-12 opacity-50">
          <span className="font-body text-[0.48rem] tracking-[0.4em] text-text">SCROLL</span>
          <div className="w-px h-7 bg-linear-to-b from-accent to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden h-8 border-t border-[rgba(28,25,22,0.08)]" aria-hidden="true">
          <div className="marquee-track h-full flex items-center">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i} className="font-body text-[0.55rem] tracking-[0.28em] text-muted px-10 inline-flex items-center gap-10 whitespace-nowrap">
                {item}
                <span className="w-0.75 h-0.75 rounded-full bg-accent shrink-0" />
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}

const StatCard = forwardRef(function StatCard({ stat, counterRef }, ref) {
  return (
    <div ref={ref} className={`stat-card relative overflow-hidden opacity-0 px-8 py-7 min-w-[clamp(150px,16vw,200px)] rounded-xl ${stat.bg}`}>
      <div ref={counterRef} className="font-display leading-none mb-3 text-[clamp(2.8rem,4.5vw,4.2rem)]" style={{ color: stat.accent }}>
        0{stat.suffix}
      </div>
      <p className=" font-body leading-relaxed max-w-35 text-[clamp(0.6rem,0.9vw,0.72rem)] opacity-75" style={{ color: stat.accent }}>
        {stat.label}
      </p>
      <div className="absolute top-3 right-3 w-1.25 h-1.25 rounded-full opacity-30" style={{ background: stat.accent }} />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-20" style={{ background: stat.accent }} />
    </div>
  )
})