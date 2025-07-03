"use server";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose"; // your MongoDB connection
import { User } from "@/models/Users";     // your Mongoose User model
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Here you would typically create a session or JWT token
    // For simplicity, we will just return a success message
    return NextResponse.json({ message: "Sign in successful" }, { status: 200 });

  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
