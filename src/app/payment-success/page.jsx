'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Scissors, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-matte-black text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-metallic-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-dark-charcoal border border-metallic-gold/30 p-8 md:p-10 text-center relative z-10 shadow-2xl"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-metallic-gold/10 border border-metallic-gold/40 flex items-center justify-center text-metallic-gold">
          <CheckCircle2 size={36} />
        </div>

        <span className="text-[10px] tracking-[0.3em] text-metallic-gold uppercase block mb-2 font-medium">
          Top Notch by Nik
        </span>

        <h1 className="text-3xl font-luxury text-white mb-3">
          Payment Received
        </h1>

        <p className="text-secondary-text text-sm font-light leading-relaxed mb-8">
          Thank you! Your payment has been processed securely via Mollie. We look forward to welcoming you for an extraordinary grooming experience.
        </p>

        <div className="bg-matte-black/60 border border-border-dark p-4 rounded mb-8 text-left space-y-2 text-xs text-secondary-text">
          <div className="flex justify-between">
            <span>Location:</span>
            <span className="text-white font-medium">Ballerup, Denmark</span>
          </div>
          <div className="flex justify-between">
            <span>Contact:</span>
            <span className="text-white font-medium">+45 91 42 88 02</span>
          </div>
          <div className="flex justify-between">
            <span>Email:</span>
            <span className="text-white font-medium">Mdhingra47@yahoo.com</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-4 bg-metallic-gold text-matte-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all duration-300"
        >
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </motion.div>
    </main>
  )
}
