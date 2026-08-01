import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Alexander Lindberg',
    text: 'An absolute masterclass in men\'s grooming. Nik doesn\'t just cut hair, he crafts an experience. The attention to detail is unmatched in Denmark.',
    rating: 5,
    role: 'Loyal Client'
  },
  {
    name: 'Markus Jensen',
    text: 'From the moment you walk in, you know you\'re in for something special. The luxury interior, the premium products, and the precision fade—perfect every time.',
    rating: 5,
    role: 'Executive'
  },
  {
    name: 'Oliver Thomsen',
    text: 'I\'ve been to many premium barbers globally, but Top Notch by Nik stands out. The beard sculpting and hair spa treatment are a must-try.',
    rating: 5,
    role: 'Entrepreneur'
  }
]

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 5000 })])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="py-32 bg-dark-charcoal border-y border-border-dark relative overflow-hidden">
      {/* Background large quote icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Quote size={400} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h4 className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase mb-4">Client Experiences</h4>
          <h2 className="text-4xl md:text-5xl font-heading text-white">
            Words of <span className="italic font-light">Praise</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4 flex flex-col items-center text-center">
                  <div className="flex gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-metallic-gold fill-metallic-gold" />
                    ))}
                  </div>
                  <p className="text-xl md:text-3xl font-heading text-white font-light leading-relaxed mb-10 max-w-3xl text-balance">
                    "{testimonial.text}"
                  </p>
                  <h4 className="font-luxury text-lg text-metallic-gold tracking-wider uppercase mb-1">{testimonial.name}</h4>
                  <span className="text-xs font-light text-secondary-text uppercase tracking-widest">{testimonial.role}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 flex items-center justify-center border border-border-dark text-secondary-text hover:text-metallic-gold hover:border-metallic-gold transition-colors duration-300 rounded-full bg-matte-black/50 backdrop-blur-sm"
          >
            <ChevronLeft size={20} strokeWidth={1} />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 flex items-center justify-center border border-border-dark text-secondary-text hover:text-metallic-gold hover:border-metallic-gold transition-colors duration-300 rounded-full bg-matte-black/50 backdrop-blur-sm"
          >
            <ChevronRight size={20} strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  )
}
