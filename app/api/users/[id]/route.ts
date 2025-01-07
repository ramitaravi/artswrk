import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  try {
    console.log('Attempting to fetch user with ID:', id);
    const result = await query(
      'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
      [id]
    );

    if (!result.rows.length) {
      console.log('No user found with ID:', id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Successfully fetched user:', result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: `Database error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` },
      { status: 500 }
    );
  }
} 