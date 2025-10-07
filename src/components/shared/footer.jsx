export default function Footer() {
  return (
    <footer className="p-4 bg-slate-600" >
      <div className="mx-auto max-w-7xl px-4 h-12 text-sm text-gray-500 flex items-center justify-center">
        <span>© {new Date().getFullYear()} S3 Manager</span>
      </div>
    </footer>
  );
}
