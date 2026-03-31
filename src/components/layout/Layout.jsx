import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="page-shell">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
    </div>
  )
}