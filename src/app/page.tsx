"use client";

import { useEffect, useState } from "react";
import { CountryTabs } from "@/components/CountryTabs";
import { CompanyCard } from "@/components/CompanyCard";
import { CompanyFormModal } from "@/components/CompanyFormModal";
import {
  createCompany,
  deleteCompany,
  subscribeToCompanies,
  updateCompany,
} from "@/lib/companies";
import type { Company, CompanyInput, Country } from "@/lib/types";

const GRID = "grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5";

export default function Home() {
  const [country, setCountry] = useState<Country>("ID");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const unsubscribe = subscribeToCompanies(
      country,
      (data) => {
        setCompanies(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [country]);

  function openAddModal() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEditModal(company: Company) {
    setEditing(company);
    setModalOpen(true);
  }

  async function handleSave(input: CompanyInput) {
    if (editing) {
      await updateCompany(editing.id, input);
    } else {
      await createCompany(input);
    }
  }

  async function handleDelete() {
    if (!editing) return;
    await deleteCompany(editing.id);
    setModalOpen(false);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-10 px-4 pb-32 pt-9 sm:px-8 sm:pt-14">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div aria-hidden className="flex items-end gap-[5px]">
              <span className="h-[30px] w-[18px] rounded-t-[9px] rounded-b-[3px] bg-accent" />
              <span className="h-11 w-[18px] rounded-t-[9px] rounded-b-[3px] bg-[#7ed9b5]" />
              <span className="h-6 w-[18px] rounded-t-[9px] rounded-b-[3px] bg-[#ffd964]" />
            </div>
            <div>
              <h1 className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[56px]">
                Top Companies
              </h1>
              <p className="mt-3 max-w-[480px] text-lg leading-normal text-ink-soft">
                Track leadership across top companies by country
              </p>
            </div>
          </div>
          <CountryTabs active={country} onChange={setCountry} />
        </header>

        <button
          onClick={openAddModal}
          aria-label="Add Company"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_14px_30px_-10px_rgba(91,69,240,0.65)] transition-colors hover:bg-accent-deep"
        >
          <svg
            aria-hidden
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        {loading ? (
          <div className={GRID} aria-busy="true" aria-label="Loading companies">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[360px] animate-pulse rounded-[28px] bg-white/70"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[28px] bg-white p-6 text-sm text-red-700 shadow-[0_10px_28px_-18px_rgba(60,45,170,0.35)]">
            <p className="font-semibold">Couldn&apos;t load companies.</p>
            <p className="mt-1">{error}</p>
            <p className="mt-2 text-ink-soft">
              This is usually a Firestore security rules or database setup
              issue — check the Firebase console.
            </p>
          </div>
        ) : companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-accent/30 py-20 text-center">
            <p className="text-sm text-ink-soft">
              No companies yet for this country.
            </p>
            <button
              onClick={openAddModal}
              className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              Add the first one
            </button>
          </div>
        ) : (
          <div className={GRID}>
            {companies.map((company, index) => (
              <CompanyCard
                key={company.id}
                company={company}
                toneIndex={index}
                onClick={() => openEditModal(company)}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <CompanyFormModal
          country={country}
          nextRank={companies.length + 1}
          company={editing}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          onDelete={editing ? handleDelete : undefined}
        />
      )}
    </div>
  );
}
