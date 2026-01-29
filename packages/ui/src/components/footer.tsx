export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 mt-auto border-b border-solid border-slate-200 backdrop-blur-md bg-white/80 shadow-sm w-full">
      <div className="container mx-auto px-6 text-center text-sm text-gray-400">
        <p>© {currentYear} Redação 1000. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}