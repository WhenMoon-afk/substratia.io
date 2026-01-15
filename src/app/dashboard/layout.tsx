import { ReactNode } from "react";
import DashboardProviders from "./DashboardProviders";

// Force dynamic rendering - auth pages can't be statically generated
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardProviders>{children}</DashboardProviders>;
}
