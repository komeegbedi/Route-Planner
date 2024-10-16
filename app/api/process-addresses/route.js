import { ProcessData } from '../../backend/processData';

export async function POST(request) {
  try {
    const addresses = await request.json();
    // console.log('Received addresses:', addresses);
    const result = await ProcessData(addresses);
    // console.log('Processed result:', result);
    return Response.json({ result });

  } catch (error) {

    console.error('Error processing addresses:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }

}