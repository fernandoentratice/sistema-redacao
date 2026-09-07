"use client";

import { Eye, UserCheck, UserX } from "lucide-react";
import { Avatar } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { updateStudentStatus } from "@/app/actions/students";
import Link from "next/link";
import { StudentsListItem } from "@/types";
import { useToggleUserStatus } from "@/hooks/use-toggle-user-status";
import { USER_STATUS_MAP } from "@repo/constants";
import { formatDate } from "@repo/utils";

export function StudentsTableRow({
  student,
}: {
  student: StudentsListItem;
}) {
  const { entity: studentItem, toggleStatus } = useToggleUserStatus(
    student,
    updateStudentStatus
  );

  const currentStatus =
    USER_STATUS_MAP[
    studentItem.status as keyof typeof USER_STATUS_MAP
    ] || USER_STATUS_MAP.inactive;

  // const formatDate = (date?: string | null) => {
  //   if (!date) return null;

  //   return new Intl.DateTimeFormat("pt-BR", {
  //     timeZone: "America/Sao_Paulo",
  //   }).format(new Date(date));
  // };

  const getPlanPeriodLabel = () => {
    if (!studentItem.plan) return null;

    if (studentItem.plan.interval === "lifetime") {
      return "Sem vencimento";
    }

    if (
      studentItem.plan.interval === "month" &&
      studentItem.plan.interval_count === 3
    ) {
      return "Trimestral";
    }

    if (
      studentItem.plan.interval === "month" &&
      studentItem.plan.interval_count === 1
    ) {
      return "Mensal";
    }

    if (
      studentItem.plan.interval === "day" &&
      studentItem.plan.interval_count
    ) {
      return `${studentItem.plan.interval_count} dia${studentItem.plan.interval_count > 1 ? "s" : ""
        }`;
    }

    return null;
  };

  const planLabel =
    studentItem.plan?.name === "Plano Gratuito"
      ? "Gratuito"
      : studentItem.plan?.name || "Sem plano";

  const periodLabel = getPlanPeriodLabel();

  const credits = [
    {
      label: "Plano",
      value: studentItem.credits.plan,
      className: "bg-purple-50 text-purple-700",
    },
    {
      label: "Extra",
      value: studentItem.credits.extra,
      className: "bg-blue-50 text-blue-700",
    },
    {
      label: "Gratuito",
      value: studentItem.credits.free,
      className: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Mentoria",
      value: studentItem.credits.mentorship,
      className: "bg-amber-50 text-amber-700",
    },
  ].filter((credit) => credit.value > 0);

  const periodStart = formatDate(
    studentItem.subscription?.current_period_start, 'compact'
  );

  const periodEnd = formatDate(
    studentItem.subscription?.current_period_end, 'compact'
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 lg:px-8 lg:py-4 items-center hover:bg-slate-50/50 transition-colors group">
      <div className="col-span-1 lg:col-span-3 flex items-center gap-4">
        <Avatar
          src={studentItem.avatar_url}
          name={studentItem.full_name}
          className="size-10"
        />

        <div>
          <p className="font-bold text-sm leading-tight">
            {studentItem.full_name}
          </p>

          <p className="text-xs text-slate-500">
            {studentItem.email}
          </p>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2 flex flex-row lg:flex-col items-center justify-between lg:justify-center">
        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Plano
        </span>

        <div className="col-span-1 lg:col-span-2 flex flex-row lg:flex-col items-center justify-between lg:justify-center">
          <span className="inline-flex px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-sm font-bold">
            {planLabel}
          </span>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2 flex flex-row lg:flex-col items-center justify-between lg:justify-center">
        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Créditos
        </span>

        {credits.length > 0 ? (
          <div className="flex flex-wrap items-center justify-end lg:justify-center gap-1.5">
            {credits.map((credit) => (
              <div
                key={credit.label}
                className={`px-3 py-1.5 rounded-lg ${credit.className}`}
              >
                <span className="text-sm font-bold">
                  {credit.value}
                </span>

                <span className="text-xs font-semibold opacity-75 ml-1">
                  {credit.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-xs font-semibold text-slate-400">
            0 créditos
          </span>
        )}
      </div>

      <div className="col-span-1 lg:col-span-1 flex flex-row lg:flex-col items-center justify-between lg:justify-center">
        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Cadastro
        </span>

        <span className="text-sm font-semibold text-slate-600">
          {formatDate(studentItem.created_at, 'compact')}
        </span>
      </div>

      <div className="col-span-1 lg:col-span-2 flex flex-row lg:flex-col items-center justify-between lg:justify-center">
        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Vigência
        </span>

        <div className="text-right lg:text-center">
          {studentItem.plan?.interval === "lifetime" ? (
            <p className="text-sm font-semibold text-slate-500">
              Sem vencimento
            </p>
          ) : periodStart && periodEnd ? (
            <>
              <p className="text-sm font-bold text-slate-700">
                {periodStart} - {periodEnd}
              </p>

              {periodLabel && (
                <p className="text-[9px] font-bold uppercase tracking-wider mt-0.5 text-slate-400">
                  {periodLabel}
                </p>
              )}
            </>
          ) : (
            <span className="text-xs font-semibold text-slate-400">
              Sem vigência
            </span>
          )}
        </div>
      </div>

      <div className="col-span-1 lg:col-span-1 flex flex-row lg:flex-col items-center justify-between lg:justify-center">
        <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Status
        </span>

        <span
          className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${currentStatus.colors}`}
        >
          {currentStatus.label}
        </span>
      </div>

      <div className="col-span-1 lg:col-span-1 flex justify-end pt-4 lg:pt-0 mt-2 lg:mt-0 border-t border-slate-100 lg:border-t-0">
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                asChild
              >
                <Link href={`/alunos/${studentItem.id}`}>
                  <Eye className="size-4.5" />
                </Link>
              </Button>
            </TooltipTrigger>

            <TooltipContent className="bg-slate-900 text-white font-medium text-xs rounded-lg border-none">
              <p>Ver Detalhes</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                onClick={toggleStatus}
              >
                {studentItem.status === "active" ? (
                  <UserX className="size-4.5" />
                ) : (
                  <UserCheck className="size-4.5" />
                )}
              </Button>
            </TooltipTrigger>

            <TooltipContent className="bg-slate-900 text-white font-medium text-xs rounded-lg border-none">
              <p>
                {studentItem.status === "active"
                  ? "Bloquear"
                  : "Ativar"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}