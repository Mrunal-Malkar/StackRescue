import { ProfileData } from "@/type/types";

async function fetchData(): Promise<ProfileData | 404> {
  const res = await fetch("/api/get/profiledata", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }
  const data = await res.json();

  if (data.status == 404) {
    return 404;
  } else if (data.status == 200) {
    return data.data as ProfileData;
  }

  throw new Error("Unexpected response from server");
}
export default fetchData;