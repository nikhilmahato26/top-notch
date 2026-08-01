import { motion } from 'framer-motion'
import { ShieldCheck, Award, Sparkles, Gem, Wind, CheckCircle2, UserCheck, Coffee, Scissors, Star } from 'lucide-react'

const reasons = [
  { name: 'Experienced Barber', icon: Award },
  { name: 'Premium Products', icon: Gem },
  { name: 'Luxury Interior', icon: Star },
  { name: 'Modern Hair Styling', icon: Scissors },
  { name: 'Hygienic Environment', icon: ShieldCheck },
  { name: 'Precision Grooming', icon: CheckCircle2 },
  { name: 'Premium Experience', icon: Sparkles },
  { name: 'Personalized Styling', icon: UserCheck },
  { name: 'Quality Service', icon: Award },
  { name: 'Relaxing Atmosphere', icon: Coffee },
]

export default function Treatments() {
  return (
    <section className="py-24 bg-matte-black border-t border-border-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h4 className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase mb-4">The Top Notch Difference</h4>
          <h2 className="text-3xl md:text-4xl font-heading text-white">
            Why Choose <span className="italic font-light">Us</span>
          </h2>
        </motion.div>

        {/* Marquee effect for reasons using framer motion */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-center gap-3 px-6 py-4 bg-dark-charcoal border border-border-dark rounded-full hover:border-metallic-gold transition-colors duration-300"
              >
                <Icon size={16} className="text-metallic-gold" />
                <span className="text-xs font-medium text-secondary-text tracking-wider uppercase">{reason.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
