import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// API route for updating a workshop
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { id, ...updateData } = payload;
    
    console.log('Received update request for workshop:', id);
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

    // Perform the update with admin privileges
    const { data, error } = await supabaseAdmin
      .from('workshops')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating workshop:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in update-workshop API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for creating a new workshop
export async function PUT(request: Request) {
  try {
    const newWorkshop = await request.json();
    
    console.log('Received request to create new workshop');
    console.log('New workshop data:', JSON.stringify(newWorkshop, null, 2));

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
    const workshopWithTimestamps = {
      ...newWorkshop,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert the new workshop
    const { data, error } = await supabaseAdmin
      .from('workshops')
      .insert(workshopWithTimestamps)
      .select()
      .single();

    if (error) {
      console.error('Error creating workshop:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in create workshop route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for deleting a workshop
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    console.log('Received request to delete workshop:', id);
    
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

    // First delete all materials for this workshop
    const { error: materialsError } = await supabaseAdmin
      .from('workshop_materials')
      .delete()
      .eq('workshop_id', id);

    if (materialsError) {
      console.error('Error deleting workshop materials:', materialsError);
      return NextResponse.json({ error: materialsError.message }, { status: 500 });
    }

    // Then delete the workshop
    const { error } = await supabaseAdmin
      .from('workshops')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting workshop:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete workshop route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 