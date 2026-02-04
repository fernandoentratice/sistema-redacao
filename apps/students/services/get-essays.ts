import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export async function getUserEssays() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("essays")
    .select("*")
    .eq("student_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar redações:", error);
    return [];
  }

  return data || [];
}

export async function getEssayById(essayId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("essays")
    .select("*")
    .eq("id", essayId)
    .eq("student_id", user.id)
    .single();

  if (error || !data) {
    console.error("Redação não encontrada ou acesso negado");
    return null;
  }

  return data;
}
