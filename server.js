import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/gerar", async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        const json = await response.json();
        console.log(JSON.stringify(json, null, 2));
        const texto = json.candidates[0].content.parts[0].text;
        res.json({ texto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao chamar a API" });
    }
});

app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});