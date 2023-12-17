import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { AssistantCreateParams } from 'openai/resources/beta/assistants/assistants';

const openai = new OpenAI();

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<OpenAI.Beta.Assistant | { error: string }>
) {
  const assistantConfig: AssistantCreateParams = {
    name: 'Math Tutor',
    instructions: 'You are a personal math tutor. Write and run code to answer math questions.',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4-1106-preview',
  };

  try {
    const assistant = await openai.beta.assistants.create(assistantConfig);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(assistant);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
