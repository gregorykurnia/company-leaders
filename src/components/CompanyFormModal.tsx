"use client";

import { useEffect, useState } from "react";
import { ImageUpload } from "./ImageUpload";
import {
  DEFAULT_PHOTO_POSITION,
  type Company,
  type CompanyInput,
  type Country,
} from "@/lib/types";

const emptyForm = (country: Country, nextRank: number): CompanyInput => {
  const form: CompanyInput = {
    name: "",
    industry: "",
    rank: nextRank,
    ceoName: "",
    ceoPhotoUrl: "",
    ceoPhotoPosition: DEFAULT_PHOTO_POSITION,
    presidentCommissionerName: "",
    presidentCommissionerPhotoUrl: "",
    presidentCommissionerPhotoPosition: DEFAULT_PHOTO_POSITION,
    country,
  };

  if (country === "US") {
    return {
      ...form,
      founderName: "",
      founderPhotoUrl: "",
      founderPhotoPosition: DEFAULT_PHOTO_POSITION,
      establishedAt: null,
    };
  }

  return form;
};

function formFromCompany(
  company: Company,
  country: Country,
  nextRank: number,
): CompanyInput {
  return {
    ...emptyForm(country, nextRank),
    name: company.name,
    industry: company.industry,
    rank: company.rank,
    ceoName: company.ceoName,
    ceoPhotoUrl: company.ceoPhotoUrl,
    ceoPhotoPosition: company.ceoPhotoPosition ?? DEFAULT_PHOTO_POSITION,
    presidentCommissionerName: company.presidentCommissionerName,
    presidentCommissionerPhotoUrl: company.presidentCommissionerPhotoUrl,
    presidentCommissionerPhotoPosition:
      company.presidentCommissionerPhotoPosition ?? DEFAULT_PHOTO_POSITION,
    ...(country === "US"
      ? {
          founderName: company.founderName ?? "",
          founderPhotoUrl: company.founderPhotoUrl ?? "",
          founderPhotoPosition:
            company.founderPhotoPosition ?? DEFAULT_PHOTO_POSITION,
          establishedAt: company.establishedAt ?? null,
        }
      : {}),
    country: company.country,
  };
}

export function CompanyFormModal({
  country,
  nextRank,
  company,
  onClose,
  onSave,
  onDelete,
}: {
  country: Country;
  nextRank: number;
  company: Company | null;
  onClose: () => void;
  onSave: (input: CompanyInput) => Promise<void>;
  onDelete?: () => Promise<void>;
}) {
  const isUSA = country === "US";
  const [form, setForm] = useState<CompanyInput>(() =>
    company
      ? formFromCompany(company, country, nextRank)
      : emptyForm(country, nextRank),
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(
      company
        ? formFromCompany(company, country, nextRank)
        : emptyForm(country, nextRank),
    );
  }, [company, country, nextRank]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-[2px]">
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-24px_rgba(60,45,170,0.45)] sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold tracking-[-0.01em] text-ink">
            {company ? "Edit Company" : "Add Company"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-accent/10"
          >
            <svg
              aria-hidden
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex gap-4">
            <Field label="Company name" className="flex-1">
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
                className={inputClass}
                placeholder="e.g. Bank Central Asia"
              />
            </Field>
            <Field label="Rank" className="w-20">
              <input
                type="number"
                min={1}
                value={form.rank}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, rank: Number(e.target.value) }))
                }
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Industry">
            <input
              value={form.industry}
              onChange={(e) => setForm((prev) => ({ ...prev, industry: e.target.value }))}
              className={inputClass}
              placeholder="e.g. Banking"
            />
          </Field>

          <div
            className={`grid justify-items-start gap-4 ${isUSA ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}
          >
            <ImageUpload
              label="CEO photo"
              value={form.ceoPhotoUrl}
              position={form.ceoPhotoPosition}
              onChange={(url) => setForm((prev) => ({ ...prev, ceoPhotoUrl: url }))}
              onPositionChange={(ceoPhotoPosition) =>
                setForm((prev) => ({ ...prev, ceoPhotoPosition }))
              }
            />
            <ImageUpload
              label={`${isUSA ? "Chairman" : "President Commissioner"} photo`}
              value={form.presidentCommissionerPhotoUrl}
              position={form.presidentCommissionerPhotoPosition}
              onChange={(url) =>
                setForm((prev) => ({ ...prev, presidentCommissionerPhotoUrl: url }))
              }
              onPositionChange={(presidentCommissionerPhotoPosition) =>
                setForm((prev) => ({ ...prev, presidentCommissionerPhotoPosition }))
              }
            />
            {isUSA && (
              <ImageUpload
                label="Founder photo"
                value={form.founderPhotoUrl ?? ""}
                position={form.founderPhotoPosition ?? DEFAULT_PHOTO_POSITION}
                onChange={(url) =>
                  setForm((prev) => ({ ...prev, founderPhotoUrl: url }))
                }
                onPositionChange={(founderPhotoPosition) =>
                  setForm((prev) => ({ ...prev, founderPhotoPosition }))
                }
              />
            )}
          </div>

          <Field label="CEO name">
            <input
              value={form.ceoName}
              onChange={(e) => setForm((prev) => ({ ...prev, ceoName: e.target.value }))}
              className={inputClass}
            />
          </Field>

          <Field label={`${isUSA ? "Chairman" : "President Commissioner"} name`}>
            <input
              value={form.presidentCommissionerName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, presidentCommissionerName: e.target.value }))
              }
              className={inputClass}
            />
          </Field>

          {isUSA && (
            <Field label="Founder name">
              <input
                value={form.founderName ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, founderName: e.target.value }))
                }
                className={inputClass}
              />
            </Field>
          )}

          {isUSA && (
            <Field label="Established At">
              <input
                id="established-at"
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                value={form.establishedAt ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    establishedAt:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
                className={inputClass}
                placeholder="e.g. 1901"
              />
            </Field>
          )}

          <div className="mt-2 flex items-center justify-between">
            <div>
              {company && onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-accent/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
