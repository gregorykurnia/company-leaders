"use client";

import type { Company } from "@/lib/types";

function PersonAvatar({ name, photoUrl, role }: { name: string; photoUrl: string; role: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-1 flex-col items-center gap-2 text-center">
      <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-200">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-zinc-500">
            {initials || "?"}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-900">
          {name || "—"}
        </p>
        <p className="text-xs text-zinc-500">{role}</p>
      </div>
    </div>
  );
}

export function CompanyCard({
  company,
  onClick,
}: {
  company: Company;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h3 className="truncate text-base font-semibold text-zinc-900">
        {company.name}
      </h3>
      <div className="flex gap-4">
        <PersonAvatar
          name={company.ceoName}
          photoUrl={company.ceoPhotoUrl}
          role="CEO"
        />
        <PersonAvatar
          name={company.presidentCommissionerName}
          photoUrl={company.presidentCommissionerPhotoUrl}
          role="President Commissioner"
        />
      </div>
    </button>
  );
}
