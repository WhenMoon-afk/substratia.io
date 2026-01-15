import { ReactNode } from "react";

// Force dynamic rendering - auth pages can't be statically generated
export const dynamic = 'force-dynamic';

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
