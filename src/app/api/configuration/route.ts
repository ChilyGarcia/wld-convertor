import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      process.env.BACKEND_URL + '/configurations',
    ).then((res) => res.json());

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
