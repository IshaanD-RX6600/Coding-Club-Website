import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This route should only be accessible from the admin dashboard
export async function POST(request: Request) {
  try {
    // Verify admin status (you should implement better auth security here)
    const payload = await request.json();
    const { id, ...updateData } = payload;
    
    console.log('Received update request for executive:', id);
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

    // Perform the update with admin privileges
    const { data, error } = await supabaseAdmin
      .from('executives')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating executive:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in update-executive API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for creating a new executive
export async function PUT(request: Request) {
  try {
    const newExecutive = await request.json();
    
    console.log('Received request to create new executive');
    console.log('New executive data:', JSON.stringify(newExecutive, null, 2));

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
    const execWithTimestamps = {
      ...newExecutive,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert the new executive
    const { data, error } = await supabaseAdmin
      .from('executives')
      .insert(execWithTimestamps)
      .select()
      .single();

    if (error) {
      console.error('Error creating executive:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in create executive route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for deleting an executive
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    console.log('Received request to delete executive:', id);
    
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

    // Delete the executive
    const { error } = await supabaseAdmin
      .from('executives')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting executive:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete executive route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 