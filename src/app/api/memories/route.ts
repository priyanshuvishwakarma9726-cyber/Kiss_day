import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM memories ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching memories:', error);
        return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { image_url, caption } = await request.json();

        if (!image_url || !caption) {
            return NextResponse.json({ error: 'Image and caption are required' }, { status: 400 });
        }

        const [result] = await db.execute(
            'INSERT INTO memories (image_url, caption) VALUES (?, ?)',
            [image_url, caption]
        );

        const insertId = (result as any).insertId;
        const newMemory = { id: insertId, image_url, caption, created_at: new Date() };

        return NextResponse.json(newMemory, { status: 201 });
    } catch (error) {
        console.error('Error adding memory:', error);
        return NextResponse.json({ error: 'Failed to add memory' }, { status: 500 });
    }
}
