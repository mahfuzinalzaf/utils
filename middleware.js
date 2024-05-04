import { NextResponse } from "next/server";

export function middleware(request) {
    const adminToken = request.cookies.get(process.env.NEXT_PUBLIC_ADMIN_SECRET)?.value;

    if (!adminToken) {
        return NextResponse.redirect(
            new URL('/', request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};