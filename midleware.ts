import { NextResponse } from 'next/server';

export function middleware(request: Request) {
    const response = NextResponse.next();

    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins (you can restrict this to specific domains if needed)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true'); // If you need credentials like cookies

    // Handle OPTIONS pre-flight requests (to enable CORS)
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: response.headers,
        });
    }

    return response;
}

export const config = {
    matcher: ['/server/:path*'], // You can apply this middleware to specific routes like API routes or globally
};
