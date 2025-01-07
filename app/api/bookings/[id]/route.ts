import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  if (!id) {
    return new NextResponse(JSON.stringify({ error: 'Booking ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    console.log('Fetching booking with ID:', id);
    
    const result = await query(
      'SELECT * FROM bookings WHERE "unique id" = $1 LIMIT 1',
      [id]
    );

    console.log('Query result:', {
      rowCount: result.rows.length,
      firstRow: result.rows[0]
    });

    if (result.rows.length === 0) {
      console.log('No booking found with ID:', id);
      return new NextResponse(JSON.stringify({ error: 'Booking not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching booking:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return new NextResponse(JSON.stringify({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 