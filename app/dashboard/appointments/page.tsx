import { createClient } from "@/lib/supabase/server";

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: patients } = await supabase
    .from("patients")
    .select("id,name")
    .order("created_at", { ascending: false });

  const { data: appointments } = await supabase
    .from("appointments")
    .select("id, starts_at, status, patients(name)")
    .order("starts_at", { ascending: true });

  return (
    <div style={{ padding: 30 }}>
      <h1>Appointments</h1>

      <form action="/api/appointments" method="POST">
        <select name="patient_id" required>
          <option value="">Choose patient</option>

          {patients?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="starts_at"
          required
          style={{ marginLeft: 10 }}
        />

        <button type="submit" style={{ marginLeft: 10 }}>
          Book
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {appointments?.map((a: any) => (
        <div key={a.id} style={{ marginBottom: 15 }}>
          <strong>{a.patients?.name}</strong>
          <br />
          {a.starts_at}
          <br />
          {a.status}
        </div>
      ))}
    </div>
  );
}