import { ProfileData } from "@/type/types";

async function fetchData(): Promise<ProfileData | 404> {
  const res = await fetch("/api/get/profiledata", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }
  console.log("the raw data", res);
  const data = await res.json();
  console.log("this is the data i got", data);

  if (data.status == 404) {
    console.log("i got the 404 status here, le'me chack");
    console.log(data);
    return 404;
  } else if (data.status == 200) {
    return data.data as ProfileData;
  }

  throw new Error("Unexpected response from server");
}
export default fetchData;