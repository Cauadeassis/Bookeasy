import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/src/infra/session";
import database from "@/src/infra/database";

export async function POST(request: NextRequest) {
  console.log("Método POST tentando fazer login!");
  const { email, password } = await request.json();
  if (!email || !password)
    return NextResponse.json({ error: "Campos faltando" }, { status: 400 });

  try {
    const result = await database.query({
      text: "SELECT id, email, password FROM users WHERE email = $1",
      values: [email],
    });
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 },
      );
    }

    const user = result.rows[0];
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 },
      );
    }

    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions,
    );
    session.userId = user.id;
    session.email = user.email;
    console.log(`Sessão iniciada: ${session}`);
    await session.save();
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }

  return NextResponse.json({ message: "Login realizado!" }, { status: 200 });
}
