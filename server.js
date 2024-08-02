const express = require('express');
const multer = require('multer');
const { analyzeStories, generateSprintPlan } = require('./sprintPlanning');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.array('files', 2), async (req, res) => {
  try {
    console.log('Files received:', req.files);
    const { sprintLength } = req.body;

    const files = req.files;
    if (files.length !== 2) {
      return res.status(400).send({ error: 'Please upload exactly two files.' });
    }

    const result = await analyzeStories(files);
    console.log('Analyzed stories:', result, sprintLength);

    const sprintPlan = await generateSprintPlan(result);
    console.log('Generated sprint plan:', sprintPlan);

    res.json(sprintPlan);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
