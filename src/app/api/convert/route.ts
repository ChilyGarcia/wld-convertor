import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount') || '1';
    const inverted = searchParams.get('inverted') || '0';

    const response = await fetch(
      `https://wld.lol/api/v1/convert?amount=${encodeURIComponent(amount)}&inverted=${encodeURIComponent(inverted)}&referrals_reference=&payment_method=0`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.text();
    const jsonResponse = responseBody ? JSON.parse(responseBody) : {};

    return NextResponse.json({
      response: jsonResponse,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
