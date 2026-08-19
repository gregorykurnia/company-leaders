export type Country = "ID" | "US";

export interface Company {
  id: string;
  name: string;
  ceoName: string;
  ceoPhotoUrl: string;
  presidentCommissionerName: string;
  presidentCommissionerPhotoUrl: string;
  country: Country;
  sortOrder: number;
  createdAt: number;
}

export type CompanyInput = Omit<Company, "id" | "createdAt">;
