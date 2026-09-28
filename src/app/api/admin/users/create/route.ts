import { NextRequest, NextResponse } from "next/server";
import { db, logAction, getAdminActor } from "@/lib/audit";
import { isAdmin, hashPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, phone, email, password } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const defaultPassword = password || "arcwave123";
    const passwordHash = hashPassword(defaultPassword);

    // Check if user already exists
    const existing = await db.user.findFirst({
      where: {
        OR: [
          { phone },
          ...(email ? [{ email }] : [])
        ]
      }
    });

    if (existing) {
      return NextResponse.json({ error: "User with this phone or email already exists." }, { status: 400 });
    }

    const user = await db.user.create({
      data: {
        name,
        phone,
        email: email || `${phone}@placeholder.arcwave.in`, // Ensure unique email constraint is satisfied if missing
        passwordHash,
        consentAccepted: true, // Created by admin
      }
    });

    const actor = await getAdminActor();
    await logAction(
      actor.id,
      actor.name,
      "user.create_manual",
      `created user=${user.name} phone=${user.phone}`
    );

    return NextResponse.json({ ok: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 });
  }
}
