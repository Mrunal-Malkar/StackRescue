import { BaseStack, InViewType } from "@/type/types";

async function fetchStacks(view: InViewType): Promise<BaseStack[]> {
  console.log("this is the view before sending",view)
  const res = await fetch("/api/get/userstacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentView: view }),
  });

  const jsonData = await res.json();
  console.log("this is the stack data",jsonData);

  if (!res.ok ) {
    throw new Error(jsonData.message || "Failed to fetch stacks");
  }
console.log("Threre you go champ",jsonData.data);
  return jsonData.data as BaseStack[];
}
export default fetchStacks