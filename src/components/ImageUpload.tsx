"use client";

import { useRef, useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <div
        onClick={() => inputRef.current?.click()}
        className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-zinc-300 bg-zinc-50 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt={label}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-2 text-center text-xs text-zinc-400">
            {uploading ? "Uploading..." : "Click to upload"}
          </span>
        )}
        {value && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs text-white opacity-0 transition group-hover:opacity-100">
            Change
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
