export default function formatWeight(weight?: number): string {
  if (!weight) return " ";
  return (weight / 10).toString().replace(".", ",") + " kg";
}
