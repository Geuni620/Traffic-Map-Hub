import { handleErrorResponse } from 'app/api/_utils/errorHandler';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from 'utils/supabase/server';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const url = new URL(request.url);
  const categories = url.searchParams.getAll('category');
  console.log('categories', categories);

  try {
    const { data, error } = await supabase
      .from('traffic_hub')
      .select('*')
      .or(categories.map((category) => `source.eq.${category}`).join(','));

    if (error) {
      throw new Error(error.message);
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
