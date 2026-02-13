import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 });
        }

        // Demo fallback if DB is empty or for easy testing
        const cleanPassword = typeof password === 'string' ? password.trim().toLowerCase() : '';
        if (cleanPassword === 'i love you' || cleanPassword === 'priyanshu') {
            return NextResponse.json({ message: "Tu sirf meri girlfriend nahi… meri har dua ka jawab hai ❤️ (Default Message)" });
        }

        const [rows] = await db.query(
            'SELECT message FROM secret_messages WHERE password = ? LIMIT 1',
            [password]
        );

        if ((rows as any[]).length === 0) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
        }

        const messagInfo = (rows as any[])[0];
        return NextResponse.json({ message: messagInfo.message });

    } catch (error) {
        console.error('Error in secret message:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
