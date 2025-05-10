import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import connectToDatabase from "@/lib/db/mongoose";
import Contact from "@/lib/models/Contact";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, subject, message, inquiryType, subscribe } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Store the contact form submission in the database
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      inquiryType,
      subscribe,
    });
    
    await newContact.save();
    console.log(`Contact form submission saved to database (ID: ${newContact._id})`);

    // Try to send email if API key exists
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        // Compose email content
        const emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <p><strong>Message:</strong></p>
  <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
  <p><strong>Subscribe to newsletter:</strong> ${subscribe ? "Yes" : "No"}</p>
</div>`;

        // Send email using Resend
        const { data, error } = await resend.emails.send({
          from: `AdLib Photography Club <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`,
          to: process.env.EMAIL_RECIPIENT || "info@adlibphoto.club",
          subject: `Contact Form: ${subject}`,
          html: emailHtml,
          replyTo: email,
        });

        if (error) {
          throw error;
        }

        console.log("Contact form email sent successfully", data);
        emailSent = true;
      } catch (emailError) {
        console.error("Error sending contact form email:", emailError);
        // We don't return an error to the client here since the message was saved to the database
      }
    } else {
      console.log("Email sending skipped: No Resend API Key found");
    }

    return NextResponse.json(
      { 
        message: "Your message has been received successfully", 
        id: newContact._id,
        emailSent: emailSent
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your message" },
      { status: 500 }
    );
  }
}