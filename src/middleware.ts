import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const path = new URL(request.url).pathname;

  const unprotectedPaths = ['/login', '/signup'];

  const user = await getUser(request, response);
  const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up));

  if (user && isUnprotectedPath) {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!user && !isUnprotectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

async function getUser(request: NextRequest, response: NextResponse) {
  const supabaseClient = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set({ name, value, ...options }));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set({ name, value, ...options }));
      },
    },
  });

  const user = (await supabaseClient.auth.getUser()).data.user;

  return user;
}
