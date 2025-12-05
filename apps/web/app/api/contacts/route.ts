import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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

export async function GET(req: NextRequest) {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${API_URL}/contacts`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
}
