import '@/index.css'

export const metadata = {
  title: 'Top Notch by Nik | Premium Barber Shop in Ballerup, Denmark',
  description:
    "Top Notch by Nik is a premium barber shop in Ballerup, Denmark offering luxury haircuts, fade styling, beard grooming, hair colour, spa treatments, facials, keratin treatments, and premium men's grooming.",
  keywords: [
    'Barber Shop Denmark',
    'Barber Ballerup',
    'Haircut Denmark',
    'Fade Haircut',
    'Beard Trim',
    'Hair Spa',
    'Keratin Treatment',
    'Hair Colour',
    'Premium Barber',
    "Men's Grooming",
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-matte-black text-white antialiased selection:bg-metallic-gold selection:text-matte-black">
        {children}
      </body>
    </html>
  )
}
