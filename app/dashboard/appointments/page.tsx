import { createClient } from "@/lib/supabase/server";

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const { data: patients } = await supabase
    .from("patients")
    .select("id,name");

  const { data: appointments } = await supabase
    .from("appointments")
    .select("id, starts_at, status, patients(name)")
    .order("starts_at", { ascending: true });

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 32 }}>Appointments</h1>

      <form action="/api/appointments" method="POST" style={{ marginTop: 20 }}>
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

        <button style={{ marginLeft: 10 }}>
          Book
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <div style={{ display: "grid", gap: 15 }}>
        {appointments?.map((a: any) => (
          <div
            key={a.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 15,
              background:
                a.status === "confirmed"
                  ? "#dcfce7"
                  : a.status === "cancelled"
                  ? "#fee2e2"
                  : "#f3f4f6",
            }}
          >
            <strong>{a.patients?.name}</strong>
            <br />
            {new Date(a.starts_at).toLocaleString()}
            <br />
            <b>{a.status}</b>

            <div style={{ marginTop: 10 }}>
              <form
                action="/api/appointments"
                method="POST"
              ></form>

              <button
                onClick={async () => {
                  await fetch("/api/appointments", {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: a.id,
                      status: "confirmed",
                    }),
                  });

                  location.reload();
                }}
              >
                Confirm
              </button>

              <button
                style={{ marginLeft: 10 }}
                onClick={async () => {
                  await fetch("/api/appointments", {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: a.id,
                      status: "cancelled",
                    }),
                  });

                  location.reload();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}