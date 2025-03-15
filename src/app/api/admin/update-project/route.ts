import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// API route for updating a featured project
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { id, ...updateData } = payload;
    
    console.log('Received update request for featured project:', id);
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
      .from('featured_projects')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating featured project:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in update-project API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for creating a new featured project
export async function PUT(request: Request) {
  try {
    const newProject = await request.json();
    
    console.log('Received request to create new featured project');
    console.log('New project data:', JSON.stringify(newProject, null, 2));

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
    const projectWithTimestamps = {
      ...newProject,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert the new project
    const { data, error } = await supabaseAdmin
      .from('featured_projects')
      .insert(projectWithTimestamps)
      .select()
      .single();

    if (error) {
      console.error('Error creating featured project:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in create project route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// API route for deleting a featured project
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    console.log('Received request to delete featured project:', id);
    
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

    // Delete the project
    const { error } = await supabaseAdmin
      .from('featured_projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting featured project:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete project route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 