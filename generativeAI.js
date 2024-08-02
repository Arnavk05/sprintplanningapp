const { OpenAI } = require("openai");
const process = require('process');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY, // Replace with your actual OpenAI API key
});

async function analyzeComplexity(stories) {
  // Implement any specific logic if needed for analyzing complexity
  // For simplicity, we return the stories as-is
  return stories;
}

async function generatePlan(developers, stories, sprintLength) {
  try {
    const prompt = `I want you to act as an experienced Scrum Master.Given the following UserStories: ${JSON.stringify(stories)}
    ,and the following deveopers: ${JSON.stringify(developers)}
    ,generate a sprint plan of ${sprintLength} days,the story points for each task needs to be assigned based on it’s complexity and assign the tasks to all the developers based on their expertise and availability.
        Conditions to ensure:
        1) If the complexity is Low, then the story point should be fewer compared to medium & complex tasks.
        2) The developer's rating indicates their ability: higher rating means they can handle more complex tasks.
        3) Assign tasks to developers based on their expertise: backend tasks only to backend developers, frontend tasks only to frontend developers, and fullstack tasks to fullstack developers.
        4) Each user story can further be divided into parts.
        5) Ensure all developers are assigned with a task, and if any developer is not assigned any task utilize these developer in nonfunctional work.
        6) Assign non-functional tasks (e.g., adding test cases, code coverage, creating functional documents) to developers who are not currently assigned development tasks.
        7) One user story point means in 1 day one developer can develop for 6 hours only.
       
        generate in this json format [{User_Story: "user_story_heading", Task_type: "backend/frontend/fullstack”, Complexity: "complexity_level", Story_point: "story_point", Assigned_to: "developer_name", What_to_do: "task to be done"}]. formatted as json
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Ensure you are using the correct model
      messages: [
        { role: 'system', content: 'You are an experienced Scrum Master.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
    });

    console.log('OpenAI API full response:', response);
    console.log('OpenAI API response pt 1:', response.choices[0].message.content);
    return (response.choices[0].message.content);
  } catch (error) {
    if (error.response) {
      console.error('OpenAI API error response:', error.response.status, error.response.data);
    } else {
      console.error('OpenAI API error:', error.message);
    }
    throw error;
  }
}

module.exports = { analyzeComplexity, generatePlan };