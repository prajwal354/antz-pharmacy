import { PharmacyShell } from "@/features/pharmacy/components";

/** Every page inside /moduls/pharmacy shares this header + side menu. */
export default function PharmacyLayout({ children }: LayoutProps<"/moduls/pharmacy">) {
  return <PharmacyShell>{children}</PharmacyShell>;
}
