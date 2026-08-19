"use client";

import { useEffect, useState } from "react";
import { ImageUpload } from "./ImageUpload";
import type { Company, CompanyInput, Country } from "@/lib/types";

const emptyForm = (country: Country, nextSortOrder: number): CompanyInput => ({
  name: "",
  ceoName: "",
  ceoPhotoUrl: "",
  presidentCommissionerName: "",
  presidentCommissionerPhotoUrl: "",
  country,
  sortOrder: nextSortOrder,
});

export function CompanyFormModal({
  country,
  nextSortOrder,
  company,
  onClose,
  onSave,
  onDelete,
}: {
  country: Country;
  nextSortOrder: number;
  company: Company | null;
  onClose: () => void;
  onSave: (input: CompanyInput) => Promise<void>;
  onDelete?: () => Promise<void>;
}) {
  const [form, setForm] = useState<CompanyInput>(
    company ?? emptyForm(country, nextSortOrder),
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(company ?? emptyForm(country, nextSortOrder));
  }, [company, country, nextSortOrder]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            {company ? "Edit Company" : "Add Company"}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">
              Company name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
              placeholder="e.g. Bank Central Asia"
            />
          </div>

          <div className="flex gap-6">
            <ImageUpload
              label="CEO photo"
              value={form.ceoPhotoUrl}
              onChange={(url) => setForm({ ...form, ceoPhotoUrl: url })}
            />
            <ImageUpload
              label="President Commissioner photo"
              value={form.presidentCommissionerPhotoUrl}
              onChange={(url) =>
                setForm({ ...form, presidentCommissionerPhotoUrl: url })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">
              CEO name
            </label>
            <input
              value={form.ceoName}
              onChange={(e) => setForm({ ...form, ceoName: e.target.value })}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">
              President Commissioner name
            </label>
            <input
              value={form.presidentCommissionerName}
              onChange={(e) =>
                setForm({ ...form, presidentCommissionerName: e.target.value })
              }
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div>
              {company && onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
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
