import { NextResponse } from 'next/server';
import prisma from '../../lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const users = await prisma.users.findMany({
      where: email ? {
        email: email
      } : undefined,
      select: {
        uniqueid: true,
        email: true,
        fullname: true,
        firstname: true,
        lastname: true,
        location: true,
        userrole: true,
        profilepicture: true,
        artistservices: true,
        bio: true,
        creationdate: true
      }
    });
    
    console.log(`Successfully fetched ${users.length} users`);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: `Database error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` }, 
      { status: 500 }
    );
  }
} 