import { motion } from 'framer-motion'

const hairServices = [
  { name: 'Basic Hair Cut', price: '130 kr' },
  { name: 'Modern Fade Haircut', price: '170 kr' },
  { name: 'Tattoo Haircut', price: '200 kr' },
  { name: 'Beard', price: '50 kr' },
  { name: 'Hair Spa', price: '50 kr' },
  { name: 'Premium Hair Spa', price: '80 kr' },
  { name: 'Head Wash', price: '30 kr' },
  { name: 'Blow Dry & Styling', price: '30 kr' },
  { name: 'Head Massage', price: '50 kr' },
  { name: 'Hair Fall Treatment Massage', price: '120 kr' },
  { name: 'D Tan', price: '60 kr' },
  { name: 'Face & Neck D Tan', price: '100 kr' },
  { name: 'Scrub & D Tan', price: '80 kr' },
  { name: 'Basic Hair Colour', price: '100 kr' },
  { name: 'Beard Colour', price: '60 kr' },
  { name: 'Premium Hair Colour', price: '150 kr' },
  { name: 'Premium Beard Colour', price: '100 kr' },
]

const comboDeals = [
  { name: 'Haircut + Beard Cut (Basic)', price: '170 kr' },
  { name: 'Haircut (Fade) + Fade Beard', price: '200 kr' },
  { name: 'Haircut (Fade) + Fade Beard + Spa', price: '250 kr' },
  { name: 'Haircut (Fade) + Fade Beard + Spa + Hair Colour + Beard Colour', price: '350 kr' },
]

const additionalTreatments = [
  { name: 'Basic Facial', price: '150 kr' },
  { name: 'Premium Facial', price: '200 kr' },
  { name: 'Clean Up', price: '30 kr' },
  { name: 'Face Massage', price: '50 kr' },
  { name: 'Head & Neck Massage', price: '70 kr' },
  { name: 'Keratin Treatment', price: '200 kr' },
  { name: 'Perming', price: '350 kr' },
  { name: 'Beard Perming', price: '350 kr' },
  { name: 'Botox Treatment', price: '200 kr' },
]

const PriceList = ({ title, items, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className="bg-dark-charcoal border border-border-dark p-8 md:p-12 hover:border-metallic-gold/50 transition-colors duration-500"
  >
    <h3 className="text-2xl font-luxury text-metallic-gold mb-8 uppercase tracking-widest text-center">{title}</h3>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex justify-between items-end border-b border-border-dark pb-2 group">
          <span className="text-sm md:text-base font-light text-secondary-text group-hover:text-white transition-colors duration-300 pr-4">{item.name}</span>
          <span className="text-sm md:text-base font-medium text-white whitespace-nowrap">{item.price}</span>
        </li>
      ))}
    </ul>
  </motion.div>
)

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-matte-black relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h4 className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase mb-4">Service Menu</h4>
          <h2 className="text-4xl md:text-5xl font-heading text-white">Investment in <span className="italic font-light">Yourself</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PriceList title="Hair Services" items={hairServices} delay={0.2} />
          <PriceList title="Additional Treatments" items={additionalTreatments} delay={0.4} />
        </div>
        
        {/* Premium Combo Deals - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-[#1A1813] to-matte-black border border-metallic-gold/30 p-8 md:p-12 mt-8"
        >
          <h3 className="text-2xl font-luxury gold-gradient-text mb-8 uppercase tracking-widest text-center">Premium Combo Deals</h3>
          <ul className="space-y-6 max-w-4xl mx-auto">
            {comboDeals.map((item, i) => (
              <li key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-metallic-gold/20 pb-4 group">
                <span className="text-base md:text-lg font-light text-white pr-4 mb-2 sm:mb-0 leading-tight">{item.name}</span>
                <span className="text-lg md:text-xl font-luxury text-metallic-gold whitespace-nowrap">{item.price}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <a
            href="mailto:Mdhingra47@yahoo.com?subject=Booking%20Appointment"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-metallic-gold text-matte-black font-semibold text-sm tracking-[0.2em] uppercase hover:bg-white transition-all duration-300"
          >
            Book Your Session
          </a>
        </div>
      </div>
    </section>
  )
}
