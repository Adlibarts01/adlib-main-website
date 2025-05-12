import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongoose';
import Registration from '@/lib/models/Registration';
import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'usn', 'branch', 'year', 'phone', 'email', 'eventId'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate USN format (example: 1MS22CS001)
    const usnRegex = /^[1-9][A-Z]{2}\d{2}[A-Z]{2}\d{3}$/;
    if (!usnRegex.test(data.usn.toUpperCase())) {
      return NextResponse.json(
        { message: 'Invalid USN format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already registered for this event
    const existingRegistration = await Registration.findOne({
      eventId: data.eventId,
      usn: data.usn.toUpperCase()
    });

    if (existingRegistration) {
      return NextResponse.json(
        { message: 'You have already registered for this event' },
        { status: 409 }
      );
    }

    // Create new registration
    const registration = new Registration({
      eventId: data.eventId,
      name: data.name,
      usn: data.usn.toUpperCase(),
      branch: data.branch,
      year: data.year,
      phone: data.phone,
      email: data.email,
      registrationDate: new Date()
    });

    await registration.save();

    // Send confirmation email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'ADLib Photography Club <noreply@adlib.club>',
        to: data.email,
        subject: `Registration Confirmed: ${data.eventTitle}`,
        html: `
          <h1>Registration Confirmed!</h1>
          <p>Hello ${data.name},</p>
          <p>Your registration for ${data.eventTitle} has been received.</p>
          <p><strong>Registration Details:</strong></p>
          <ul>
            <li>Name: ${data.name}</li>
            <li>USN: ${data.usn}</li>
            <li>Branch: ${data.branch}</li>
            <li>Year: ${data.year}</li>
          </ul>
        `
      });
    }

    return NextResponse.json(
      { 
        message: 'Registration successful',
        registrationId: registration._id,
        success: true
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration processing error:', error);
    return NextResponse.json(
      { message: 'Failed to process registration' },
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