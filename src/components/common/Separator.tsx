export default function Separator({
  condition,
  icon,
}: {
  condition: boolean;
  icon: string;
}) {
  return condition ? <span>{" "}{icon}{" "}</span> : null;
}
