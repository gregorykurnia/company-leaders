export type Country = "ID" | "US";

export interface Company {
  id: string;
  name: string;
  industry: string;
  rank: number;
  ceoName: string;
  ceoPhotoUrl: string;
  presidentCommissionerName: string;
  presidentCommissionerPhotoUrl: string;
  country: Country;
  createdAt: number;
}

export type CompanyInput = Omit<Company, "id" | "createdAt">;
