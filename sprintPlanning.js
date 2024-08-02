const xlsx = require('xlsx');
const { analyzeComplexity, generatePlan } = require('./generativeAI');

async function analyzeStories(files) {
  try {
    const developerData = readExcel(files[0].path);
    const userStoryData = readExcel(files[1].path);

    const mergedData = mergeData(developerData, userStoryData);
    return mergedData;
  } catch (error) {
    console.error('Error analyzing stories:', error);
    throw error;
  }
}

function readExcel(filePath) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error;
  }
}

function mergeData(developers, stories) {
  return { developers, stories };
}

async function generateSprintPlan(data, sprintLength) {
  try {
    const analyzedStories = await analyzeComplexity(data.stories);
    const sprintPlan = await generatePlan(data.developers, analyzedStories, sprintLength);
    return sprintPlan;
  } catch (error) {
    console.error('Error generating sprint plan:', error);
    throw error;
  }
}

module.exports = { analyzeStories, generateSprintPlan };
