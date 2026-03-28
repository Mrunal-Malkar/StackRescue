import { ProfileData } from "@/type/types";

export async function fetchData(): Promise<ProfileData | 404> {
  const res = await fetch("/api/get/profiledata", {
    credentials: "include",
  });

  if (res.status === 404) {
    return 404;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }

  const data = await res.json();

  return data.data as ProfileData;
}