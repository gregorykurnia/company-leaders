"use client";

import type { Country } from "@/lib/types";

const TABS: { value: Country; label: string; flag: string }[] = [
  { value: "ID", label: "Indonesia", flag: "🇮🇩" },
  { value: "US", label: "USA", flag: "🇺🇸" },
];

export function CountryTabs({
  active,
  onChange,
}: {
  active: Country;
  onChange: (country: Country) => void;
}) {
  return (
    <div className="inline-flex gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            active === tab.value
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          {tab.flag} {tab.label}
        </button>
      ))}
    </div>
  );
}
