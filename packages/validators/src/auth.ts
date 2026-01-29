import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export const registerSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN"]).default("STUDENT"),
});

// Inferência de Tipos (Isso gera o Type do TypeScript automaticamente a partir do Zod)
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;