export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-default)] py-8 text-center text-sm text-[var(--color-text-tertiary)]">
      <p>&copy; {new Date().getFullYear()} meiyang.me. All rights reserved.</p>
    </footer>
  )
}
