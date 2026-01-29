import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme sua senha"), // Precisa existir aqui
  role: z.enum(["STUDENT", "TEACHER", "ADMIN"]),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], // <--- O SEGREDO ESTÁ AQUI
});
// Inferência de Tipos (Isso gera o Type do TypeScript automaticamente a partir do Zod)
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;