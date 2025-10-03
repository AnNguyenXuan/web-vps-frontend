export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 h-12 text-sm text-gray-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} VPS Hosting Manager</span>
        <span className="hidden sm:block">Built with React + Vite + Tailwind</span>
      </div>
    </footer>
  );
}
