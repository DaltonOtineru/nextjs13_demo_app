import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;

// const response = await openai.createEdit({
//   model: "text-davinci-edit-001",
//   input: "What day of the wek is it?",
//   instruction: "Fix the spelling mistakes",
// });
