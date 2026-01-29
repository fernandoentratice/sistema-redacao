'use client'
import { useState } from "react";
import { type LoginSchema } from "@repo/validators";
import { SignUpForm } from "@repo/ui/components/signup-form";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(data: LoginSchema) {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Login Aluno:", data);
    setIsLoading(false);
  }

  return (
    <div className="bg-gradient-soft min-h-screen flex items-center justify-center p-4">
      <SignUpForm
        appType="student"
        onSubmit={handleLogin}
        isSubmitting={isLoading}
      />
    </div>

  )
}