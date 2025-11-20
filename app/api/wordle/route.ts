import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://wordle-optimizer-nc0g.onrender.com';

// POST /api/wordle/sessions - Create a new session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sessionId, guess, pattern, n } = body;
    
    console.log('POST /api/wordle - Action:', action, 'SessionId:', sessionId);

    // Create new session
    if (action === 'create') {
      console.log('Creating session with Wordle Optimizer API...');
      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Wordle Optimizer API error (create session):', response.status, errorText);
        return NextResponse.json(
          { error: 'Failed to create session', details: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log('Session created successfully:', data);
      return NextResponse.json(data);
    }

    // Get suggestions
    if (action === 'suggestions' && sessionId) {
      const nParam = n || 5;
      console.log('Getting suggestions for session:', sessionId, 'n:', nParam);
      const response = await fetch(
        `${API_BASE_URL}/sessions/${sessionId}/suggestions?n=${nParam}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Wordle Optimizer API error (suggestions):', response.status, errorText);
        return NextResponse.json(
          { error: 'Failed to get suggestions', details: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log('Suggestions received:', data);
      return NextResponse.json(data);
    }

    // Make a guess
    if (action === 'guess' && sessionId && guess) {
      // The API expects pattern feedback - if pattern is not provided, we can't make a guess
      if (!pattern) {
        console.error('Pattern is required for guess');
        return NextResponse.json(
          { error: 'Pattern is required for guess' },
          { status: 400 }
        );
      }

      const requestBody = { guess: guess.toLowerCase(), pattern };
      console.log('Making guess:', requestBody);

      const response = await fetch(
        `${API_BASE_URL}/sessions/${sessionId}/guess`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Wordle Optimizer API error (guess):', response.status, errorText);
        return NextResponse.json(
          { error: 'Failed to make guess', details: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log('Guess successful:', data);
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: 'Invalid action or missing parameters', details: `Action: ${action}, sessionId: ${sessionId}, guess: ${guess}` },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in Wordle API POST:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}

// GET /api/wordle - Get Wordle answer or session state
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');
    const date = searchParams.get('date');

    // If sessionId is provided, get session state from Wordle Optimizer API
    if (sessionId) {
      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Wordle Optimizer API error (get session):', response.status, errorText);
        return NextResponse.json(
          { error: 'Failed to fetch session state', details: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Otherwise, fetch Wordle answer from NYT API
    const dateStr = date || new Date().toISOString().split('T')[0];
    const apiUrl = `https://www.nytimes.com/svc/wordle/v2/${dateStr}.json`;
    
    console.log('Fetching Wordle answer from NYT API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('NYT API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to fetch Wordle answer', details: errorText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log('Successfully fetched Wordle answer');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage, stack: errorStack },
      { status: 500 }
    );
  }
}

