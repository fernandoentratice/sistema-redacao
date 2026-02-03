import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@repo/ui/components/dialog";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  userEmail?: string;
}

export function ResetPasswordModal({ isOpen, onClose, userEmail = "" }: ResetPasswordModalProps) {
  const [email, setEmail] = useState(userEmail);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendLink = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSent(true);
    setIsLoading(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setTimeout(() => setIsSent(false), 300);
    }
    onClose(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-4xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-center ">
            {isSent ? "Email Enviado!" : "Redefinir Senha"}
          </DialogTitle>
          {!isSent && (
            <DialogDescription className="text-center text-slate-500">
              Digite seu e-mail para receber as instruções.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4">
          {isSent ? (
            <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="size-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="size-8" />
              </div>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Enviamos um link de redefinição segura para:<br />
                <strong>{email}</strong>
              </p>
              <Button
                onClick={() => onClose(false)}
                className="w-full h-12 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800"
              >
                Fechar
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <p className="text-sm text-slate-500 text-center leading-relaxed px-2">
                Para sua segurança, enviaremos um link temporário para você criar uma nova senha.
              </p>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1.5">Confirme seu e-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="pl-12 rounded-xl border-slate-200 focus:border-[#EBC84C] focus:ring-[#EBC84C]/20"
                  />
                </div>
              </div>

              <Button
                onClick={handleSendLink}
                disabled={isLoading || !email}
                className="w-full h-10 rounded-full font-bold shadow-lg shadow-yellow-500/10 gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin size-5" /> : (
                  <>
                    Enviar Link
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}