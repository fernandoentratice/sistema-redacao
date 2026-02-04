import { createClient } from "@/lib/server";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { FileText, AlertCircle } from "lucide-react";
import { EssayEditorForm } from "@/components/essay-editor-form";
import { MobileTopicAccordion } from "@/components/mobile-topic-accordion";
import { redirect } from "next/navigation";
import type { EssayTopicDetail, MotivationalText } from "@repo/types";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

function SidebarMotivatingText({ item }: { item: MotivationalText }) {
  return (
    <div className="mb-6 last:mb-0">
      <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8B781F] bg-[#EBC84C]/20 rounded-md">
        Texto {item.text_number}
      </span>

      <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
        {item.body_text && (
          <p className="whitespace-pre-line hover:line-clamp-none transition-all">
            {item.body_text}
          </p>
        )}

        {item.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image_url}
            alt={`Texto motivador ${item.text_number}`}
            className="w-full h-auto mt-2 rounded-md"
          />
        )}

        {item.source_reference && (
          <div className="mt-2 pt-2 border-t border-slate-200">
            <p className="text-[10px] text-slate-400 italic">
              Fonte: {item.source_reference}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function NewEssayPage(props: Props) {
  const supabase = await createClient();
  const searchParams = await props.searchParams;
  const topicId = searchParams.id;

  if (!topicId) {
    redirect("/temas");
  }

  const { data, error } = await supabase
    .from("essay_topics")
    .select(`
      *,
      motivational_texts (*)
    `)
    .eq("id", topicId)
    .single();

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-slate-500">
        <AlertCircle className="w-10 h-10 mb-4 text-red-400" />
        <h2 className="text-lg font-bold text-slate-800">Tema não encontrado</h2>
        <p className="text-sm">O ID fornecido é inválido ou o tema foi removido.</p>
      </div>
    );
  }

  const essayTopic = data as EssayTopicDetail;

  const texts = essayTopic.motivational_texts
    ? [...essayTopic.motivational_texts].sort((a, b) => a.text_number - b.text_number)
    : [];

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col max-w-full">
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden gap-8">

        {/* === COLUNA ESQUERDA (TEXTOS DE APOIO) === */}
        <div className="hidden lg:flex w-full lg:w-[450px] shrink-0 flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden h-full shadow-sm z-10">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2 text-[#1E3A8A] shrink-0">
            <FileText className="size-4" />
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Proposta de Redação
            </h3>
          </div>

          <ScrollArea className="flex-1 w-full h-full bg-white">
            <div className="p-5">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                  Tema Selecionado
                </span>
                <h2 className="text-lg font-bold text-slate-900 leading-tight mt-1">
                  {essayTopic.title}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-semibold uppercase">
                    {essayTopic.source_type} {essayTopic.source_year}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-semibold uppercase">
                    {essayTopic.axis}
                  </span>
                </div>
              </div>

              <div className="mb-8 p-4 bg-[#FFFDF5] border-l-4 border-[#EBC84C] rounded-r-xl text-sm">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#8B781F] mb-2">
                  Comando da Proposta
                </h5>
                <p className="text-slate-700 leading-relaxed text-xs md:text-sm">
                  A partir da leitura dos textos motivadores e com base nos conhecimentos construídos ao longo de sua formação, redija texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema: <span className="font-bold text-[#1E3A8A]">“{essayTopic.title}”</span>.
                </p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                  Textos Motivadores
                </span>
                <div className="h-px bg-slate-100 flex-1"></div>
              </div>

              <div>
                {texts.map((text) => (
                  <SidebarMotivatingText key={text.id} item={text} />
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* === COLUNA DIREITA (EDITOR) === */}
        <div className="flex-1 h-full flex flex-col min-w-0">
          <MobileTopicAccordion topic={essayTopic} />

          <EssayEditorForm
            topicTitle={essayTopic.title}
            topicAxis={essayTopic.axis}
          />
        </div>
      </div>
    </div>
  );
}