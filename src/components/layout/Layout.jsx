import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="page-shell">
  <Header />

  <div className="flex flex-1">
    <main className="mx-auto w-full max-w-[96rem] px-5 py-8 sm:px-8 lg:px-10">
      {children}
    </main>
  </div>

  <Footer />
</div>
  )
}