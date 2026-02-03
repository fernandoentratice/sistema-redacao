import { Button } from "@repo/ui/components/button";
import { User, Mail, UserCog } from "lucide-react";
import { CreditBalance } from "@/components/credit-balance";
import { UserData } from "@repo/types";

export function ProfileHeader({ user }: { user: UserData }) {
  return (
    <div className="rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
      <div className="shrink-0 relative">
        <div className="size-32 md:size-40 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="size-16 text-slate-300" />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 items-center md:items-start text-center md:text-left w-full">
        <div className="flex flex-col md:flex-row w-full md:justify-between items-center md:items-start gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-3xl font-extrabold">
              {user.name}
            </h2>

            <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
              <Mail className="size-3.5" />
              {user.email}
            </div>
          </div>
          <CreditBalance amount={12} />
        </div>

        <Button className="rounded-full h-12 cursor-pointer">
          <UserCog className="size-4.5" />
          Editar informações
        </Button>
      </div>
    </div>
  );
}