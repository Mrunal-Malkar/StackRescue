export function replaceLast(str:string, find:string, replace:string):string {
  const index = str.lastIndexOf(find);
  if (index === -1) return str; // Substring not found

  return str.slice(0, index) + replace + str.slice(index + find.length);
}