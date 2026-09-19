"use client";

import { DEFAULT_PHOTO_POSITION, type Company, type PhotoPosition } from "@/lib/types";

function PersonAvatar({
  name,
  photoUrl,
  position,
  role,
}: {
  name: string;
  photoUrl: string;
  position?: PhotoPosition;
  role: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const pos = position ?? DEFAULT_PHOTO_POSITION;

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-zinc-200">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={name}
            className="h-full w-full object-cover"
            style={{ objectPosition: `${pos.x}% ${pos.y}%` }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-zinc-500">
            {initials || "?"}
          </div>
        )}
      </div>
      <div>
        <p className="break-words text-sm font-medium text-zinc-900">
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
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-zinc-900">
            {company.name}
          </h3>
          {company.industry && (
            <p className="truncate text-xs text-zinc-500">
              {company.industry}
            </p>
          )}
        </div>
        {company.rank > 0 && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
            {company.rank}
          </span>
        )}
      </div>
      <div
        className={`grid gap-3 ${
          company.country === "US" ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        <PersonAvatar
          name={company.ceoName}
          photoUrl={company.ceoPhotoUrl}
          position={company.ceoPhotoPosition}
          role="CEO"
        />
        <PersonAvatar
          name={company.presidentCommissionerName}
          photoUrl={company.presidentCommissionerPhotoUrl}
          position={company.presidentCommissionerPhotoPosition}
          role={company.country === "US" ? "Chairman" : "President Commissioner"}
        />
        {company.country === "US" && (
          <PersonAvatar
            name={company.founderName ?? ""}
            photoUrl={company.founderPhotoUrl ?? ""}
            position={company.founderPhotoPosition}
            role="Founder"
          />
        )}
      </div>
    </button>
  );
}
