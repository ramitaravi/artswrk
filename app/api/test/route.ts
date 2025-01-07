import { NextResponse } from 'next/server';
import { query } from '../../lib/db';

export async function GET() {
  try {
    // Test database connection
    const testConnection = await query('SELECT NOW()');
    console.log('Database connection test:', testConnection.rows[0]);

    // Check if users table exists
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    const tableExists = tableCheck.rows[0].exists;

    // Count users if table exists
    let userCount = 0;
    if (tableExists) {
      const countResult = await query('SELECT COUNT(*) FROM users');
      userCount = parseInt(countResult.rows[0].count);
    }

    // Get sample users if they exist
    let sampleUsers = [];
    if (userCount > 0) {
      const usersResult = await query('SELECT * FROM users LIMIT 3');
      sampleUsers = usersResult.rows;
    }

    return NextResponse.json({
      status: 'success',
      details: {
        databaseConnected: true,
        usersTableExists: tableExists,
        userCount,
        sampleUsers
      }
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({ 
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 