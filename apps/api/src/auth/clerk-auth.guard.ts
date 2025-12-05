import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    private readonly logger = new Logger(ClerkAuthGuard.name);

    constructor(private configService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Missing authentication token');
        }

        try {
            // Verify token using Clerk SDK
            // Note: In a real NestJS setup with Express, we might use middleware, but here we manually verify or use the Clerk middleware pattern if applicable.
            // However, @clerk/clerk-sdk-node provides verifyToken or similar.
            // Actually, the easiest way is to use the verifyToken function if available, or rely on Clerk's express middleware if registered globally.
            // Let's assume we want to verify it manually here for simplicity in a Guard.

            // Since @clerk/clerk-sdk-node exports 'clerkClient', we can use it.
            // But wait, verifyToken is usually what we want.

            // Let's use a simpler approach: decode and verify.
            // Or better, use the Clerk middleware in main.ts and just check req.auth here?
            // But I haven't set up the middleware in main.ts.

            // Let's try to use the verifyToken from the SDK if I can import it.
            // import { verifyToken } from '@clerk/clerk-sdk-node';

            // If that's not directly available, I'll use the clerkClient.
            // import { clerkClient } from '@clerk/clerk-sdk-node';
            // const { sub } = await clerkClient.verifyToken(token);

            // Let's check the import.

            // Actually, for now, I'll implement a basic check assuming the middleware might be easier, but let's try to do it in the guard to be self-contained.

            const { verifyToken } = await import('@clerk/clerk-sdk-node');
            const verified = await verifyToken(token, {
                secretKey: process.env.CLERK_SECRET_KEY,
            });

            // Attach user to request
            request.user = {
                id: verified.sub,
                ...verified,
            };

            return true;
        } catch (err) {
            this.logger.error('Token verification failed', err);
            throw new UnauthorizedException('Invalid authentication token');
        }
    }
}
