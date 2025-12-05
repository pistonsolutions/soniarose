
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, message } = body;

        // Here you would implement your logic to send the email or save to DB
        // For example, using Resend, Nodemailer, or saving to a database
        console.log('Contact Form Submitted:', { firstName, lastName, email, phone, message });

        // Simulate success
        return NextResponse.json({ success: true, message: 'Message envoyé avec succès!' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return NextResponse.json(
            { success: false, message: 'Une erreur est survenue. Veuillez réessayer.' },
            { status: 500 }
        );
    }
}
