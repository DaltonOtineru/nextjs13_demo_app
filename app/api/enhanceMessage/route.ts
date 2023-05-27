import openai from '@/lib/openai';
import { NextRequest, NextResponse } from 'next/server';

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
        content: `Rewrite this social media post to make it more punchy, viral and interesting. keep it under 300 characters and remove any quotes from around the words : ${prompt}`,
      },
    ],
  });
  return NextResponse.json(chatCompletion.data.choices[0].message);
}
