"use client";

import { createClient } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "@repo/ui/components/header";
import { Footer } from "@repo/ui/components/footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const navItems = [
    { label: "Início", href: "/dashboard" },
    { label: "Minhas Redações", href: "/redacoes" },
    { label: "Temas", href: "/temas" },
    { label: "Meu perfil", href: "/perfil" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col">

      <Header
        logoText="Redação 1000"
        items={navItems}
        onLogout={handleLogout}
        activePath={pathname}
      />

      <main className="flex-1 w-full p-6 md:p-8">
        {children}
      </main>

      <Footer />


    </div>
  );
}