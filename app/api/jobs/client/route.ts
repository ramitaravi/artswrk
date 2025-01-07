import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '../../../lib/db';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const jobs = await prisma.job.findMany({
      where: {
        userId: user.id,
      },
      include: {
        interestedArtists: {
          select: {
            uniqueid: true,
            fullname: true,
            profilepicture: true,
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('[JOBS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 