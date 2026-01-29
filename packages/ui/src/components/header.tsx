"use client";

import { LogOut } from "lucide-react";
import { Button } from "./button";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logoText?: string;
  items: NavItem[];
  onLogout: () => void;
  activePath?: string;
}

export function Header({
  logoText = "Redação 1000",
  items,
  activePath = '',
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-slate-200 bg-white/80 backdrop-blur-md px-6 h-16 flex items-center justify-between shadow-sm">
      <span className="font-bold text-xl text-primary tracking-tight">
        {logoText}
      </span>

      <div className="flex items-center gap-6">
        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {items.map((item) => {
            const isActive = activePath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`
                  transition-all duration-200 py-1
                  ${isActive
                    ? "text-gray-900 border-b-2 border-yellow-400"
                    : "text-gray-600 hover:text-primary"
                  }
                `}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </header>
  );
}