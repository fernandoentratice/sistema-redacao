'use client'
import { useState } from "react";
import { LoginForm } from "@repo/ui/components/login-form";
import { type LoginSchema } from "@repo/validators";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(data: LoginSchema) {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Login Aluno:", data);
    setIsLoading(false);
  }

  return (
    <div className="bg-gradient-soft min-h-screen flex items-center justify-center p-4">
      <LoginForm
        appType="student"
        onSubmit={handleLogin}
        isSubmitting={isLoading}
      />
    </div>

  )
}