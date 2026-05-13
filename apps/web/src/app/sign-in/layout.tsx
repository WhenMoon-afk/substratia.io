import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

// Force dynamic rendering - auth pages can't be statically generated
export const dynamic = "force-dynamic";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
