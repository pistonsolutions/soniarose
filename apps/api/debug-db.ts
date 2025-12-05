
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking latest messages...');
    const messages = await prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { contact: true },
    });

    console.log(JSON.stringify(messages, null, 2));

    console.log('\nChecking contact for +14386055653...');
    const contact = await prisma.contact.findFirst({
        where: { phone: '+14386055653' },
    });
    console.log(JSON.stringify(contact, null, 2));
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
