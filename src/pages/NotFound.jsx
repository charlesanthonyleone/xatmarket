import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-24 text-center">
      <div className="hairline-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="wrap"><p className="eyebrow">404</p><h1 className="h-display mt-4 text-6xl sm:text-7xl">Page not found</h1><Link to="/" className="btn-primary mt-10">Back to XatMarket</Link></div>
    </section>
  )
}
