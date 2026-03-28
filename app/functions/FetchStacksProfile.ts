import { BaseStack, GeneralStackType, InViewType } from "@/type/types";

async function fetchStacks(view: InViewType): Promise<GeneralStackType[]> {
  const res = await fetch("/api/get/userstacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentView: view }),
  });

  const jsonData = await res.json();

  if (!res.ok ) {
    throw new Error(jsonData.message || "Failed to fetch stacks");
  }
  return jsonData.data as GeneralStackType[];
}
export default fetchStacks