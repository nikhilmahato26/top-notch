import { motion } from 'framer-motion'
import { Scissors, Sparkles, Droplet, Star } from 'lucide-react'

const services = [
  { title: 'Luxury Haircuts', icon: Scissors, desc: 'Precision cuts tailored to your bone structure and personal style.' },
  { title: 'Fade Specialists', icon: Scissors, desc: 'Seamless, sharp skin fades crafted with meticulous attention to detail.' },
  { title: 'Beard Sculpting', icon: Scissors, desc: 'Hot towel treatments and razor-sharp line ups for the perfect beard.' },
  { title: 'Hair Colour', icon: Droplet, desc: 'Premium coloring services from natural blending to bold statements.' },
  { title: 'Luxury Hair Spa', icon: Sparkles, desc: 'Rejuvenating scalp therapies to promote healthy, strong hair growth.' },
  { title: 'Keratin Treatment', icon: Star, desc: 'Smoothing treatments to eliminate frizz and add intense shine.' },
  { title: 'Premium Facials', icon: Sparkles, desc: 'Deep cleansing and anti-aging facials tailored for men’s skin.' },
  { title: 'Botox Treatment', icon: Star, desc: 'Advanced aesthetic treatments for a youthful, refreshed appearance.' },
]

export default function Services() {
  return (
    <section id="services" className="py-32 bg-dark-charcoal border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase mb-4">Our Expertise</h4>
            <h2 className="text-4xl md:text-5xl font-heading text-white leading-tight">
              Premium Grooming <br />
              <span className="italic font-light">Experience</span>
            </h2>
          </div>
          <p className="text-secondary-text font-light text-sm max-w-sm">
            Discover our comprehensive range of luxury grooming services designed to elevate your personal style and well-being.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 bg-matte-black border border-border-dark hover:border-metallic-gold transition-colors duration-500 flex flex-col items-start"
              >
                <div className="p-4 rounded-full bg-dark-charcoal mb-8 text-secondary-text group-hover:text-metallic-gold transition-colors duration-500">
                  <Icon size={24} strokeWidth={1} />
                </div>
                <h3 className="text-lg font-luxury text-white mb-3 tracking-wide">{service.title}</h3>
                <p className="text-sm font-light text-secondary-text leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
