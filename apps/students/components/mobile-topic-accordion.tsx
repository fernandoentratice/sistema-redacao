"use client";

import { useState } from "react";

import { ChevronDown, ChevronUp, FileText, Info } from "lucide-react";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import type { EssayTopic, MotivatingText } from "@repo/types";

// Reutilizando o visual do item de texto
function MobileMotivatingTextItem({ item, index }: { item: MotivatingText; index: number }) {
  return (
    <div className="mb-6 last:mb-0">
      <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8B781F] bg-[#EBC84C]/20 rounded-md">
        {item.label || `Texto ${index + 1}`}
      </span>
      <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
        {item.content && <p className="whitespace-pre-line">{item.content}</p>}
        {item.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image_url} alt="Texto motivador" className="w-full h-auto mt-2 rounded-md" />
        )}
      </div>
    </div>
  );
}

export function MobileTopicAccordion({ topic }: { topic: EssayTopic }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden mb-4 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
      {/* --- TRIGGER (Cabeçalho Clicável) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="bg-[#EBC84C] p-2 rounded-lg text-slate-900 shadow-sm shadow-yellow-200 shrink-0">
            <FileText className="size-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
              {isOpen ? "Ocultar Proposta" : "Ver Proposta e Textos"}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium line-clamp-1 max-w-[200px]">
              {topic.title}
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="size-5 text-slate-400" />
        ) : (
          <ChevronDown className="size-5 text-slate-400" />
        )}
      </button>

      {/* --- CONTEÚDO (Expansível) --- */}
      {isOpen && (
        <div className="border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
          <ScrollArea className="h-[400px] w-full bg-white">
            <div className="p-5">

              {/* Comando da Proposta */}
              <div className="mb-6 p-4 bg-[#FFFDF5] border-l-4 border-[#EBC84C] rounded-r-xl text-sm">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#8B781F] mb-2">
                  Comando da Proposta
                </h5>
                <p className="text-slate-700 leading-relaxed text-xs">
                  Redija texto dissertativo-argumentativo sobre: <span className="font-bold text-[#1E3A8A]">"{topic.title}"</span>.
                </p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Textos Motivadores</span>
                <div className="h-px bg-slate-100 flex-1"></div>
              </div>

              {/* Lista de Textos */}
              <div>
                {topic.motivating_texts?.map((text, i) => (
                  <MobileMotivatingTextItem key={i} item={text} index={i} />
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}