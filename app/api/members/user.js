import dbConnect from "../../../lib/mongodb";
import membership from "../../../models/membership";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await dbConnect();

        const { email, password, noTelp } = await request.json();
        const newMember = new membership({ email, password, noTelp, poin: "0" });
        await newMember.save();
        return NextResponse.json({ success: true, message: "Member created successfully" });
    } catch (error) {
        console.error("Error creating member:", error);
        return NextResponse.json({ success: false, message: "Failed to create member" }, { status: 500 });
    }
}