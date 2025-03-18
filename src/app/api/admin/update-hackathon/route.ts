import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { Hackathon } from '@/types/content';

// Create a direct Supabase client with admin privileges
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

export async function POST(request: Request) {
  try {
    const { id, ...updateData } = await request.json();
    
    console.log('Received request to update hackathon:', id);
    console.log('Update data:', JSON.stringify(updateData, null, 2));
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Add updated_at timestamp
    const dataWithTimestamp = {
      ...updateData,
      updated_at: new Date().toISOString()
    };

    // Update the hackathon
    const { data, error } = await supabaseAdmin
      .from('hackathons')
      .update(dataWithTimestamp)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating hackathon:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in update hackathon route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const hackathon = await request.json();
    
    console.log('Received request to create hackathon:', hackathon);
    
    // Add timestamps
    const dataWithTimestamps = {
      ...hackathon,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Create the hackathon
    const { data, error } = await supabaseAdmin
      .from('hackathons')
      .insert(dataWithTimestamps)
      .select()
      .single();

    if (error) {
      console.error('Error creating hackathon:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in create hackathon route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    console.log('Received request to delete hackathon:', id);
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Delete the hackathon
    const { error } = await supabaseAdmin
      .from('hackathons')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting hackathon:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete hackathon route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}