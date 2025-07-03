import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';

export async function GET() {
  await dbConnect();

  return NextResponse.json({ message: "MongoDB Connected!" });
}
