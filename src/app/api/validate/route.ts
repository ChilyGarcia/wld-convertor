// app/api/configuration/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json(); 

    const res = await fetch(process.env.BACKEND_URL + '/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), 
    });

    if (!res.ok) {
      throw new Error(`Error en la API externa: ${res.statusText}`);
    }

    const data = await res.json();

    return NextResponse.json({
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
