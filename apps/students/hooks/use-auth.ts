import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/server";
import { LoginSchema, RegisterSchema } from "@repo/validators";
import { useRouter } from "next/navigation";

// TODO: fazer tratamento correto dos erros
export function useAuth() {
  const supabase = createClient();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw new Error(error.message);
      return authData;
    },
    onSuccess: () => {
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      alert(`Erro ao entrar: ${error.message}`);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            role: data.role,
          },
        },
      });

      if (error) throw new Error(error.message);
      return authData;
    },
    // TODO: entender o fluxo de cadastro: entra direto ou precisa confirmar algo no e-mail? como será gerenciada a assinatura?
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      alert(`Erro ao criar conta: ${error.message}`);
    },
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}
