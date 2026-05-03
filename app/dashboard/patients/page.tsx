import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PatientsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: patients } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Patients</h1>

      <form action="/api/patients" method="post" className="mb-8 space-y-3">
        <input
          name="name"
          placeholder="Patient name"
          className="border p-3 w-full"
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          className="border p-3 w-full"
        />

        <button type="submit" className="bg-black text-white px-5 py-3 rounded">
          Add Patient
        </button>
      </form>

      <div className="space-y-3">
        {patients?.map((patient: any) => (
          <div
            key={patient.id}
            className="border p-4 rounded bg-white"
          >
            <p className="font-semibold">{patient.name}</p>
            <p className="text-sm text-gray-500">{patient.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}