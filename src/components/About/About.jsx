import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const Counter = ({ from, to, duration = 2, suffix = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (inView) {
      let start = from
      const increment = (to - from) / (duration * 60)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= to) {
          setCount(to)
          clearInterval(timer)
        } else {
          setCount(Math.ceil(start))
        }
      }, 1000 / 60)
      
      return () => clearInterval(timer)
    }
  }, [inView, from, to, duration])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-luxury gold-gradient-text block mb-2">
      {count}{suffix}
    </span>
  )
}

export default function About() {
  const containerRef = useRef(null)
  
  return (
    <section id="about" className="py-32 bg-dark-charcoal relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase mb-4">About Us</h4>
            <h2 className="text-4xl md:text-5xl font-heading text-white leading-tight mb-8">
              Elevating Men's <br/>
              <span className="italic font-light">Grooming</span>
            </h2>
            <div className="space-y-6 text-secondary-text font-light text-sm md:text-base leading-relaxed">
              <p>
                Welcome to Top Notch by Nik, Denmark's premier destination for modern men's grooming. We believe that a haircut is more than just a routine—it's an experience, a statement of style, and a boost of confidence.
              </p>
              <p>
                Specializing in modern haircuts, flawless fades, precision beard styling, colour services, luxury hair treatments, and advanced grooming, we combine timeless craftsmanship with contemporary trends to deliver unparalleled results.
              </p>
            </div>
            
            <div className="mt-10">
              <img 
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2000&auto=format&fit=crop" 
                alt="Barber Tools" 
                className="w-full h-48 object-cover grayscale opacity-80 border border-border-dark"
              />
            </div>
          </motion.div>

          {/* Stats & Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[4/5] overflow-hidden border border-border-dark relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop" 
                alt="Premium Grooming" 
                className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            
            {/* Stats Grid Overlay - Desktop */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:absolute -left-24 -bottom-12 bg-matte-black p-8 border border-border-dark z-20 w-full lg:w-[120%] mt-8 lg:mt-0"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                <div>
                  <Counter from={0} to={500} suffix="+" />
                  <span className="text-[10px] tracking-widest text-secondary-text uppercase">Happy Clients</span>
                </div>
                <div>
                  <Counter from={0} to={1200} suffix="+" />
                  <span className="text-[10px] tracking-widest text-secondary-text uppercase">Haircuts Completed</span>
                </div>
                <div>
                  <Counter from={0} to={10} suffix="+" />
                  <span className="text-[10px] tracking-widest text-secondary-text uppercase">Years Experience</span>
                </div>
                <div>
                  <Counter from={0} to={20} suffix="+" />
                  <span className="text-[10px] tracking-widest text-secondary-text uppercase">Premium Services</span>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
