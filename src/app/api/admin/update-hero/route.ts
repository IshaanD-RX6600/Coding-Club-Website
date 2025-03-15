import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This route should only be accessible from the admin dashboard
export async function POST(request: Request) {
  try {
    // Verify admin status (you should implement better auth security here)
    const payload = await request.json();
    const { id, ...updateData } = payload;
    
    console.log('Received update request for hero content:', id);
    console.log('Environment variables present:',
      'NEXT_PUBLIC_SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      'SUPABASE_SERVICE_ROLE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    console.log('Update data:', JSON.stringify(updateData, null, 2));
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Create a direct Supabase client with admin privileges that can bypass RLS
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log('Supabase admin client created');

    // Perform the update with admin privileges
    console.log('Attempting update with admin privileges');
    const { data, error } = await supabaseAdmin
      .from('hero_content')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating hero content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Update successful, data returned:', data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in update-hero API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 