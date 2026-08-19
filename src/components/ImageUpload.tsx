"use client";

import { useRef, useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { DEFAULT_PHOTO_POSITION, type PhotoPosition } from "@/lib/types";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function ImageUpload({
  label,
  value,
  position,
  onChange,
  onPositionChange,
}: {
  label: string;
  value: string;
  position: PhotoPosition;
  onChange: (url: string) => void;
  onPositionChange: (position: PhotoPosition) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number; pos: PhotoPosition } | null>(
    null,
  );

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
      onPositionChange(DEFAULT_PHOTO_POSITION);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (!value) return;
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX, y: e.clientY, pos: position };
    setDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragStart.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaXPct = ((e.clientX - dragStart.current.x) / rect.width) * 100;
    const deltaYPct = ((e.clientY - dragStart.current.y) / rect.height) * 100;
    onPositionChange({
      x: clamp(dragStart.current.pos.x - deltaXPct, 0, 100),
      y: clamp(dragStart.current.pos.y - deltaYPct, 0, 100),
    });
  }

  function handlePointerUp() {
    dragStart.current = null;
    setDragging(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <div
        ref={containerRef}
        onClick={() => !value && inputRef.current?.click()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-dashed border-zinc-300 bg-zinc-50 transition hover:border-zinc-400 ${
          value ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
        }`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt={label}
            draggable={false}
            className="h-full w-full select-none object-cover"
            style={{ objectPosition: `${position.x}% ${position.y}%` }}
          />
        ) : (
          <span className="px-2 text-center text-xs text-zinc-400">
            {uploading ? "Uploading..." : "Click to upload"}
          </span>
        )}
        {value && !dragging && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 text-center text-xs text-white opacity-0 transition group-hover:opacity-100">
            Drag to reposition
          </div>
        )}
      </div>
      {value && (
        <div className="flex gap-3 text-xs">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-zinc-500 underline hover:text-zinc-700"
          >
            Replace
          </button>
          <button
            type="button"
            onClick={() => onPositionChange(DEFAULT_PHOTO_POSITION)}
            className="text-zinc-500 underline hover:text-zinc-700"
          >
            Reset position
          </button>
        </div>
      )}
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
