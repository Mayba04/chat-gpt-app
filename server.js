const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: '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',
});

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt}],
    });
    console.log(response.choices[0].message);
    
    res.send({ text: response.choices[0].message }); // Відправляємо об'єкт з полем text
    
  } catch (error) {
    console.error('Error calling the OpenAI API:', error);
    res.status(500).send('Failed to fetch the response from OpenAI');
  }
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
