import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { Message } from '@/types/openai';

const initAssistantMessage: Message = {
  id: 'init',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: {
        value:
          'Greetings, Adeptus Mechanicus novice. I am your virtual assistant, dedicated to guiding you into the realm of wargaming, with a special focus on Warhammer 40k. I am here to answer any questions you may have about store locations, as well as to immerse you in the intricate history of our fictional universe, where in a dark future, only war prevails.',
      },
    },
  ],
};

const openai = new OpenAI();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | Message[]
    | {
        error: string;
      }
  >
) {
  // get thread id from query params
  const threadID = req.query.threadID as string;

  if (!threadID) {
    return res.status(400).json({ error: 'Thread ID is required' });
  }

  try {
    const threadMessages = await openai.beta.threads.messages.list(threadID, {
      order: 'asc',
    });

    // map to only keep id, role, and content fields
    const messages = threadMessages.data.map(({ id, role, content }) => ({
      id,
      role,
      content,
    }));

    return res.status(200).json([initAssistantMessage, ...messages]);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error' });
  }
}
