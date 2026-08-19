import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Company, CompanyInput, Country } from "./types";

const COLLECTION = "companies";

// Filtering by country only (no orderBy) avoids requiring a Firestore
// composite index; sort by rank client-side instead.
export function subscribeToCompanies(
  country: Country,
  callback: (companies: Company[]) => void,
  onError: (error: Error) => void,
) {
  const q = query(collection(db, COLLECTION), where("country", "==", country));
  return onSnapshot(
    q,
    (snapshot) => {
      const companies = snapshot.docs.map(
        (d) => ({ id: d.id, ...d.data() }) as Company,
      );
      companies.sort((a, b) => a.rank - b.rank);
      callback(companies);
    },
    onError,
  );
}

export async function createCompany(input: CompanyInput) {
  await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: Date.now(),
  });
}

export async function updateCompany(id: string, input: CompanyInput) {
  await updateDoc(doc(db, COLLECTION, id), { ...input });
}

export async function deleteCompany(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}
