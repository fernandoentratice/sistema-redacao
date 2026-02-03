"use server";

import { createClient } from "@/lib/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type EssayState = {
  error?: string | null;
  success?: boolean;
};

export async function submitEssay(prevState: EssayState, formData: FormData): Promise<EssayState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Você precisa estar logado para enviar." };
  }

  const title = formData.get("title") as string;
  const thematicAxis = formData.get("thematicAxis") as string;
  const content = formData.get("content") as string;

  if (!content || content.length < 50) {
    return { error: "A redação está muito curta." };
  }

  try {
    const { error } = await supabase.rpc("submit_essay", {
      p_student_id: user.id,
      p_title: title,
      p_thematic_axis: thematicAxis || "Geral",
      p_content: content,
      p_cost: 1,
    });

    if (error) {
      console.error("Erro RPC:", error);
      return { error: error.message };
    }
  } catch (err) {
    console.error("Erro catch:", err);
    return { error: "Erro interno ao enviar redação." };
  }

  revalidatePath("/minhas-redacoes");
  revalidatePath("/dashboard");
  redirect("/minhas-redacoes");
}
