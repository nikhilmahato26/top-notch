import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function Hero() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    // Parallax effect on scroll
    gsap.to(bgRef.current, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <section 
      id="home" 
      ref={heroRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 h-[120%]"
      >
        <div className="absolute inset-0 bg-matte-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-matte-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
          alt="Premium Barber Interior" 
          className="w-full h-full object-cover object-center grayscale-[30%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-luxury text-white tracking-tight leading-tight uppercase font-light">
            Precision.<br className="md:hidden" /> Style.<br className="md:hidden" /> <span className="gold-gradient-text italic">Confidence.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-secondary-text text-sm md:text-base lg:text-lg max-w-2xl font-light leading-relaxed mb-10"
        >
          Premium Barber Shop delivering world-class haircuts, beard grooming, luxury treatments, and modern men's styling in Denmark.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <a
            href="mailto:Mdhingra47@yahoo.com?subject=Booking%20Appointment"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-metallic-gold text-matte-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 w-full sm:w-auto"
          >
            Book Appointment
          </a>
          <a
            href="#pricing"
            className="px-8 py-4 bg-transparent border border-border-dark text-white font-semibold text-xs tracking-[0.2em] uppercase hover:border-metallic-gold hover:text-metallic-gold transition-all duration-300 w-full sm:w-auto"
          >
            View Price List
          </a>
          <a
            href="https://wa.me/4591428802"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent text-white font-semibold text-xs tracking-[0.2em] uppercase hover:text-metallic-gold transition-all duration-300 underline underline-offset-4 decoration-border-dark hover:decoration-metallic-gold w-full sm:w-auto"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-secondary-text uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-border-dark overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-metallic-gold"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
