import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://ecuwld.com/api/v1';

export async function GET() {
  try {
    const response = await fetch(BACKEND_URL 
      
       + '/configurations').then((res) =>
      res.json(),
    );

    return NextResponse.json({
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
