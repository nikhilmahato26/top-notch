'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for premium effect
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-matte-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Logo animation */}
          <div className="flex flex-col items-center relative">
            <motion.div className="overflow-hidden">
              <motion.span 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="font-luxury text-4xl md:text-6xl font-bold tracking-[0.2em] text-white uppercase block leading-none"
              >
                Top Notch
              </motion.span>
            </motion.div>
            <motion.div className="overflow-hidden mt-2">
              <motion.span
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                className="font-body text-xs tracking-[0.4em] text-metallic-gold uppercase block leading-none"
              >
                by Nik
              </motion.span>
            </motion.div>
          </div>

          {/* Loading line */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-border-dark overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
              className="w-full h-full bg-metallic-gold"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
