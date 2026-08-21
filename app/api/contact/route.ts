import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { appendToSheet } from "@/lib/googleSheets";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        message: "Server configuration error.",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, phone, service, message } =
      await request.json();

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Send Email
    const { error } = await resend.emails.send({
      from: "ANATECH Website <onboarding@resend.dev>",
      to: ["anatech.operations@gmail.com"],
      replyTo: email,
      subject: `New Website Enquiry - ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>

        <hr>

        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email.",
        },
        { status: 500 }
      );
    }

    // Save to Google Sheet
    await appendToSheet({
      name,
      email,
      phone,
      service,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}