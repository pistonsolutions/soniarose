import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const runs = await prisma.workflowRun.findMany({
        where: { contactId: 'cmiselvve0000i16hxov18tm2' },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
            steps: true,
        }
    });

    console.log('Workflow Runs for Contact:', JSON.stringify(runs, null, 2));

    const messages = await prisma.message.findMany({
        where: { contactId: 'cmiselvve0000i16hxov18tm2' },
        orderBy: { createdAt: 'desc' },
        take: 5,
    });

    console.log('Recent Messages:', JSON.stringify(messages, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
