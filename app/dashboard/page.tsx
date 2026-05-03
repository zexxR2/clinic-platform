import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: patients } = await supabase
    .from("patients")
    .select("*", { count: "exact", head: true });

  const { count: appointments } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true });

  const { count: confirmed } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("status", "confirmed");

  const { count: cancelled } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("status", "cancelled");

  const today = new Date().toISOString().slice(0, 10);

  const { count: todayCount } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .gte("starts_at", today);

  const Card = ({
    title,
    value,
    color,
  }: {
    title: string;
    value: number | null;
    color: string;
  }) => (
    <div
      style={{
        background: color,
        padding: 20,
        borderRadius: 14,
        color: "white",
      }}
    >
      <div>{title}</div>
      <h1>{value || 0}</h1>
    </div>
  );

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 32 }}>Clinic Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 15,
          marginTop: 25,
        }}
      >
        <Card title="Patients" value={patients} color="#2563eb" />
        <Card title="Appointments" value={appointments} color="#7c3aed" />
        <Card title="Confirmed" value={confirmed} color="#16a34a" />
        <Card title="Cancelled" value={cancelled} color="#dc2626" />
        <Card title="Today" value={todayCount} color="#ea580c" />
      </div>
    </div>
  );
}