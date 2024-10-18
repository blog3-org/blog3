import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";

export async function POST(request) {
  const body = await request.json();
  // console.log("sign params:", body)

  const token = await new SignJWT({
    address: body.address,
    signature: body.signature,
    role: "admin", // Set your own roles
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("600s") // Set your own expiration time
    .sign(getJwtSecretKey());

  // console.log("token:", token)

  const response = NextResponse.json(
    { success: true , token: token},
    { status: 200, headers: { "content-type": "application/json" } }
  );

  response.cookies.set({
    name: "token",
    value: token,
    path: "/",
  });

  // console.log("response:", response)

  return response;

  // return NextResponse.json({ success: false });
}
