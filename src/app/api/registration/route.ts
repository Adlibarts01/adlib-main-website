import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongoose';
import Registration from '@/lib/models/Registration';
import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Parse the JSON body from the request
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['eventId', 'eventTitle', 'name', 'email', 'experience'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Create a new registration document
    const registration = new Registration({
      eventId: body.eventId,
      eventTitle: body.eventTitle,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      experience: body.experience,
      equipment: body.equipment || '',
      comments: body.comments || '',
    });
    
    // Save the registration to the database
    await registration.save();
    console.log(`Event registration saved to database (ID: ${registration._id})`);
    
    // Try to send confirmation email if API key exists
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const whatsappLink = process.env.WHATSAPP_GROUP_LINK || "https://chat.whatsapp.com/example";
        
        // HTML email template
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
                      Registration Confirmed
                    </p>
                    <h1
                      style="font-size:32px;font-weight:700;color:rgb(51,51,51);letter-spacing:-0.025em;margin:0px">
                      Welcome to
                      <!-- -->${body.eventTitle}
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
                    <p
                      style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                      Hello
                      <!-- -->${body.name}<!-- -->,
                    </p>
                    <p
                      style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                      Your registration has been confirmed. We're looking
                      forward to seeing you at the event.
                    </p>
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
                      Important Information
                    </p>
                    <div
                      style="padding-left:24px;border-left-width:2px;border-color:rgb(76,175,80)">
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                        Please arrive 15 minutes before the start time
                      </p>
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                        Bring your equipment as specified in the event details
                      </p>
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                        If you have any questions, please contact us at info@adlibphoto.club
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
                        Join Our WhatsApp Group
                      </p>
                      <p
                        style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:24px;margin-top:16px">
                        Please join our WhatsApp group for event updates and communication.
                      </p>
                      <a
                        href="${whatsappLink}"
                        style="background-color:rgb(76,175,80);color:rgb(255,255,255);font-weight:700;padding-top:14px;padding-bottom:14px;padding-left:32px;padding-right:32px;border-radius:0px;text-decoration-line:none;text-align:center;box-sizing:border-box;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;padding:14px 32px 14px 32px"
                        target="_blank"
                        ><span
                          ><!--[if mso]><i style="mso-font-width:400%;mso-text-raise:21" hidden>&#8202;&#8202;&#8202;&#8202;</i><![endif]--></span
                        ><span
                          style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px"
                          >Join WhatsApp Group</span
                        ><span
                          ><!--[if mso]><i style="mso-font-width:400%" hidden>&#8202;&#8202;&#8202;&#8202;&#8203;</i><![endif]--></span
                        ></a
                      >
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
              role="presentation"
              style="margin-bottom:60px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-bottom:16px;margin-top:16px">
                      We look forward to seeing you at the event!
                    </p>
                    <p
                      style="font-size:16px;color:rgb(85,85,85);line-height:26px;margin-top:24px;margin-bottom:16px">
                      Best regards,<br /><span
                        style="color:rgb(51,51,51);font-weight:500"
                        >AdLib Photography Club Team</span
                      >
                    </p>
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
</html>
`;
        
        // Send email using Resend
        const { data, error } = await resend.emails.send({
          from: `AdLib Photography Club <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`,
          to: body.email,
          subject: `Registration Confirmed: ${body.eventTitle}`,
          html: emailHtml,
        });

        if (error) {
          throw error;
        }
        
        console.log(`Registration confirmation email sent to ${body.email}`, data);
        emailSent = true;
      } catch (emailError) {
        console.error('Error sending registration confirmation email:', emailError);
        // We don't return an error since the registration was saved successfully
      }
    } else {
      console.log("Email sending skipped: No Resend API Key found");
    }
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful',
        registrationId: registration._id,
        emailSent: emailSent
      },
      { status: 201 }
    );
    
  } catch (error: unknown) {
    console.error('Registration error:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Registration failed', 
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

// GET handler to retrieve registrations (Admin only)
export async function GET() {
  try {
    // In a production environment, you would implement authentication here
    // to ensure only admins can access registration data
    
    // Connect to the database
    await connectToDatabase();
    
    // Get registrations
    const registrations = await Registration.find().sort({ registrationDate: -1 });
    
    // Return the registrations
    return NextResponse.json({ registrations });
    
  } catch (error: unknown) {
    console.error('Error fetching registrations:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch registrations', 
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}