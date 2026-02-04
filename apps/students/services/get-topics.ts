"use server";

import { createClient } from "@/lib/server";
import { EssayTopic, EssayTopicDetail, MotivationalText } from "@repo/types";

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

  if (error) {
    console.error("Erro ao buscar detalhes do tema:", error);
    return null;
  }
  if (!data) return null;

  if (data.motivational_texts) {
    data.motivational_texts.sort(
      (a: MotivationalText, b: MotivationalText) => a.text_number - b.text_number
    );
  }

  return data as EssayTopicDetail;
}
