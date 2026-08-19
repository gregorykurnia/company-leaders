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
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">
              Top Companies
            </h1>
            <p className="text-sm text-zinc-500">
              Track leadership across top companies by country
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CountryTabs active={country} onChange={setCountry} />
            <button
              onClick={openAddModal}
              className="whitespace-nowrap rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              + Add Company
            </button>
          </div>
        </header>

        {loading ? (
          <p className="text-sm text-zinc-400">Loading...</p>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p className="font-medium">Couldn&apos;t load companies.</p>
            <p className="mt-1 text-red-600">{error}</p>
            <p className="mt-2 text-red-500">
              This is usually a Firestore security rules or database setup
              issue — check the Firebase console.
            </p>
          </div>
        ) : companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-20 text-center">
            <p className="text-sm text-zinc-500">
              No companies yet for this country.
            </p>
            <button
              onClick={openAddModal}
              className="mt-3 text-sm font-medium text-zinc-900 underline"
            >
              Add the first one
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
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
