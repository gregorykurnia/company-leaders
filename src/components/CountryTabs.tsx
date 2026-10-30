"use client";

import type { Country } from "@/lib/types";

const TABS: { value: Country; label: string; flag: string }[] = [
  { value: "ID", label: "Indonesia", flag: "flag-id" },
  { value: "US", label: "USA", flag: "flag-us" },
];

export function CountryTabs({
  active,
  onChange,
}: {
  active: Country;
  onChange: (country: Country) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Country"
      className="inline-flex gap-1 rounded-full bg-white p-1.5 shadow-[0_10px_28px_-14px_rgba(60,45,170,0.35)]"
    >
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          aria-pressed={active === tab.value}
          className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors ${
            active === tab.value
              ? "bg-accent text-white"
              : "text-ink-soft hover:bg-accent/10"
          }`}
        >
          <span className={`flag ${tab.flag}`} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
