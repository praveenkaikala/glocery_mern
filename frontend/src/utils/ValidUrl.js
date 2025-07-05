export const validUrl=(name)=>{
    if (typeof name !== "string") return "";
  return name.replace(/\s+/g, "");
}