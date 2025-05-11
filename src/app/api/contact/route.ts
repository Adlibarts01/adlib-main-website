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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"></div>
  </head>
  <body
    style='background-color:rgb(245,245,245);font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-top:40px;padding-bottom:40px'>
    <!--$-->
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="background-color:rgb(255,255,255);margin-left:auto;margin-right:auto;padding:40px;max-width:600px;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 2px 0 rgb(0,0,0,0.05)">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td>
                    <div
                      style="height:4px;width:80px;background-color:rgb(76,175,80);margin-bottom:60px"></div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-bottom:60px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:14px;text-transform:uppercase;letter-spacing:2px;color:rgb(139,195,74);margin-bottom:16px;line-height:24px;margin-top:16px">
                      New Contact Form Submission
                    </p>
                    <h1
                      style="font-size:32px;font-weight:700;color:rgb(51,51,51);letter-spacing:-0.025em;margin:0px">
                      ${subject}
                    </h1>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-bottom:60px">
              <tbody>
                <tr>
                  <td>
                    <div
                      style="height:1px;width:100%;background-color:rgb(238,238,238);margin-bottom:40px"></div>
                    <p
                      style="font-size:14px;text-transform:uppercase;letter-spacing:2px;color:rgb(139,195,74);margin-bottom:24px;line-height:24px;margin-top:16px">
                      Contact Information
                    </p>
                    <div
                      style="padding-left:24px;border-left-width:2px;border-color:rgb(76,175,80)">
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                        <span style="color:rgb(76,175,80);font-weight:500">Name:</span>
                        <!-- -->${name}
                      </p>
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                        <span style="color:rgb(76,175,80);font-weight:500">Email:</span>
                        <!-- -->${email}
                      </p>
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                        <span style="color:rgb(76,175,80);font-weight:500">Inquiry Type:</span>
                        <!-- -->${inquiryType}
                      </p>
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                        <span style="color:rgb(76,175,80);font-weight:500">Subscribe to newsletter:</span>
                        <!-- -->${subscribe ? "Yes" : "No"}
                      </p>
                    </div>
                    <div
                      style="height:1px;width:100%;background-color:rgb(238,238,238);margin-top:40px"></div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-bottom:60px">
              <tbody>
                <tr>
                  <td>
                    <div
                      style="background-color:rgb(249,249,249);padding:32px;border-left-width:4px;border-color:rgb(76,175,80)">
                      <p
                        style="font-size:18px;font-weight:700;color:rgb(51,51,51);margin-bottom:16px;line-height:24px;margin-top:16px">
                        Message
                      </p>
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                        ${message.replace(/\n/g, '<br>')}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td>
                    <div
                      style="height:1px;width:100%;background-color:rgb(238,238,238);margin-bottom:32px"></div>
                    <p
                      style="font-size:14px;color:rgb(136,136,136);margin:0px;margin-bottom:0px;line-height:24px;margin-top:0px;margin-left:0px;margin-right:0px">
                      © ${new Date().getFullYear()} AdLib Photography Club
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`;

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