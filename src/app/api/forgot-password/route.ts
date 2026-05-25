// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import crypto from "crypto";

// export async function POST(request: NextRequest) {
//   try {
//     const { email } = await request.json();

//     if (!email) {
//       return NextResponse.json(
//         { message: "Email is required" },
//         { status: 400 }
//       );
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { message: "If an account with this email exists, a reset link will be sent." },
//         { status: 200 }
//       );
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     const resetExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

//     await prisma.user.update({
//       where: { email },
//       data: {
//         resetToken: hashedToken,
//         resetTokenExpiry: resetExpiry,
//       },
//     });

//     const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
//     const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

//     console.log("🔐 Password Reset Link:", resetUrl);

//     return NextResponse.json(
//       { 
//         message: "Password reset link sent to email",
//         resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // Create reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    // TODO:
    // Save token + expiry in DB here

    // SEND EMAIL
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family:sans-serif">
          <h2>Password Reset</h2>
          <p>Click below to reset your password:</p>

          <a href="${resetLink}"
             style="
               display:inline-block;
               padding:12px 20px;
               background:black;
               color:white;
               text-decoration:none;
               border-radius:8px;
             ">
             Reset Password
          </a>

          <p>This link expires in 24 hours.</p>
        </div>
      `,
    });
    console.log("bhej diya bhai email")
    return NextResponse.json({
      success: true,
      message: "Reset email sent",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 }
    );
  }
}