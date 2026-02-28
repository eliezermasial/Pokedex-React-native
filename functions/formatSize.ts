export default function formatSize(size?: number): string {
  if (!size) return " ";
  return (size / 10).toString().replace(".", ",") + " m";
}
