"use client";

import { useState } from "react";
import { Send, Save } from "lucide-react";
import { Button } from "@repo/ui/components/button";

interface EssayEditorFormProps {
  topicId: string;
}

export function EssayEditorForm({ topicId }: EssayEditorFormProps) {
  const [text, setText] = useState("");

  const MAX_CHARS = 10000;
  const charCount = text.length;
  const progressPercentage = Math.min((charCount / MAX_CHARS) * 100, 100);

  const isOverLimit = charCount > MAX_CHARS;
  const progressColor = isOverLimit ? "bg-red-500" : "bg-[#EBC84C]";

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-white rounded-3xl border border-slate-200 flex flex-col flex-1 shadow-sm overflow-hidden relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-slate-100 gap-4 bg-slate-50/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900 text-lg">
                Folha de Redação
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <span className="bg-[#EBC84C]/20 text-[#8B781F] px-2 py-0.5 rounded-md flex items-center gap-1">
                Custa 1 crédito
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 relative flex flex-col p-6">
          <label htmlFor="essay-text" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Seu texto
          </label>

          <textarea
            id="essay-text"
            className="flex-1 w-full resize-none outline-none text-slate-700 leading-relaxed placeholder:text-slate-300 text-base font-medium bg-transparent"
            placeholder="Primeiro, escreva sua redação à mão, como no dia da prova. Depois, transcreva-a aqui."
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />

          <div className="flex justify-end mt-4">
            <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 flex items-center gap-3 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Caracteres
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${isOverLimit ? "text-red-500" : "text-slate-900"}`}>
                  {charCount.toLocaleString('pt-BR')} <span className="text-slate-300">/</span> {MAX_CHARS.toLocaleString('pt-BR')}
                </span>
                <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${progressColor}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <Button
            disabled={isOverLimit || charCount === 0}
            className="w-full sm:w-auto bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-full h-12 shadow-lg shadow-green-500/20 gap-2 transition-all hover:scale-105"
          >
            Enviar para Correção
            <Send className="size-4" />
          </Button>

          <Button
            variant="outline"
            disabled={charCount === 0}
            className="w-full sm:w-auto font-bold rounded-full h-12 px-6 gap-2"
          >
            <Save className="size-4" />
            Salvar Rascunho
          </Button>

        </div>
      </div>
    </div>
  );
}