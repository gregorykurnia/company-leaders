"use client";

import { Silhouette } from "@/components/Silhouette";
import { toneAt } from "@/lib/tones";
import { DEFAULT_PHOTO_POSITION, type Company, type PhotoPosition } from "@/lib/types";

function PersonAvatar({
  name,
  photoUrl,
  position,
  role,
  deep,
}: {
  name: string;
  photoUrl: string;
  position?: PhotoPosition;
  role: string;
  deep: string;
}) {
  const pos = position ?? DEFAULT_PHOTO_POSITION;

  return (
    <div className="min-w-0 flex-1">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[18px] bg-white/60">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={name}
            className="h-full w-full object-cover"
            style={{ objectPosition: `${pos.x}% ${pos.y}%` }}
          />
        ) : (
          <Silhouette color={deep} />
        )}
      </div>
      <p className="mt-3 break-words text-[15px] font-bold leading-tight">
        {name || "—"}
      </p>
      <p className="mt-0.5 text-[13px] leading-snug text-ink-soft">{role}</p>
    </div>
  );
}

export function CompanyCard({
  company,
  toneIndex,
  onClick,
}: {
  company: Company;
  toneIndex: number;
  onClick: () => void;
}) {
  const tone = toneAt(toneIndex);

  return (
    <button
      onClick={onClick}
      style={{ background: tone.tile }}
      className="flex flex-col gap-5 rounded-[28px] p-6 text-left text-ink transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgba(60,45,170,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[21px] font-bold leading-tight tracking-[-0.01em]">
            {company.name}
          </h2>
          {company.industry && (
            <p className="mt-1 text-sm text-ink-soft">{company.industry}</p>
          )}
          {company.country === "US" && company.establishedAt != null && (
            <p className="mt-0.5 text-sm text-ink-soft">
              Established {company.establishedAt}
            </p>
          )}
        </div>
        {company.rank > 0 && (
          <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white text-sm font-extrabold">
            {company.rank}
          </span>
        )}
      </div>
      <div className="flex w-full gap-3.5">
        <PersonAvatar
          name={company.ceoName}
          photoUrl={company.ceoPhotoUrl}
          position={company.ceoPhotoPosition}
          role="CEO"
          deep={tone.deep}
        />
        <PersonAvatar
          name={company.presidentCommissionerName}
          photoUrl={company.presidentCommissionerPhotoUrl}
          position={company.presidentCommissionerPhotoPosition}
          role={company.country === "US" ? "Chairman" : "President Commissioner"}
          deep={tone.deep}
        />
        {company.country === "US" && (
          <PersonAvatar
            name={company.founderName ?? ""}
            photoUrl={company.founderPhotoUrl ?? ""}
            position={company.founderPhotoPosition}
            role="Founder"
            deep={tone.deep}
          />
        )}
      </div>
    </button>
  );
}
