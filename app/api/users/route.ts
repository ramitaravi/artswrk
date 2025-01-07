import { NextResponse } from 'next/server';
import { query } from '../../lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    let sql = 'SELECT * FROM users';
    let params: any[] = [];

    if (email) {
      sql += ' WHERE email = $1';
      params.push(email);
    }

    console.log('Executing query:', { sql, params });
    const result = await query(sql, params);
    
    if (!result || !result.rows) {
      console.error('No results returned from database');
      return NextResponse.json({ error: 'No data returned from database' }, { status: 500 });
    }
    
    console.log(`Successfully fetched ${result.rows.length} users`);
    return NextResponse.json({ users: result.rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: `Database error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` }, 
      { status: 500 }
    );
  }
} 