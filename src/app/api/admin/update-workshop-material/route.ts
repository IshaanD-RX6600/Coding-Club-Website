import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// API route for creating a new workshop material
export async function PUT(request: Request) {
  try {
    const newMaterial = await request.json();
    
    console.log('Received request to create new workshop material');
    console.log('New material data:', JSON.stringify(newMaterial, null, 2));

    if (newMaterial.order) delete newMaterial.order; // The field is supposed to be order_position not order

    if (!newMaterial.workshop_id) {
      return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 });
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

    // Add timestamps
    const materialWithTimestamps = {
      ...newMaterial,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert the new material
    const { data, error } = await supabaseAdmin
      .from('workshop_materials')
      .insert(materialWithTimestamps)
      .select()
      .single();

    if (error) {
      console.error('Error creating workshop material:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in create workshop material route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for deleting a workshop material
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    console.log('Received request to delete workshop material:', id);
    
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

    // Delete the material
    const { error } = await supabaseAdmin
      .from('workshop_materials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting workshop material:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete workshop material route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 