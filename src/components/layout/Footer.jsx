export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-[var(--color-text-soft)] sm:px-6 lg:px-8">
        <p>© {currentYear} Enajenarte.</p>
      </div>
    </footer>
  )
}