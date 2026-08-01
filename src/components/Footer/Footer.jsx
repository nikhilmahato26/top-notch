export default function Footer() {
  return (
    <footer className="bg-matte-black pt-20 pb-10 border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-flex flex-col relative z-50 mb-6">
              <span className="font-luxury text-2xl font-bold tracking-widest text-white uppercase leading-none">
                Top Notch
              </span>
              <span className="font-body text-[10px] tracking-[0.2em] text-metallic-gold uppercase leading-none mt-1">
                by Nik
              </span>
            </a>
            <p className="text-secondary-text font-light text-sm max-w-xs">
              Premium Barber Shop delivering world-class grooming in Denmark.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-luxury text-white uppercase tracking-wider mb-6">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-secondary-text hover:text-metallic-gold transition-colors duration-300 font-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-luxury text-white uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3">
              {['Haircuts & Styling', 'Beard Sculpting', 'Hair Colouring', 'Luxury Hair Spa', 'Keratin & Botox'].map((link) => (
                <li key={link}>
                  <a href="#services" className="text-sm text-secondary-text hover:text-metallic-gold transition-colors duration-300 font-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-luxury text-white uppercase tracking-wider mb-6">Newsletter</h4>
            <p className="text-sm text-secondary-text font-light mb-4">Subscribe for exclusive grooming tips and offers.</p>
            <form className="flex border-b border-border-dark pb-2 group focus-within:border-metallic-gold transition-colors duration-300">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent text-white font-light focus:outline-none placeholder:text-secondary-text/50" 
              />
              <button type="submit" className="text-xs uppercase tracking-widest text-secondary-text hover:text-metallic-gold transition-colors duration-300">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-dark gap-4">
          <p className="text-xs text-secondary-text font-light uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Top Notch by Nik. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-secondary-text font-light uppercase tracking-widest hover:text-metallic-gold transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-xs text-secondary-text font-light uppercase tracking-widest hover:text-metallic-gold transition-colors duration-300">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
