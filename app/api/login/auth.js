import dbConnect from "@/lib/mongodb";
import membership from "@/models/membership";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  const { email, password } = await request.json();

  const user = await membership.findOne({ email });

  if (!user || user.password !== password) {
    return NextResponse.json(
      { success: false, message: "Wrong username or password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Login successful",
  });
}