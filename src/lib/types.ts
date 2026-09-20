export type Country = "ID" | "US";

export interface PhotoPosition {
  x: number; // 0-100, percentage
  y: number; // 0-100, percentage
}

export const DEFAULT_PHOTO_POSITION: PhotoPosition = { x: 50, y: 50 };

export interface Company {
  id: string;
  name: string;
  industry: string;
  rank: number;
  ceoName: string;
  ceoPhotoUrl: string;
  ceoPhotoPosition: PhotoPosition;
  presidentCommissionerName: string;
  presidentCommissionerPhotoUrl: string;
  presidentCommissionerPhotoPosition: PhotoPosition;
  /** Founder fields are only used by USA companies. */
  founderName?: string;
  founderPhotoUrl?: string;
  founderPhotoPosition?: PhotoPosition;
  /** Established year is only used by USA companies. */
  establishedAt?: number | null;
  country: Country;
  createdAt: number;
}

export type CompanyInput = Omit<Company, "id" | "createdAt">;
