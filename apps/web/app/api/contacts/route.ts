import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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
