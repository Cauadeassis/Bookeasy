import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import database from "../../../infra/database";
interface DatabaseError extends Error {
  code: string;
}

const isDatabaseError = (error: unknown): error is DatabaseError =>
  error instanceof Error && "code" in error;

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Campos faltando" }, { status: 400 });
  }
  const hashedPassword = await hash(password, 10);
  const formattedEmail = email.toLowerCase();

  try {
    await database.query({
      text: "INSERT INTO users (email, password) VALUES ($1, $2)",
      values: [formattedEmail, hashedPassword],
    });
  } catch (error: unknown) {
    if (isDatabaseError(error) && error.code === "23505") {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }

  return NextResponse.json({ message: "Conta criada!" }, { status: 201 });
}
