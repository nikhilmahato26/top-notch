'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  Mail,
  User,
  CreditCard,
  Copy,
  Check,
  ExternalLink,
  Send,
  LogOut,
  RefreshCw,
  AlertCircle,
  Sparkles,
  FileText,
  Clock,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react'
import Link from 'next/link'

// Preset services from Top Notch menu
const PRESET_SERVICES = [
  // Hair Services
  { group: 'Hair Services', name: 'Basic Hair Cut', price: 130 },
  { group: 'Hair Services', name: 'Modern Fade Haircut', price: 170 },
  { group: 'Hair Services', name: 'Tattoo Haircut', price: 200 },
  { group: 'Hair Services', name: 'Beard Grooming', price: 50 },
  { group: 'Hair Services', name: 'Hair Spa', price: 50 },
  { group: 'Hair Services', name: 'Premium Hair Spa', price: 80 },
  { group: 'Hair Services', name: 'Head Wash & Style', price: 30 },
  { group: 'Hair Services', name: 'Head Massage', price: 50 },
  { group: 'Hair Services', name: 'Hair Fall Treatment Massage', price: 120 },
  { group: 'Hair Services', name: 'Basic Hair Colour', price: 100 },
  { group: 'Hair Services', name: 'Premium Hair Colour', price: 150 },
  { group: 'Hair Services', name: 'Premium Beard Colour', price: 100 },

  // Combo Deals
  { group: 'Combo Deals', name: 'Haircut + Beard Cut (Basic)', price: 170 },
  { group: 'Combo Deals', name: 'Haircut (Fade) + Fade Beard', price: 200 },
  { group: 'Combo Deals', name: 'Haircut (Fade) + Fade Beard + Spa', price: 250 },
  { group: 'Combo Deals', name: 'Full Luxury VIP Package (Fade, Beard, Spa, Colour)', price: 350 },

  // Treatments
  { group: 'Treatments', name: 'Basic Facial', price: 150 },
  { group: 'Treatments', name: 'Premium Facial', price: 200 },
  { group: 'Treatments', name: 'Keratin Treatment', price: 200 },
  { group: 'Treatments', name: 'Perming', price: 350 },
  { group: 'Treatments', name: 'Botox Treatment', price: 200 },

  // Custom
  { group: 'Custom', name: 'Custom Amount / Service', price: '' },
]

export default function AdminPage() {
  const [loadingSession, setLoadingSession] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState(null)

  // Login form state
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Payment form state
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [selectedService, setSelectedService] = useState(PRESET_SERVICES[1].name) // Modern Fade
  const [customServiceName, setCustomServiceName] = useState('')
  const [amount, setAmount] = useState(PRESET_SERVICES[1].price)
  const [currency, setCurrency] = useState('DKK')
  const [note, setNote] = useState('')
  const [sendEmailImmediately, setSendEmailImmediately] = useState(true)

  // Action status state
  const [submitting, setSubmitting] = useState(false)
  const [latestResult, setLatestResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  // Payment link history in this session
  const [history, setHistory] = useState([])
  const [checkingPaymentId, setCheckingPaymentId] = useState(null)

  // Check current session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/me')
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setIsAuthenticated(true)
            setAdminUser(data.user)
          }
        }
      } catch (err) {
        console.error('Session check failed:', err)
      } finally {
        setLoadingSession(false)
      }
    }
    checkAuth()
  }, [])

  // Handle service dropdown change
  const handleServiceChange = (serviceName) => {
    setSelectedService(serviceName)
    const match = PRESET_SERVICES.find((s) => s.name === serviceName)
    if (match && match.price !== '') {
      setAmount(match.price)
    }
  }

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      setIsAuthenticated(true)
      setAdminUser(data.user)
    } catch (err) {
      setLoginError(err.message || 'Authentication error')
    } finally {
      setLoginLoading(false)
    }
  }

  // Handle Admin Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } finally {
      setIsAuthenticated(false)
      setAdminUser(null)
    }
  }

  // Handle Create Payment Link
  const handleCreatePayment = async (sendEmailOption = true) => {
    setErrorMsg('')
    setSubmitting(true)

    const finalServiceName =
      selectedService === 'Custom Amount / Service'
        ? customServiceName || 'Custom Grooming Service'
        : selectedService

    try {
      const res = await fetch('/api/admin/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          serviceName: finalServiceName,
          amount: Number(amount),
          currency,
          note,
          sendEmailNow: sendEmailOption,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate payment link')
      }

      const item = {
        id: data.payment.id,
        checkoutUrl: data.payment.checkoutUrl,
        customerName: customerName || 'Valued Client',
        customerEmail,
        serviceName: finalServiceName,
        amount: Number(amount).toFixed(2),
        currency,
        status: data.payment.status || 'open',
        isMock: data.payment.isMock,
        emailResult: data.emailResult,
        createdAt: new Date().toLocaleTimeString(),
      }

      setLatestResult(item)
      setHistory((prev) => [item, ...prev])
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  // Copy link helper
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  // Resend Email for an existing link
  const handleResendEmail = async (item) => {
    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: item.customerEmail,
          customerName: item.customerName,
          serviceName: item.serviceName,
          amount: item.amount,
          currency: item.currency,
          paymentUrl: item.checkoutUrl,
          note,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')
      alert(`Email sent successfully to ${item.customerEmail}`)
    } catch (err) {
      alert(`Error sending email: ${err.message}`)
    }
  }

  // Check Mollie Payment Status in real-time
  const handleCheckStatus = async (item) => {
    setCheckingPaymentId(item.id)
    try {
      const res = await fetch(`/api/admin/check-payment?id=${item.id}`)
      const data = await res.json()
      if (res.ok && data.payment) {
        setHistory((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, status: data.payment.status } : p))
        )
        if (latestResult && latestResult.id === item.id) {
          setLatestResult((prev) => ({ ...prev, status: data.payment.status }))
        }
      }
    } catch (err) {
      console.error('Check status error:', err)
    } finally {
      setCheckingPaymentId(null)
    }
  }

  // Loading state
  if (loadingSession) {
    return (
      <div className="min-h-screen bg-matte-black text-white flex items-center justify-center">
        <RefreshCw className="animate-spin text-metallic-gold" size={32} />
      </div>
    )
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-matte-black text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-metallic-gold/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-dark-charcoal border border-border-dark p-8 md:p-10 relative z-10 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <span className="font-luxury text-2xl font-bold tracking-widest text-white uppercase block leading-none">
              Top Notch
            </span>
            <span className="font-body text-[10px] tracking-[0.3em] text-metallic-gold uppercase block mt-1">
              Admin Portal &bull; Ballerup
            </span>
          </div>

          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-matte-black border border-metallic-gold/30 flex items-center justify-center text-metallic-gold">
            <Lock size={20} />
          </div>

          <h2 className="text-xl font-luxury text-white text-center mb-2">
            Administrator Access
          </h2>
          <p className="text-xs text-secondary-text text-center font-light mb-6">
            Enter your credentials configured in your environment variables.
          </p>

          {loginError && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-500/50 rounded flex items-center gap-3 text-red-300 text-xs">
              <AlertCircle size={16} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-secondary-text mb-2 font-medium">
                Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-matte-black border border-border-dark pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-metallic-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-secondary-text mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-matte-black border border-border-dark pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-metallic-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-3.5 bg-metallic-gold text-matte-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Verifying...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-dark flex justify-between items-center text-[11px] text-gray-500">
            <Link href="/" className="hover:text-metallic-gold transition-colors">
              &larr; Back to Website
            </Link>
            <span>Top Notch by Nik</span>
          </div>
        </motion.div>
      </main>
    )
  }

  // Authenticated Dashboard View
  return (
    <main className="min-h-screen bg-matte-black text-white pb-20">
      {/* Top Admin Navbar */}
      <header className="border-b border-border-dark bg-dark-charcoal/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex flex-col">
              <span className="font-luxury text-xl font-bold tracking-widest text-white uppercase leading-none">
                Top Notch
              </span>
              <span className="font-body text-[9px] tracking-[0.25em] text-metallic-gold uppercase mt-0.5">
                Admin Portal
              </span>
            </Link>
            <span className="hidden sm:inline-block text-xs px-2.5 py-1 bg-metallic-gold/10 text-metallic-gold border border-metallic-gold/30 rounded font-mono">
              Role: {adminUser?.username || 'admin'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-secondary-text hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View Live Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-secondary-text hover:text-red-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 border border-border-dark rounded hover:border-red-500/40"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Title & Description */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-metallic-gold" />
            <h1 className="text-2xl md:text-3xl font-luxury text-white">
              Customer Payment Generator
            </h1>
          </div>
          <p className="text-sm text-secondary-text font-light max-w-2xl">
            Create a secure Mollie checkout link for your customer and automatically dispatch it via branded SMTP email with a single click.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 rounded flex items-center gap-3 text-red-300 text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-dark-charcoal border border-border-dark p-6 md:p-8">
            <h2 className="text-lg font-luxury text-metallic-gold uppercase tracking-wider mb-6 flex items-center gap-2">
              <CreditCard size={18} />
              Payment Details
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreatePayment(sendEmailImmediately)
              }}
              className="space-y-5"
            >
              {/* Customer Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary-text mb-2 font-medium">
                  Customer Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Christian Møller"
                    className="w-full bg-matte-black border border-border-dark pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-metallic-gold transition-colors"
                  />
                </div>
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary-text mb-2 font-medium">
                  Customer Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="customer@example.com"
                    className="w-full bg-matte-black border border-border-dark pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-metallic-gold transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary-text mb-2 font-medium">
                  Select Service / Package
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full bg-matte-black border border-border-dark px-4 py-3 text-sm text-white focus:outline-none focus:border-metallic-gold transition-colors"
                >
                  {PRESET_SERVICES.map((s, idx) => (
                    <option key={idx} value={s.name}>
                      {s.group ? `[${s.group}] ` : ''}{s.name} {s.price ? `(${s.price} DKK)` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Service Name if custom selected */}
              {selectedService === 'Custom Amount / Service' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-secondary-text mb-2 font-medium">
                    Custom Service Description
                  </label>
                  <input
                    type="text"
                    required
                    value={customServiceName}
                    onChange={(e) => setCustomServiceName(e.target.value)}
                    placeholder="e.g. Haircut + Beard Grooming Special"
                    className="w-full bg-matte-black border border-border-dark px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-metallic-gold transition-colors"
                  />
                </div>
              )}

              {/* Amount & Currency Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-secondary-text mb-2 font-medium">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="170"
                    className="w-full bg-matte-black border border-border-dark px-4 py-3 text-sm text-white focus:outline-none focus:border-metallic-gold transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-secondary-text mb-2 font-medium">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-matte-black border border-border-dark px-3 py-3 text-sm text-white focus:outline-none focus:border-metallic-gold transition-colors"
                  >
                    <option value="DKK">DKK (kr)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="SEK">SEK (kr)</option>
                    <option value="NOK">NOK (kr)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              {/* Barber Note */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary-text mb-2 font-medium">
                  Appointment Note (Optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Booked for Saturday 14:00 with Nik"
                  className="w-full bg-matte-black border border-border-dark px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-metallic-gold transition-colors"
                />
              </div>

              {/* Checkbox: Send email immediately */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer text-xs text-secondary-text hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={sendEmailImmediately}
                    onChange={(e) => setSendEmailImmediately(e.target.checked)}
                    className="w-4 h-4 rounded border-border-dark bg-matte-black text-metallic-gold focus:ring-0 focus:outline-none accent-[#D4AF37]"
                  />
                  <span>Dispatch branded payment email to customer via SMTP immediately</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 bg-metallic-gold text-matte-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Generate & Send Payment Link
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleCreatePayment(false)}
                  className="py-4 px-6 border border-metallic-gold/50 text-metallic-gold text-xs tracking-widest uppercase hover:bg-metallic-gold/10 transition-all duration-300 disabled:opacity-50"
                >
                  Generate Link Only
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Latest Created Link Output Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-dark-charcoal border border-border-dark p-6 md:p-8">
              <h2 className="text-lg font-luxury text-metallic-gold uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText size={18} />
                Latest Generated Link
              </h2>

              {latestResult ? (
                <div className="space-y-4">
                  {/* Status Banner */}
                  <div className="p-3 bg-matte-black border border-metallic-gold/30 rounded flex justify-between items-center text-xs">
                    <div>
                      <span className="text-secondary-text">Status: </span>
                      <span className="font-semibold uppercase text-metallic-gold">
                        {latestResult.status}
                      </span>
                      {latestResult.isMock && (
                        <span className="ml-2 px-1.5 py-0.5 bg-yellow-950 text-yellow-300 text-[10px] rounded">
                          Dev Mock Mode
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCheckStatus(latestResult)}
                      disabled={checkingPaymentId === latestResult.id}
                      className="text-metallic-gold hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                    >
                      <RefreshCw
                        size={12}
                        className={checkingPaymentId === latestResult.id ? 'animate-spin' : ''}
                      />
                      Check Status
                    </button>
                  </div>

                  {/* Summary Details */}
                  <div className="bg-matte-black/60 p-4 border border-border-dark rounded space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Customer:</span>
                      <span className="text-white font-medium">{latestResult.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white font-medium">{latestResult.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service:</span>
                      <span className="text-white font-medium">{latestResult.serviceName}</span>
                    </div>
                    <div className="flex justify-between border-t border-border-dark pt-2 mt-2">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-metallic-gold font-bold text-sm">
                        {latestResult.amount} {latestResult.currency}
                      </span>
                    </div>
                  </div>

                  {/* URL Box */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-secondary-text mb-1">
                      Mollie Checkout URL
                    </label>
                    <div className="bg-matte-black border border-border-dark p-3 text-xs font-mono text-gray-300 break-all select-all">
                      {latestResult.checkoutUrl}
                    </div>
                  </div>

                  {/* Copy & Open Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(latestResult.checkoutUrl, latestResult.id)}
                      className="flex-1 py-2.5 bg-metallic-gold text-matte-black font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all flex items-center justify-center gap-2"
                    >
                      {copiedId === latestResult.id ? (
                        <>
                          <Check size={14} /> Copied to Clipboard
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy Payment Link
                        </>
                      )}
                    </button>

                    <a
                      href={latestResult.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 border border-border-dark text-white hover:border-metallic-gold hover:text-metallic-gold transition-colors flex items-center justify-center text-xs"
                      title="Open Payment Page"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  {/* Email Result Feedback */}
                  {latestResult.emailResult && (
                    <div
                      className={`p-3 text-xs rounded border ${latestResult.emailResult.success
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                          : 'bg-red-950/30 border-red-500/30 text-red-300'
                        }`}
                    >
                      {latestResult.emailResult.success ? (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle size={14} />
                            {latestResult.emailResult.isMock
                              ? 'Email simulated (add SMTP creds in .env.local)'
                              : `Email dispatched to ${latestResult.customerEmail}`}
                          </span>
                          <button
                            onClick={() => handleResendEmail(latestResult)}
                            className="underline text-[11px] hover:text-white ml-2"
                          >
                            Resend
                          </button>
                        </div>
                      ) : (
                        <span>Email error: {latestResult.emailResult.error}</span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-secondary-text">
                  <Clock size={32} className="mx-auto mb-3 opacity-40 text-metallic-gold" />
                  <p className="text-xs font-light">
                    No payment links generated yet in this session. Fill out the form and submit to generate your first Mollie payment link.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Helper / Credentials Notice */}
            <div className="bg-matte-black/60 border border-border-dark p-5 rounded text-xs space-y-2 text-secondary-text">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] text-metallic-gold">
                Environment Configuration Status
              </h4>
              <p className="text-[11px] leading-relaxed">
                Credentials are loaded securely on the server from <code className="text-metallic-gold font-mono">.env.local</code>. Never expose your Mollie Live Key or SMTP credentials in client code.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="bg-dark-charcoal p-2 border border-border-dark rounded">
                  <span className="text-gray-400">Payment:</span> <span className="text-white">Mollie v2</span>
                </div>
                <div className="bg-dark-charcoal p-2 border border-border-dark rounded">
                  <span className="text-gray-400">Mailer:</span> <span className="text-white">SMTP Transport</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        {history.length > 0 && (
          <div className="mt-12 bg-dark-charcoal border border-border-dark p-6 md:p-8">
            <h2 className="text-lg font-luxury text-metallic-gold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Clock size={18} />
              Session Activity History ({history.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border-dark text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pr-4">Time</th>
                    <th className="pb-3 pr-4">Customer</th>
                    <th className="pb-3 pr-4">Service</th>
                    <th className="pb-3 pr-4">Amount</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark/60">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-matte-black/40 transition-colors">
                      <td className="py-3.5 pr-4 text-gray-500 font-mono">{item.createdAt}</td>
                      <td className="py-3.5 pr-4">
                        <div className="font-medium text-white">{item.customerName}</div>
                        <div className="text-gray-500 text-[11px]">{item.customerEmail}</div>
                      </td>
                      <td className="py-3.5 pr-4 text-secondary-text">{item.serviceName}</td>
                      <td className="py-3.5 pr-4 font-mono font-semibold text-metallic-gold">
                        {item.amount} {item.currency}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${item.status === 'paid'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                              : 'bg-yellow-950/60 text-yellow-300 border border-yellow-500/30'
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleCopy(item.checkoutUrl, item.id)}
                          className="px-2.5 py-1 border border-border-dark rounded hover:border-metallic-gold text-secondary-text hover:text-white transition-colors"
                        >
                          {copiedId === item.id ? 'Copied' : 'Copy'}
                        </button>
                        <button
                          onClick={() => handleResendEmail(item)}
                          className="px-2.5 py-1 border border-border-dark rounded hover:border-metallic-gold text-secondary-text hover:text-white transition-colors"
                        >
                          Email
                        </button>
                        <a
                          href={item.checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-2.5 py-1 bg-metallic-gold/10 text-metallic-gold rounded hover:bg-metallic-gold hover:text-matte-black transition-colors"
                        >
                          Pay
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
