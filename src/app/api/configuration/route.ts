// app/api/configuration/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://wld.lol/api/v1/configurations').then(
      (res) => res.json()
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
