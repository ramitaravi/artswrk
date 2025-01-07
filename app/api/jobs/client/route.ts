import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';

export async function GET() {
  try {
    // Temporarily remove auth check for deployment
    const jobs = await prisma.bookings.findMany({
      where: {
        option_booking_status: 'confirmed'
      },
      orderBy: {
        Creation_Date: 'desc'
      },
      take: 10
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('[JOBS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 