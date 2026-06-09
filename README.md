#  Cartão das Mães

Uma aplicação web que usa **Inteligência Artificial** para gerar mensagens personalizadas de Dia das Mães. O usuário preenche um formulário com informações sobre a mãe e a IA cria uma mensagem emotiva e única — que pode ser copiada ou salva como imagem.

 **Deploy:** [cartao-das-maes.vercel.app](https://dia-das-maes-delta.vercel.app/)

---

##  Funcionalidades

-  **Geração com IA** — mensagens personalizadas via Google Gemini 2.5 Flash
-  **3 temas visuais** — Flores 🌸, Corações 💜 e Aquarela 🎨
-  **Salvar como imagem** — baixa o cartão em PNG de alta resolução (2x)
-  **Copiar mensagem** — copia o texto para a área de transferência
-  **Responsivo** — funciona bem em mobile e desktop
-  **Animações** — pétalas flutuantes, confete e transições suaves

---

##  Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + Vite |
| Estilo | CSS-in-JS (inline styles) |
| IA | Google Gemini 2.5 Flash |
| Servidor local | Node.js + Express |
| Deploy | Vercel (serverless functions) |
| Captura de imagem | html2canvas |

---

##  Estrutura do projeto

```
cartao-das-maes/
├── api/
│   └── gerar.js          # Serverless function da Vercel
├── src/
│   ├── App.jsx            # Todo o frontend React
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── .env                   # Chave da API (não commitado)
├── .gitignore
├── server.js              # Servidor Express para rodar local
├── vite.config.js         # Proxy /api → localhost:3001
├── vercel.json
├── index.html
└── package.json
```

---

##  Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/vitorTweaks/cartao-das-maes.git
cd cartao-das-maes
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a variável de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY= sua chave(API key)
```

>  Obtenha sua chave gratuita em [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 4. Rode o projeto (dois terminais)

**Terminal 1 — servidor Express (porta 3001):**
```bash
node server.js
```

**Terminal 2 — Vite dev server (porta 5173):**
```bash
npm run dev
```

### 5. Acesse no browser

```
http://localhost:5173
```

---

##  Deploy na Vercel

O projeto já está configurado para deploy na Vercel. A serverless function em `api/gerar.js` substitui o `server.js` em produção.

### Passos

1. Faça o push para o GitHub
2. Importe o repositório na [Vercel](https://vercel.com)
3. Adicione a variável de ambiente no painel da Vercel:
   - **Nome:** `GEMINI_API_KEY`
   - **Valor:** sua chave do Google AI Studio
4. Deploy automático 

---

##  Como funciona

```
Usuário preenche o formulário
        ↓
Frontend monta um prompt personalizado
        ↓
POST /api/gerar → Express (local) ou Vercel Function (produção)
        ↓
Gemini 2.5 Flash gera a mensagem
        ↓
Cartão é exibido com animações
        ↓
Usuário copia ou salva como PNG
```

---

##  Licença

MIT — fique à vontade para usar, modificar e distribuir.
