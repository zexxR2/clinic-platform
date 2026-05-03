import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const patient_id = formData.get("patient_id") as string;
  const starts_at = formData.get("starts_at") as string;

  const { data: profile } = await supabase
    .from("profiles")
    .select("clinic_id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "No profile" }, { status: 400 });
  }

  const clinic_id = profile.clinic_id;

  // conflict check
  const { data: existing } = await supabase
    .from("appointments")
    .select("id")
    .eq("clinic_id", clinic_id)
    .eq("starts_at", starts_at)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "This slot already booked" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("appointments").insert({
    clinic_id,
    patient_id,
    starts_at,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const body = await request.json();

  const { id, status } = body;

  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}