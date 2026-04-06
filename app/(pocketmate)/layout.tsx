import { PocketMateShell } from "@/components/pocketmate/PocketMateShell";

export default function PocketMateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PocketMateShell>{children}</PocketMateShell>;
}
