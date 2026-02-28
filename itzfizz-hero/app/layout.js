import './globals.css'

export const metadata = {
  title: 'Itzfizz Digital — Scroll Hero',
  description: 'Scroll-driven hero section animation for Itzfizz Digital internship assignment.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}