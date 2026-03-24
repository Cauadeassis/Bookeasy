import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Olá, mundo!" }, { status: 200 });
}
export async function POST(request: NextRequest) {
  const email = await request.json();
  return NextResponse.json({ email }, { status: 201 });
}
