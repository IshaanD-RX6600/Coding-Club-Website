import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// API route for updating a coding challenge
export async function POST(request: Request) {
  try {
    const { id, ...updateData } = await request.json();
    
    console.log('Received request to update coding challenge:', id);
    console.log('Update data:', JSON.stringify(updateData, null, 2));
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

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

    // Add updated_at timestamp
    const dataWithTimestamp = {
      ...updateData,
      updated_at: new Date().toISOString()
    };

    // Update the challenge
    const { data, error } = await supabaseAdmin
      .from('coding_challenges')
      .update(dataWithTimestamp)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating coding challenge:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in update coding challenge route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for creating a new coding challenge
export async function PUT(request: Request) {
  try {
    const newChallenge = await request.json();
    
    console.log('Received request to create new coding challenge');
    console.log('New challenge data:', JSON.stringify(newChallenge, null, 2));

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

    // Add timestamps
    const challengeWithTimestamps = {
      ...newChallenge,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert the new challenge
    const { data, error } = await supabaseAdmin
      .from('coding_challenges')
      .insert(challengeWithTimestamps)
      .select()
      .single();

    if (error) {
      console.error('Error creating coding challenge:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in create coding challenge route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for deleting a coding challenge
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    console.log('Received request to delete coding challenge:', id);
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

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

    // Delete the challenge
    const { error } = await supabaseAdmin
      .from('coding_challenges')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting coding challenge:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete coding challenge route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 