import { Link } from 'react-router-dom'
import { img } from '../img.js'
export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-24 text-center">
      <img src={img('hero')} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-ink/70" />
      <div className="wrap"><h1 className="font-display text-6xl font-semibold text-cream">Page not found</h1><Link to="/" className="btn-gold mt-8">Back to XatMarket</Link></div>
    </section>
  )
}
