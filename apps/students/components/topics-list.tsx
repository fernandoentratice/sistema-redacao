"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Compass,
  Leaf,
  GraduationCap,
  BriefcaseMedical,
  Users,
  Palette,
  Cpu,
  Briefcase,
  Shield,
  NotebookPen
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import type { EssayTopic, ThematicAxis } from "@repo/types";
import { TopicDetailsDialog } from "@/components/topic-details-dialog";
import { ThemeBadge } from "@repo/ui/components/theme-badge";

const AXIS_ICONS: Record<ThematicAxis, React.ElementType> = {
  "Educação": GraduationCap,
  "Meio Ambiente": Leaf,
  "Cidadania e Direitos Humanos": Users,
  "Saúde": BriefcaseMedical,
  "Cultura": Palette,
  "Tecnologia": Cpu,
  "Trabalho": Briefcase,
  "Segurança": Shield,
};

const AXIS_BADGE_STYLES: Record<ThematicAxis, string> = {
  "Educação": "bg-blue-100 text-blue-700 border-blue-200",
  "Meio Ambiente": "bg-green-100 text-green-700 border-green-200",
  "Cidadania e Direitos Humanos": "bg-orange-100 text-orange-700 border-orange-200",
  "Saúde": "bg-red-100 text-red-700 border-red-200",
  "Cultura": "bg-purple-100 text-purple-700 border-purple-200",
  "Tecnologia": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Trabalho": "bg-slate-100 text-slate-700 border-slate-200",
  "Segurança": "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const AXIS_FILTERS: ("Todos" | ThematicAxis)[] = [
  "Todos",
  "Educação",
  "Meio Ambiente",
  "Cidadania e Direitos Humanos",
  "Saúde",
  "Cultura",
  "Tecnologia",
  "Trabalho",
  "Segurança",
];

interface TopicsListProps {
  topics: EssayTopic[];
}

export function TopicsList({ topics }: TopicsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"Todos" | ThematicAxis>("Todos");

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" || topic.axis === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* --- CABEÇALHO (Título + Busca) --- */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Compass className="size-6 text-secondary" />
            <h2 className="text-2xl font-extrabold tracking-tight">Lista de Temas Gerais</h2>
          </div>
          <p className="text-[#8B8265]">
            Navegue por nossa biblioteca completa com centenas de propostas.
          </p>
        </div>

        {/* Input de Busca */}
        <div className="relative w-full lg:w-[450px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
          <input
            type="text"
            placeholder="Pesquisar por título, eixo ou palavra-chave..."
            className="w-full pl-14 pr-6 py-4 rounded-full border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- BARRA DE FILTROS --- */}
      <div className="flex flex-col gap-4">
        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest whitespace-nowrap">
          Filtrar por:
        </span>

        <div className="flex flex-wrap gap-2">
          {AXIS_FILTERS.map((axis) => {
            const Icon = axis === "Todos" ? null : AXIS_ICONS[axis];
            const isActive = activeFilter === axis;

            return (
              <button
                key={axis}
                onClick={() => setActiveFilter(axis)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200
                  ${isActive
                    ? "bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md shadow-blue-900/20"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }
                `}
              >
                {Icon && <Icon className={`size-4 ${isActive ? "text-white" : "text-slate-500"}`} />}
                {axis}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- TABELA DE TEMAS --- */}
      <div className="rounded-4xl border border-slate-200 overflow-hidden shadow-sm mt-8">

        <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="col-span-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Título do Tema
          </div>
          <div className="col-span-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Eixo Temático
          </div>
          <div className="col-span-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Ação
          </div>
        </div>

        {/* Linhas */}
        <div className="divide-y divide-slate-100">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50 transition-colors group"
              >

                {/* Título (Ocupa 6 colunas no Desktop) */}
                <div className="lg:col-span-6">
                  <h4 className="font-bold text-slate-900  leading-snug group-hover:text-[#1E3A8A] transition-colors wrap-break-word">
                    {topic.title}
                  </h4>

                  {/* Badge Mobile/Tablet (Aparece até chegar em telas Grandes) */}
                  <div className="lg:hidden mt-3">
                    <ThemeBadge
                      className="inline-flex px-3 py-1 text-[10px] font-bold uppercase rounded-full border"
                      value={topic.axis} />
                  </div>
                </div>

                {/* Badge Desktop (Ocupa 3 colunas agora - Mais espaço!) */}
                <div className="hidden lg:flex lg:col-span-3 justify-center px-2">
                  <ThemeBadge
                    className="w-full max-w-[200px] px-2 py-1.5 text-[10px] font-bold uppercase rounded-full border tracking-wide 
                    h-auto whitespace-normal text-center flex items-center justify-center min-h-7 leading-tight"
                    value={topic.axis} />
                </div>

                {/* Botões (Ocupa 3 colunas) */}
                <div className="lg:col-span-3 flex flex-row gap-2 justify-end mt-4 lg:mt-0">
                  <TopicDetailsDialog topic={topic}>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto rounded-full gap-2 text-xs font-bold h-10 border-slate-200 text-[#1E3A8A] hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200 px-4 whitespace-nowrap cursor-pointer"
                    >
                      Ver Proposta
                      <Eye className="size-4.5" />
                    </Button>
                  </TopicDetailsDialog>

                  <Button
                    className="rounded-full gap-2 text-xs font-bold bg-primary text-slate-900 shadow-sm h-10 px-4 cursor-pointer whitespace-nowrap"
                  >
                    Iniciar Redação
                    <NotebookPen className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="size-6 text-slate-300" />
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-1">Nenhum tema encontrado</h3>
              <p className="text-slate-500">Tente buscar por outros termos ou mude o filtro.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}