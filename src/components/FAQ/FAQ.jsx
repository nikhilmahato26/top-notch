import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Do I need an appointment?',
    answer: 'While we do accommodate walk-ins when possible, we highly recommend booking an appointment to secure your preferred time and barber, as our schedule fills up quickly.'
  },
  {
    question: 'Do you accept walk-ins?',
    answer: 'Yes, walk-ins are welcome. However, priority is always given to booked appointments. You may experience a wait time if you walk in without prior notice.'
  },
  {
    question: 'Which hair products do you use?',
    answer: 'We exclusively use premium, professional-grade hair and beard products from top international brands to ensure the highest quality results and care for your hair.'
  },
  {
    question: 'Do you provide beard styling?',
    answer: 'Absolutely. Beard sculpting and grooming are among our specialty services, featuring hot towel treatments, precise line-ups, and luxury beard oils.'
  },
  {
    question: 'Can I get hair colouring?',
    answer: 'Yes, we offer comprehensive hair and beard colour services, ranging from natural grey blending to complete colour transformations.'
  },
  {
    question: 'Do you offer keratin treatments?',
    answer: 'We offer professional keratin smoothing treatments to eliminate frizz, add intense shine, and make your hair more manageable for weeks.'
  },
  {
    question: 'How long does a haircut take?',
    answer: 'A standard luxury haircut takes approximately 45-60 minutes. We do not rush our services; we take the necessary time to ensure perfect precision and a relaxing experience.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-32 bg-matte-black relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h4 className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase mb-4">Inquiries</h4>
          <h2 className="text-4xl md:text-5xl font-heading text-white">
            Common <span className="italic font-light">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b border-border-dark"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full py-6 flex justify-between items-center text-left group focus:outline-none"
              >
                <span className={`text-lg font-light transition-colors duration-300 ${openIndex === index ? 'text-metallic-gold' : 'text-white group-hover:text-metallic-gold'}`}>
                  {faq.question}
                </span>
                <span className="text-secondary-text group-hover:text-metallic-gold transition-colors duration-300 ml-4 flex-shrink-0">
                  {openIndex === index ? <Minus size={20} strokeWidth={1} /> : <Plus size={20} strokeWidth={1} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-secondary-text font-light text-sm md:text-base leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
