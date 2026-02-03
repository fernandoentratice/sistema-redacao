import { createClient } from "@/lib/server";
import { TopicsList } from "@/components/topics-list";

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const supabase = await createClient();

  const { data: topics } = await supabase
    .from("essay_topics")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });


  const suggestedTopics = topics?.slice(0, 3) || [];
  const allTopics = topics || [];

  return (
    <div className="space-y-12 pb-10">

      {/* --- SEÇÃO 1: TEMAS SUGERIDOS (Hero) --- */}
      {/* <div>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="size-6 text-primary fill-primary" />
          <h2 className="text-2xl font-bold text-foreground">Temas Sugeridos para Você</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedTopics.map((topic) => (
            <div
              key={topic.id}
              className="flex flex-col p-6 rounded-3xl border border-border bg-yellow-50/50 shadow-sm hover:shadow-md transition-all group"
            >

              <div className="mb-4">
                <span className="px-3 py-1 bg-white text-muted-foreground border border-border text-[10px] font-bold uppercase rounded-full">
                  {topic.axis}
                </span>
              </div>


              <h3 className="flex-1 font-bold text-foreground text-lg leading-snug mb-6 line-clamp-3">
                {topic.title}
              </h3>


              <Button className="w-full rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2">
                Começar Agora
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}

          {suggestedTopics.length === 0 && (
            <p className="text-muted-foreground col-span-3 text-center py-10">
              Carregando sugestões...
            </p>
          )}
        </div>
      </div> */}

      {/* --- SEÇÃO 2: LISTA GERAL --- */}
      <div>
        <TopicsList topics={allTopics} />
      </div>

    </div>
  );
}