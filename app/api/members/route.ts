import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { tanggal: "desc" },
    });
    return NextResponse.json(members);
  } catch (err) {
    console.error("Failed to fetch members:", err);
    return NextResponse.json(
      { error: "Failed to fetch members", details: err },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, noTelp, email } = await request.json();
    const newMember = await prisma.member.create({
      data: { name, noTelp, email },
    });
    return NextResponse.json(newMember, { status: 201 });
  } catch (err) {
    console.error("Failed to create member:", err);
    return NextResponse.json(
      { error: "Failed to create member", details: err },
      { status: 500 }
    );
  }
}
