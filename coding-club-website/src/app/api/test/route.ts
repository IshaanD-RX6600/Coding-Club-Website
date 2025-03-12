import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json(
      { 
        status: 'error', 
        message: err?.message || 'An unexpected error occurred',
        details: err?.details || null
      },
      { status: 500 }
    );
  }
} 