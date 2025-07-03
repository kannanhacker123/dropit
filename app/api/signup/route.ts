"use server";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { User } from "@/models/Users"; // ✅ notice the named export

export async function POST(req: Request) {
  await dbConnect();

  const { fullname, email, password, gender, dob, recoveryChar } = await req.json();

  if (!fullname || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Create the user (password hash will happen automatically)
    const newUser = await User.create({
      fullname,
      email,
      password,
      gender,
      dob,
      recoveryChar,
    });

    return NextResponse.json({ success: true, userId: newUser._id });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
