import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Query the database for the user
    const result = await query(
      'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
      [params.id]
    );

    if (result.rows.length === 0) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 