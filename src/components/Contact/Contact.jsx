'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in Name and Phone number.");
      return;
    }
    const subject = encodeURIComponent(`Enquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`);
    window.open(`mailto:Mdhingra47@yahoo.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="py-32 bg-dark-charcoal relative border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h4 className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase mb-4">Connect</h4>
          <h2 className="text-4xl md:text-5xl font-heading text-white">
            Visit the <span className="italic font-light">Studio</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl font-luxury text-white mb-8">Top Notch by Nik</h3>
              
              <ul className="space-y-8 mb-12">
                <li className="flex items-start gap-4 group">
                  <div className="mt-1 text-metallic-gold">
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="text-xs tracking-widest text-secondary-text uppercase mb-1">Location</h5>
                    <p className="text-white font-light">Ballerup, Denmark 🇩🇰</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4 group">
                  <div className="mt-1 text-metallic-gold">
                    <Phone size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="text-xs tracking-widest text-secondary-text uppercase mb-1">WhatsApp / Call</h5>
                    <a href="https://wa.me/4591428802" className="text-white font-light hover:text-metallic-gold transition-colors duration-300">
                      +45 91428802
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="mt-1 text-metallic-gold">
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="text-xs tracking-widest text-secondary-text uppercase mb-1">Email</h5>
                    <a href="mailto:Mdhingra47@yahoo.com" className="text-white font-light hover:text-metallic-gold transition-colors duration-300">
                      Mdhingra47@yahoo.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="mt-1 text-metallic-gold">
                    <FaInstagram size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs tracking-widest text-secondary-text uppercase mb-1">Instagram</h5>
                    <a href="https://instagram.com/Nik_Dhingra786" target="_blank" rel="noopener noreferrer" className="text-white font-light hover:text-metallic-gold transition-colors duration-300">
                      @Nik_Dhingra786
                    </a>
                  </div>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:Mdhingra47@yahoo.com?subject=Booking%20Appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-metallic-gold text-matte-black text-center font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all duration-300"
                >
                  Book Appointment
                </a>
                <a
                  href="https://wa.me/4591428802"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-transparent border border-border-dark text-white text-center font-semibold text-xs tracking-widest uppercase hover:border-metallic-gold hover:text-metallic-gold transition-all duration-300"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            {/* Form */}
            <div className="bg-matte-black p-8 border border-border-dark">
              <h3 className="text-xl font-luxury text-white mb-6 uppercase tracking-wider">Send an Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-border-dark py-3 px-2 text-white font-light focus:outline-none focus:border-metallic-gold transition-colors duration-300 placeholder:text-secondary-text/50" required />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-b border-border-dark py-3 px-2 text-white font-light focus:outline-none focus:border-metallic-gold transition-colors duration-300 placeholder:text-secondary-text/50" required />
                </div>
                <div>
                  <textarea placeholder="Message" rows="3" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b border-border-dark py-3 px-2 text-white font-light focus:outline-none focus:border-metallic-gold transition-colors duration-300 placeholder:text-secondary-text/50 resize-none"></textarea>
                </div>
                <button type="submit" className="text-xs font-semibold tracking-widest uppercase text-white hover:text-metallic-gold transition-colors duration-300 underline underline-offset-4 decoration-metallic-gold">
                  Submit Request
                </button>
              </form>
            </div>

            {/* Placeholder Map */}
            <div className="h-64 w-full bg-matte-black border border-border-dark relative overflow-hidden group">
              <div className="absolute inset-0 bg-metallic-gold/10 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
              {/* Replace with actual iframe if requested */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143494.3986877073!2d12.247271891515206!3d55.72709230500171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465245c3639dfd43%3A0xa00afcc1d515a40!2sBallerup%2C%20Denmark!5e0!3m2!1sen!2sus!4v1714578111222!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
