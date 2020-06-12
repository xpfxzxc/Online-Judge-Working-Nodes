import { connect, Message } from 'amqplib';
import { createConnection } from 'typeorm';

import { judge } from './judge';
import { JudgementTask } from './judgement-task.interface';
import { Submission } from '../entities/submission';

async function launch() {
  await createConnection();

  const rabbitMQConnection = await connect('amqp://localhost');
  const channel = await rabbitMQConnection.createChannel();
  const queue = 'judgement';

  await channel.assertQueue(queue);

  await channel.prefetch(1);
  console.log(' [*] Waiting for tasks in %s. To exit press CTRL+C', queue);

  await channel.consume(queue, async (msg) => {
    const task: JudgementTask = JSON.parse(msg!.content.toString());
    const { userId, problemId, code, lang, submissionId } = task;

    console.log(' [x] Received Task %s:\n', task);

    await Submission.update(
      {
        id: submissionId,
      },
      {
        status: 'Judging',
      },
    );

    const result = judge(userId, problemId, lang, code);
    const { status, score, timeUsage, memoryUsage, testPoints } = result;
    console.log(result);

    await Submission.update(
      {
        id: submissionId,
      },
      {
        status,
        score,
        timeUsage,
        memoryUsage,
        testPoints: JSON.stringify(testPoints),
      },
    );

    channel.ack(msg as Message);
  });
}

launch();
