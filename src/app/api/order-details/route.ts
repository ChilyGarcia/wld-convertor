import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://ecuwld.com/api/v1';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const uuid = request.nextUrl.searchParams.get('uuid');

    if (!uuid) {
      return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
    }

    console.log('UUID:', uuid);

    const apiUrl = `${BACKEND_URL}/${uuid}`;
    console.log('API URL:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    return NextResponse.json({
      response: jsonResponse,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
