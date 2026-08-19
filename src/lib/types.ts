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
  country: Country;
  createdAt: number;
}

export type CompanyInput = Omit<Company, "id" | "createdAt">;
