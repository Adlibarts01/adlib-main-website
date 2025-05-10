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
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; margin-bottom: 20px;">
    <h1 style="color: #0A1D37; margin-bottom: 5px;">Registration Confirmed!</h1>
    <p style="font-size: 18px; color: #666;">Thank you for registering for our event</p>
  </div>
  
  <div style="background-color: #f5f5f5; border-left: 4px solid #F7B32B; padding: 15px; margin-bottom: 20px;">
    <h2 style="color: #0A1D37; margin-top: 0;">${body.eventTitle}</h2>
    <p>Hello ${body.name}, your registration has been confirmed!</p>
  </div>
  
  <div style="margin-bottom: 20px;">
    <h3 style="color: #0A1D37;">Important Information:</h3>
    <ul style="padding-left: 20px;">
      <li>Please arrive 15 minutes before the start time</li>
      <li>Bring your equipment as specified in the event details</li>
      <li>If you have any questions, please contact us at info@adlibphoto.club</li>
    </ul>
  </div>
  
  <div style="background-color: #E5F6FD; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="color: #0A1D37; margin-top: 0;">Join Our WhatsApp Group</h3>
    <p>Please join our WhatsApp group for event updates and communication.</p>
    <div style="text-align: center; margin-top: 15px;">
      <a href="${whatsappLink}" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Join WhatsApp Group</a>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 14px;">
    <p>We look forward to seeing you!</p>
    <p>AdLib Photography Club Team</p>
  </div>
</div>
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
    
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Registration failed', 
        message: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

// GET handler to retrieve registrations (Admin only)
export async function GET(request: NextRequest) {
  try {
    // In a production environment, you would implement authentication here
    // to ensure only admins can access registration data
    
    // Connect to the database
    await connectToDatabase();
    
    // Get registrations
    const registrations = await Registration.find().sort({ registrationDate: -1 });
    
    // Return the registrations
    return NextResponse.json({ registrations });
    
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch registrations', 
        message: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}