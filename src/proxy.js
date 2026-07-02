import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './lib/auth'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    // ==== to redirect user to the page they wanted to access after login ====
    // const { pathname } = request.nextUrl;
    // ==== to redirect user to the page they wanted to access after login ====
    
    if(!session) {
        router.push('/login');

        // *** to redirect user to the Home page ***
         return NextResponse.redirect(new URL('/login', request.url));

        // ==== to redirect user to the page they wanted to access after login ====
    //      return NextResponse.redirect(
    //   new URL(`/login?redirect=${pathname}`, request.url)
    // );
    }
    // return NextResponse.next();
    // ==== to redirect user to the page they wanted to access after login ====
}
 
export const config = {
  matcher: ['/dashboard', '/donation-requests/:path'],
}