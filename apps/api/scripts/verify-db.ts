import { PrismaClient, TaskPriority, TaskStatus } from '@prisma/client';

async function main() {
    console.log('Connecting to database...');
    const prisma = new PrismaClient();

    try {
        const userId = 'verify_db_user_' + Date.now();
        console.log(`Using userId: ${userId}`);

        // 1. Create Task
        console.log('Creating task...');
        const task = await prisma.task.create({
            data: {
                userId,
                title: 'Verification Task',
                description: 'Created by verify-db script',
                priority: TaskPriority.HIGH,
                status: TaskStatus.PENDING,
            },
        });
        console.log('Task created:', task.id);

        // 2. Read Task
        console.log('Reading task...');
        const foundTask = await prisma.task.findUnique({
            where: { id: task.id },
        });

        if (!foundTask) {
            throw new Error('Task not found!');
        }
        console.log('Task found:', foundTask.title);

        if (foundTask.title !== 'Verification Task') {
            throw new Error('Task title mismatch!');
        }

        // 3. Delete Task
        console.log('Deleting task...');
        await prisma.task.delete({
            where: { id: task.id },
        });
        console.log('Task deleted.');

        // 4. Verify Deletion
        const deletedTask = await prisma.task.findUnique({
            where: { id: task.id },
        });

        if (deletedTask) {
            throw new Error('Task should have been deleted!');
        }
        console.log('Deletion verified.');

        console.log('✅ Database verification successful!');
    } catch (error) {
        console.error('❌ Database verification failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
