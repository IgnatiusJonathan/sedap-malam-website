import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await prisma.product.findMany({
    where: {
      stok: {
        gt: 0
      }
    }
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.stok <= 0) {
    return new Response("Stok harus lebih dari 0", { status: 400 });
  }
  const newItem = await prisma.product.create({
    data: body,
  });
  return NextResponse.json(newItem);
}
