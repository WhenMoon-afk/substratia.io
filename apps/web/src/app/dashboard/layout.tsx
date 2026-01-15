import DashboardProviders from "./DashboardProviders";

// Force dynamic rendering - auth pages can't be statically generated
export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardProviders>{children}</DashboardProviders>;
}
