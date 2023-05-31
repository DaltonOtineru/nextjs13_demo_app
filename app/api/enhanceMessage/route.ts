import openai from '@/lib/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'user',
        content: `Rewrite this social media post to make it more punchy, viral and interesting. Keep it under 300 characters, do not put quotations around any words and remove all quotes from around the words : ${prompt}`,
      },
    ],
  });
  return NextResponse.json(chatCompletion.data.choices[0].message);
}
