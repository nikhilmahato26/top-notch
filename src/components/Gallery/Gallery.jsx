'use client'

import { motion } from 'framer-motion'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=2000&auto=format&fit=crop', alt: 'Premium Haircut', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1000&auto=format&fit=crop', alt: 'Beard Styling', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop', alt: 'Interior', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000&auto=format&fit=crop', alt: 'Barber Tools', span: 'col-span-1 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1512496015851-a1c84cb181de?q=80&w=1000&auto=format&fit=crop', alt: 'Skin Fade', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1000&auto=format&fit=crop', alt: 'Hair Spa', span: 'col-span-1 row-span-1' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 bg-matte-black relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h4 className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase mb-4">Portfolio</h4>
          <h2 className="text-4xl md:text-5xl font-heading text-white">
            The Art of <span className="italic font-light">Grooming</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[250px]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`overflow-hidden relative group border border-border-dark ${img.span}`}
            >
              <div className="absolute inset-0 bg-metallic-gold/0 group-hover:bg-metallic-gold/10 transition-colors duration-500 z-10 pointer-events-none"></div>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
