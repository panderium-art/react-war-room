import { NextRequest, NextResponse } from 'next/server';

// GET handler
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  // Simulate fetching data
  const data = {
    success: true,
    message: 'GET request successful',
    timestamp: new Date().toISOString(),
    id: id || null,
    data: id ? {
      id,
      title: `Item ${id}`,
      description: `This data was fetched from the route.ts API handler`,
      status: 'active',
    } : null,
  };

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Simulate processing the data
    const response = {
      success: true,
      message: 'POST request successful',
      timestamp: new Date().toISOString(),
      received: body,
      processed: {
        ...body,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid JSON body',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}

// PUT handler
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    const response = {
      success: true,
      message: 'PUT request successful',
      timestamp: new Date().toISOString(),
      id,
      updated: body,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}

// DELETE handler
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  const response = {
    success: true,
    message: 'DELETE request successful',
    timestamp: new Date().toISOString(),
    deleted: { id },
  };

  return NextResponse.json(response, { status: 200 });
}
