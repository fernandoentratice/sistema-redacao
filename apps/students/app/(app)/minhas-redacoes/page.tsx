import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { ThemeBadge } from "@repo/ui/components/theme-badge";
import {
  Calendar,
  ChevronDown,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Star,
  List
} from "lucide-react";


type EssayStatus = "pending" | "corrected" | "draft";

interface Essay {
  id: string;
  title: string;
  category: string;
  date: string;
  status: EssayStatus;
  grade?: number;
}

const mockEssays: Essay[] = [
  {
    id: "1",
    title: "A Importância da Tecnologia na Educação Moderna",
    category: "Sociedade",
    date: "12 de Out, 2023",
    status: "corrected",
    grade: 960,
  },
  {
    id: "2",
    title: "Desafios da Preservação na Amazônia",
    category: "Meio Ambiente",
    date: "05 de Nov, 2023",
    status: "pending",
  },
  {
    id: "3",
    title: "O Impacto das Redes Sociais no Comportamento",
    category: "Cultura",
    date: "28 de Set, 2023",
    status: "corrected",
    grade: 880,
  },
  {
    id: "4",
    title: "Caminhos para combater a intolerância religiosa",
    category: "Direitos Humanos",
    date: "15 de Jan, 2024",
    status: "draft",
  },
  {
    id: "5",
    title: "A democratização do acesso ao cinema no Brasil",
    category: "Cultura",
    date: "20 de Fev, 2024",
    status: "corrected",
    grade: 920,
  },
];

function EssayCard({ essay }: { essay: Essay }) {
  const isCorrected = essay.status === "corrected";
  const isPending = essay.status === "pending";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-4">
          <ThemeBadge
            value={essay.category}
            className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest" />
        </div>

        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 line-clamp-2">
          {essay.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Calendar className="size-3.5" />
          {essay.date}
        </div>
      </div>

      <div className="flex items-end justify-between pt-4 border-t border-slate-50">
        <div className="flex flex-col gap-1">
          {isCorrected && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600">
              <span className="size-2 rounded-full bg-green-500" />
              Corrigida
            </div>
          )}
          {isPending && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#EBC84C]">
              <span className="size-2 rounded-full bg-[#EBC84C]" />
              Pendente
            </div>
          )}
          {essay.status === "draft" && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
              <span className="size-2 rounded-full bg-slate-300" />
              Rascunho
            </div>
          )}
        </div>

        {isCorrected && essay.grade && (
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nota Final</span>
            <span className="text-2xl font-extrabold text-slate-900">{essay.grade}</span>
          </div>
        )}

        {isPending && (
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">Nota Final</span>
            <span className="text-xl font-bold text-slate-300">--</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyEssaysPage() {
  return (
    <div className="px-4 md:px-10 lg:px-12 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            Minhas Redações
          </h2>
          <p className="text-[#8B8265]">
            Acompanhe seu progresso e evolução na escrita.
          </p>
        </div>

        <Link href="/temas">
          <Button className="rounded-full h-14 gap-2 w-full sm:w-auto px-6 shadow-lg shadow-yellow-400/20 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold">
            <Plus className="size-5" />
            Enviar nova redação
          </Button>
        </Link>
      </div>


      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col lg:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar redação pelo título ou tema..."
            className="w-full h-12 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#EBC84C]/50 placeholder:text-slate-400"
          />
        </div>

        <div className="flex w-full lg:w-auto gap-2 overflow-x-auto pb-2 lg:pb-0">
          <button className="flex items-center gap-2 px-4 h-12 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-600 whitespace-nowrap transition-colors">
            <Calendar className="size-4 text-slate-400" />
            Data
            <ChevronDown className="size-3 ml-1 text-slate-400" />
          </button>

          <button className="flex items-center gap-2 px-4 h-12 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-600 whitespace-nowrap transition-colors">
            <Star className="size-4 text-slate-400" />
            Nota
            <ChevronDown className="size-3 ml-1 text-slate-400" />
          </button>

          <button className="flex items-center gap-2 px-4 h-12 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-600 whitespace-nowrap transition-colors">
            <List className="size-4 text-slate-400" />
            Tema
            <ChevronDown className="size-3 ml-1 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mockEssays.map((essay) => (
          <Link key={essay.id} href={`/minhas-redacoes/${essay.id}`} className="block h-full">
            <EssayCard essay={essay} />
          </Link>
        ))}
      </div>

      {/* --- PAGINAÇÃO --- */}
      <div className="flex justify-center items-center gap-2">
        <button className="size-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors disabled:opacity-50">
          <ChevronLeft className="size-5" />
        </button>

        {/* Página Ativa */}
        <button className="size-10 flex items-center justify-center rounded-full bg-[#EBC84C] text-slate-900 font-bold shadow-md shadow-yellow-500/20">
          1
        </button>

        {/* Outras Páginas */}
        <button className="size-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
          2
        </button>
        <button className="size-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
          3
        </button>

        <button className="size-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
          <ChevronRight className="size-5" />
        </button>
      </div>

    </div>
  );
}