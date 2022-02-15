import express from 'express';
import * as dotEnv from 'dotenv';
import { TokenGenerator } from './controllers/token-generator.controller.js';

const app = express();
dotEnv.config()
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola")
});

app.post("/generate", (req, res) => {
    let token = new TokenGenerator();
    token.generateToken(req, res);
});

app.listen(parseInt(process.env.PORT));
console.log("Server listening in port: " + process.env.PORT);