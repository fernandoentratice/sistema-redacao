import { createClient } from "@/lib/server";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { FileText } from "lucide-react";
import { EssayEditorForm } from "@/components/essay-editor-form";
import { MobileTopicAccordion } from "@/components/mobile-topic-accordion";
import type { EssayTopic, MotivatingText } from "@repo/types";

type Props = {
  searchParams: Promise<{ topic?: string }>;
};

function SidebarMotivatingText({ item }: { item: MotivatingText }) {
  return (
    <div className="mb-6 last:mb-0">
      <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8B781F] bg-[#EBC84C]/20 rounded-md">
        {item.label}
      </span>

      <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
        {item.content && <p className="whitespace-pre-line line-clamp-6 hover:line-clamp-none transition-all">{item.content}</p>}

        {item.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image_url} alt="Texto motivador" className="w-full h-auto mt-2 rounded-md" />
        )}
      </div>
    </div>
  );
}

export default async function NewEssayPage(props: Props) {
  const supabase = await createClient();
  const searchParams = await props.searchParams;
  const slug = searchParams.topic;

  const { data: topic } = await supabase
    .from("essay_topics")
    .select("*")
    .eq("slug", slug)
    .single();

  const essayTopic = topic as EssayTopic;

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col max-w-full">
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden gap-8">
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
              </div>

              <div className="mb-8 p-4 bg-[#FFFDF5] border-l-4 border-[#EBC84C] rounded-r-xl text-sm">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#8B781F] mb-2">
                  Comando da Proposta
                </h5>
                <p className="text-slate-700 leading-relaxed text-xs md:text-sm">
                  Redija texto dissertativo-argumentativo sobre:
                  <span className="font-bold text-[#1E3A8A]">
                    {`"${essayTopic.title}"`}
                  </span>.
                </p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                  Textos Motivadores
                </span>
                <div className="h-px bg-slate-100 flex-1"></div>
              </div>

              <div>
                {essayTopic.motivating_texts?.map((text, i) => (
                  <SidebarMotivatingText key={i} item={text} />
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1 h-full flex flex-col min-w-0">
          <MobileTopicAccordion topic={essayTopic} />
          <EssayEditorForm
            topicTitle={essayTopic.title}
            topicAxis={essayTopic.axis} />
        </div>

      </div>
    </div>
  );
}