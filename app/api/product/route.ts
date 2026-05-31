import dbConnect from "@/lib/mongodb";
import makanan from "@/models/makanan";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  const data = await makanan.find();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
      await dbConnect();
  
      const { image, name, description, cash, point, stock, type} = await req.json();
      if (stock < 0) {
        return NextResponse.json(
          { success: false, message: "Stock tidak bisa negatif (How)" },
          { status: 400 }
        );
        }
      const newMakanan = new makanan({ image, name, description, cash, point, stock, type});
      await newMakanan.save();
      return NextResponse.json({
        success: true,
        data: newMakanan
      });
  } catch (error) {
      console.error("Error creating item:", error);
      return NextResponse.json({ success: false, message: "Failed to create item" }, { status: 500 });
  }
}
