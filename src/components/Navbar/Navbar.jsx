'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex flex-col relative z-50">
            <span className="font-luxury text-2xl font-bold tracking-widest text-white uppercase leading-none">
              Top Notch
            </span>
            <span className="font-body text-[10px] tracking-[0.2em] text-metallic-gold uppercase leading-none mt-1">
              by Nik
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-secondary-text hover:text-white transition-colors duration-300 relative group uppercase tracking-widest text-[11px]"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-metallic-gold transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:Mdhingra47@yahoo.com?subject=Booking%20Appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-metallic-gold text-matte-black font-semibold text-xs tracking-widest uppercase hover:bg-white hover:text-matte-black transition-all duration-300 border border-transparent hover:border-white"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-matte-black/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <ul className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-luxury text-white hover:text-metallic-gold transition-colors duration-300 uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:Mdhingra47@yahoo.com?subject=Booking%20Appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block mt-4 px-8 py-4 bg-metallic-gold text-matte-black font-semibold text-sm tracking-widest uppercase"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
