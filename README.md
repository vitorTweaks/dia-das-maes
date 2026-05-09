#  Cartão das Mães — Gerador de mensagens com IA

Uma aplicação web que usa inteligência artificial para criar mensagens únicas e emocionantes para o Dia das Mães. Basta preencher um formulário com informações sobre sua mãe e a IA gera um texto personalizado e cheio de carinho em segundos.

---

##  Funcionalidades

- Geração de mensagens personalizadas com IA (Google Gemini) OBS: Também pode ser feito através do Claude Code, OpenAI etc... (Exige Custos para criação de uma API Key)
- 4 estilos de mensagem: carinhoso, poético, divertido e simples
- Animações de pétalas e confete
- Botão para copiar a mensagem gerada
- Interface bonita e responsiva

---

##  Tecnologias utilizadas

- React + Vite
- Node.js + Express
- Google Gemini API
- Tailwind CSS (via CDN)

---

##  Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- Chave de API do Google Gemini ([aistudio.google.com](https://aistudio.google.com))

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/vitorTweaks/cartao-das-maes.git
cd cartao-das-maes
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto:

GEMINI_API_KEY=sua_chave_aqui

4. Em um terminal, rode o servidor:
```bash
node server.js
```

5. Em outro terminal, rode o frontend:
```bash
npm run dev
```

6. Acesse [http://localhost:5173](http://localhost:5173)

---

##  Entrega — Hackathon Dia das Mães

Projeto desenvolvido para o Hackathon com tema **Dia das Mães**.

Desenvolvido por **Vitor**