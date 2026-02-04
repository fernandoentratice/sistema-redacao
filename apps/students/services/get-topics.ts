import { createClient } from "@/lib/server";
import { EssayTopic, EssayTopicDetail } from "@repo/types";

export async function getTopicsList(): Promise<EssayTopic[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("essay_topics")
    .select("id, title, axis, source_type, source_year, active, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTopicDetails(id: string): Promise<EssayTopicDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("essay_topics")
    .select(
      `
      *,
      motivational_texts (*)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) return null;

  //TODO: entender a necessidade de ordenação qui

  // Ordenação (Mantive a lógica, ela roda super rápido no Node.js do servidor)
  // if (data.motivational_texts) {
  //   data.motivational_texts.sort(
  //     (a: MotivationalText, b: MotivationalText) => a.text_number - b.text_number
  //   );
  // }

  return data as EssayTopicDetail;
}
