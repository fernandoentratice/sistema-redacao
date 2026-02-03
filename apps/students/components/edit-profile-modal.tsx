import { useState, useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@repo/ui/components/dialog";
import { User, Camera, Loader2 } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  avatarUrl: string | null;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  initialData: UserData;
  onSave: (newData: { name: string; avatarUrl: string | null }) => Promise<void>;
}

export function EditProfileModal({ isOpen, onClose, initialData, onSave }: EditProfileModalProps) {
  const [name, setName] = useState(initialData.name);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData.avatarUrl);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSave({ name, avatarUrl: avatarPreview });
    setIsLoading(false);
    onClose(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-4xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-center">
            Editar Informações
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500">
            Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 mt-4">
          {/* Avatar Upload */}
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="size-32 rounded-full bg-slate-50 border-4 border-[#FFF9E6] flex items-center justify-center overflow-hidden ring-4 ring-transparent hover:ring-[#FFF9E6] transition-all">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User className="size-12 text-slate-300" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 p-2.5 bg-slate-900 text-white rounded-full border-4 border-white shadow-md">
              <Camera className="size-4" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="w-full space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1.5">Nome Completo</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-slate-200 focus:border-[#EBC84C] focus:ring-[#EBC84C]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-1.5">E-mail (Não editável)</label>
              <Input
                value={initialData.email}
                disabled
                className="rounded-xl bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed opacity-100"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full mt-2">
            <Button
              variant="outline"
              onClick={() => onClose(false)}
              className="flex-1 h-10 rounded-full font-bold border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 h-10 rounded-full font-bold shadow-lg shadow-yellow-500/10"
            >
              {isLoading ? <>
                <Loader2 className="animate-spin size-5" />
                Salvando
              </> : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}