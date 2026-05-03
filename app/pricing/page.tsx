export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["50 patients", "Basic booking"],
    },
    {
      name: "Pro",
      price: "$29/mo",
      features: ["Unlimited patients", "Analytics", "Priority support"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Multi clinic", "Advanced reports"],
    },
  ];

  return (
    <div style={{ padding: 40 }}>
      <h1>Pricing</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
          marginTop: 30,
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <h2>{plan.name}</h2>
            <h3>{plan.price}</h3>

            {plan.features.map((f) => (
              <p key={f}>{f}</p>
            ))}

            <button style={{ marginTop: 15 }}>
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}