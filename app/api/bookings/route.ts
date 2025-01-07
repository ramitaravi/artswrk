import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('Successfully connected to database');
    console.log('Attempting to fetch bookings...');
    const result = await query(`
      SELECT * 
      FROM bookings 
      ORDER BY "Creation Date" DESC
    `);
    
    if (!result || !result.rows) {
      console.error('No results returned from database');
      return NextResponse.json({ error: 'No data returned from database' }, { status: 500 });
    }
    
    console.log(`Successfully fetched ${result.rows.length} bookings`);
    return NextResponse.json({ bookings: result.rows });
  } catch (error) {
    console.error('Detailed error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { error: `Database error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` }, 
      { status: 500 }
    );
  }
} 