import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { createWorkspaceSchema } from '../schemas';
import { sessionMiddleware } from '@/lib/session-middeware';

import { DATABASE_ID, WORKSPACES_ID } from '@/config';
import { ID } from 'node-appwrite';
import { create } from 'domain';


const app = new Hono()
.post(
    '/',
    zValidator("json", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { name } = c.req.valid("json");

        const workspace = await databases.createDocument(
            DATABASE_ID,
            WORKSPACES_ID,
            ID.unique(),
            {
                name,
                userid: user.$id,
            },
        );
        
        return c.json({ data: workspace });
    }
);

export default app;