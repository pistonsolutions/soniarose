const { Queue } = require('bullmq');
const Redis = require('ioredis');

async function main() {
    const connection = new Redis('redis://localhost:6379');

    console.log('Connected to Redis');

    const keys = await connection.keys('*');
    console.log('Redis Keys:', keys);

    const queue = new Queue('workflow-actions', { connection });

    const counts = await queue.getJobCounts('waiting', 'active', 'completed', 'failed', 'delayed');
    console.log('Queue Counts:', counts);

    const waiting = await queue.getWaiting();
    console.log('Waiting Jobs:', waiting.map(j => ({ id: j.id, name: j.name, data: j.data })));

    const active = await queue.getActive();
    console.log('Active Jobs:', active.map(j => ({ id: j.id, name: j.name })));

    const completed = await queue.getCompleted();
    console.log('Completed Jobs:', completed.map(j => ({
        id: j.id,
        name: j.name,
        returnvalue: j.returnvalue,
        processedOn: j.processedOn,
        finishedOn: j.finishedOn,
        timestamp: j.timestamp,
        data: j.data,
    })));

    await connection.quit();
    await queue.close();
}

main().catch(console.error);
