import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

interface ApiError extends Error {
  details?: unknown;
}

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('club_content')
      .select('*')
      .limit(1);

    if (error) {
      throw error;
    }

    // Test data insertion
    const testData = {
      page: 'test',
      content: { message: 'Test successful' }
    };

    const { error: insertError } = await supabase
      .from('club_content')
      .insert([testData]);

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase connection and data insertion successful',
      data
    });
  } catch (err) {
    const error = err as ApiError | PostgrestError;
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: error?.message || 'An unexpected error occurred',
        details: 'details' in error ? error.details : null
      },
      { status: 500 }
    );
  }
} 