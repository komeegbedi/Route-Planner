import { NextResponse } from 'next/server';

export async function GET() {
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
  
  if (!mapboxToken) {
    return NextResponse.json({ error: 'Mapbox token is not available' }, { status: 500 });
  }

  // Return the token as JSON
  return NextResponse.json({ token: mapboxToken });
}