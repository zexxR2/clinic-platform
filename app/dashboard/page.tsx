export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-6 rounded-xl shadow">
          Appointments Today
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Patients
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Revenue
        </div>
      </div>
    </div>
  );
}