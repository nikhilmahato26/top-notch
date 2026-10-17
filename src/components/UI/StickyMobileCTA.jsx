'use client'

import { Calendar, MessageCircle, Phone, CreditCard } from 'lucide-react'

export default function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-matte-black border-t border-border-dark flex justify-between items-center px-2 py-3 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
      <a href="mailto:Mdhingra47@yahoo.com?subject=Booking%20Appointment" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-1/4 text-secondary-text hover:text-metallic-gold transition-colors">
        <Calendar size={20} className="mb-1" />
        <span className="text-[9px] uppercase tracking-wider font-light text-center">Book</span>
      </a>
      <a href="https://wa.me/4591428802" className="flex flex-col items-center justify-center w-1/4 text-secondary-text hover:text-metallic-gold transition-colors">
        <MessageCircle size={20} className="mb-1" />
        <span className="text-[9px] uppercase tracking-wider font-light text-center">WhatsApp</span>
      </a>
      <a href="tel:+4591428802" className="flex flex-col items-center justify-center w-1/4 text-secondary-text hover:text-metallic-gold transition-colors">
        <Phone size={20} className="mb-1" />
        <span className="text-[9px] uppercase tracking-wider font-light text-center">Call</span>
      </a>
      <a href="#pricing" className="flex flex-col items-center justify-center w-1/4 text-secondary-text hover:text-metallic-gold transition-colors">
        <CreditCard size={20} className="mb-1" />
        <span className="text-[9px] uppercase tracking-wider font-light text-center">Prices</span>
      </a>
    </div>
  )
}
