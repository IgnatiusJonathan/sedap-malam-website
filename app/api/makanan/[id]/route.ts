import dbConnect from "@/lib/mongodb";
import makanan from "@/models/makanan";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request, { params }: any) {
  await dbConnect();

  const product = await makanan.findById(params.id);
  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(product);
}

export async function PATCH(req: Request, { params }: any) {
  await dbConnect();

  const { stock } = await req.json();

  if (stock !== undefined && stock < 0) {
    return Response.json(
      { message: "Stock tidak boleh negatif" },
      { status: 400 }
    );
  }

  const updated = await makanan.findByIdAndUpdate(
    params.id,
    {
      $set: { stock },
    },
    { new: true }
  );

  if (!updated) {
    return Response.json(
      { message: "Makanan tidak ditemukan" },
      { status: 404 }
    );
  }

  return Response.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await dbConnect();
  await makanan.deleteOne({ id: Number(params.id) });

  return Response.json("Berhasil di delete");
}
