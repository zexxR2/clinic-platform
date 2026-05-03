import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: "#0f172a",
          color: "white",
          padding: 20,
        }}
      >
        <h2 style={{ marginBottom: 30 }}>Clinic SaaS</h2>

        <nav
          style={{
            display: "grid",
            gap: 12,
          }}
        >
          <Link href="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>

          <Link href="/dashboard/patients" style={{ color: "white" }}>
            Patients
          </Link>

          <Link href="/dashboard/appointments" style={{ color: "white" }}>
            Appointments
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main
        style={{
          background: "#f8fafc",
          padding: 30,
        }}
      >
        {children}
      </main>
    </div>
  );
}