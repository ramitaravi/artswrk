import { NextResponse } from 'next/server';
import prisma from '../../lib/db';

export async function GET() {
  try {
    // Test database connection by counting users
    const userCount = await prisma.users.count();

    // Get sample users if they exist
    let sampleUsers = [];
    if (userCount > 0) {
      sampleUsers = await prisma.users.findMany({
        take: 3,  // Limit to 3 users
        select: {  // Select specific fields you want to return
          uniqueid: true,
          email: true,
          fullname: true,
          userrole: true,
          location: true
        }
      });
    }

    // Get recent bookings
    const recentBookings = await prisma.bookings.findMany({
      take: 3,
      orderBy: {
        Creation_Date: 'desc'
      },
      select: {
        id: true,
        Artist: true,
        Client: true,
        Location: true,
        Start_date: true,
        Time_Slot: true,
        option_booking_status: true
      }
    });

    return NextResponse.json({
      status: 'success',
      details: {
        databaseConnected: true,
        userCount,
        sampleUsers,
        recentBookings
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