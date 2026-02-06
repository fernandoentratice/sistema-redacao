import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { registerSchema, type RegisterSchema } from "@repo/validators";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";
import { Input } from "./input";

type AppType = "admin" | "teacher" | "student";

const ROLE_MAP: Record<AppType, "STUDENT" | "TEACHER" | "ADMIN"> = {
  student: "STUDENT",
  teacher: "TEACHER",
  admin: "ADMIN",
};

const APP_CONFIG: Record<AppType, { title: string; description: string; }> = {
  student: {
    title: "Crie sua conta",
    description: 'Junte-se a milhares de estudantes e melhore suas redações hoje mesmo.',
  },
  teacher: {
    title: "Cadastro de Docente",
    description: 'Junte-se ao time de corretores.',
  },
  admin: {
    title: "Novo Administrador",
    description: 'Cadastro de gestão do sistema.',
  },
};

interface SignUpFormProps {
  appType: AppType;
  onSubmit: (values: RegisterSchema) => Promise<void>;
  isSubmitting?: boolean;
}

export function SignUpForm({ appType, onSubmit, isSubmitting = false }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const texts = APP_CONFIG[appType];

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ROLE_MAP[appType],
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = async (values: RegisterSchema) => {
    await onSubmit(values);
  };

  return (
    <div className="w-full max-w-[480px] flex flex-col items-center">

      <div className="mb-8 flex flex-col items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Redação 1000
        </h1>
      </div>

      <Card className="w-full bg-white rounded-xl shadow-xl border border-[#e8e4ce]/30 p-8 md:p-10">
        <CardHeader className="mb-8 text-center">
          <CardTitle className="text-2xl font-bold leading-tight mb-2">
            {texts.title}
          </CardTitle>
          <CardDescription className="text-[#9c8e49] text-sm">
            {texts.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full rounded-3xl border-[#e8e4ce] h-12 p-3.5 focus-visible:ring-primary"
                        placeholder="Digite seu nome completo"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full rounded-3xl border-[#e8e4ce] h-12 p-3.5 focus-visible:ring-primary"
                        placeholder="seu@email.com"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full rounded-3xl border-[#e8e4ce] h-12 p-3.5 focus-visible:ring-primary"
                          type={showPassword ? "text" : "password"}
                          placeholder="Crie uma senha segura"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full rounded-3xl border-[#e8e4ce] h-12 p-3.5 focus-visible:ring-primary"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirme sua senha"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full font-bold h-12 rounded-3xl"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Cadastrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col justify-center">
          <div className="w-full mt-2 pt-4 border-t border-[#e8e4ce] text-center text-sm">
            <p>
              Já tem uma conta?
              <a className="text-primary font-bold hover:underline ml-1" href="/login">
                Faça login
              </a>
            </p>
          </div>
        </CardFooter>
      </Card >
    </div >
  );
}