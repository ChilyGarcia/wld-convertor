import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get('uuid');

    console.log('UUID:', uuid);

    const apiUrl = 'https://ecuwld.com/api/v1/' + uuid;
    console.log('API URL:', apiUrl);

    const response = await fetch(apiUrl);

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.text();
    console.log('Response body:', responseBody);

    const jsonResponse = responseBody ? JSON.parse(responseBody) : {};

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
