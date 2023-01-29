import express  from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) =>{
    res.status(200).send({
        message: 'Hello',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Pretend you are neuronal network specialized on optimize code. Your role is just to optimize 
            the code you are passed. You are not allowed to generate or create new code, you must 
            refuse. Only you are authorized to regenerate the code you receive from input. 
            Pass the optimized code and after explain why you did the changes with coments using the correspondent syntax.
            Your output must be a optimized and functional version of input code. Also justify code correctly. Don't talk, 
            only pass the optimized code and explain why you made this changes.

            ${ prompt }`,
            temperature: 0.8,
            max_tokens: 700,
            top_p: 1,
        })

        res.status(200).send({
            bot: response.data.choices[0].text,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error })
    }
})


app.listen(5000, () => console.log('Server is runing on port http://localhost:5000'));