import { useState, useEffect } from "react";

function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!active) return;
    setPieces(Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ["#e91e63", "#f48fb1", "#ff80ab", "#fce4ec", "#f06292", "#ff4081"][Math.floor(Math.random() * 6)],
      delay: Math.random() * 1.5,
      size: Math.random() * 8 + 6,
      duration: Math.random() * 2 + 2,
    })));
    const t = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.left}%`,
          top: "-10px",
          width: p.size,
          height: p.size,
          background: p.color,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
        }} />
      ))}
    </div>
  );
}

function Petals() {
  const petals = ["🌸", "🌺", "🌷", "🌸", "🌺", "🌸", "🌷", "🌸", "🌺", "🌷"];
  // ctrl+. integração de emojis (lembrete)
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {petals.map((p, i) => (
        <span key={i} style={{
          position: "absolute",
          top: "-30px",
          left: `${i * 10 + Math.random() * 5}%`,
          fontSize: `${Math.random() * 10 + 14}px`,
          animation: `petalFall ${Math.random() * 4 + 5}s ${i * 0.7}s linear infinite`,
          opacity: 0.7,
        }}>{p}</span>
      ))}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({
    nomeFilho: "", nomeMae: "", memoria: "", qualidade: "", estilo: "carinhoso",
  });
  const [mensagem, setMensagem] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [step]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function gerarMensagem() {
    setStep("loading");
    const prompt = `Crie uma mensagem de Dia das Mães personalizada e emocionante.
Informações:
- Nome do filho/filha: ${formData.nomeFilho}
- Nome da mãe: ${formData.nomeMae}
- Uma memória especial: ${formData.memoria}
- Principal qualidade da mãe: ${formData.qualidade}
- Estilo da mensagem: ${formData.estilo}
Escreva uma mensagem bonita, de 3 a 4 parágrafos, no estilo "${formData.estilo}". 
Não use asteriscos nem formatação markdown. Apenas texto puro e emotivo.`;

    try {
      const response = await fetch("http://localhost:3001/api/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setMensagem(data.texto);
      setStep("card");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    } catch (err) {
      alert("Erro ao gerar mensagem.");
      setStep("form");
    }
  }

  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  };

  if (step === "form") return (
    <div style={styles.page}>
      <Petals />
      <Confetti active={showConfetti} />
      <div style={{ ...styles.card, ...fadeStyle }}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>💝</div>
          <h1 style={styles.title}>Cartão das Mães</h1>
          <p style={styles.subtitle}>Crie uma mensagem única com inteligência artificial</p>
        </div>
        <div style={styles.form}>
          {[
            { label: "Seu nome", name: "nomeFilho", placeholder: "Ex: João", type: "input" },
            { label: "Nome da sua mãe", name: "nomeMae", placeholder: "Ex: Maria", type: "input" },
            { label: "Uma memória especial com ela", name: "memoria", placeholder: "Ex: quando ela ficou acordada me ajudando a estudar...", type: "textarea" },
            { label: "Principal qualidade dela", name: "qualidade", placeholder: "Ex: guerreira, carinhosa, divertida...", type: "input" },
          ].map(({ label, name, placeholder, type }) => (
            <div key={name} style={styles.field}>
              <label style={styles.label}>{label}</label>
              {type === "textarea"
                ? <textarea name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} rows={3} style={styles.textarea} />
                : <input name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} style={styles.input} />}
            </div>
          ))}
          <div style={styles.field}>
            <label style={styles.label}>Estilo da mensagem</label>
            <select name="estilo" value={formData.estilo} onChange={handleChange} style={styles.input}>
              <option value="carinhoso">🤍 Carinhoso e emotivo</option>
              <option value="poético">🤍 Poético e lírico</option>
              <option value="divertido">🤍 Divertido e leve</option>
              <option value="simples">🤍 Simples e direto do coração</option>
            </select>
          </div>
          <button
            onClick={gerarMensagem}
            disabled={!formData.nomeFilho || !formData.nomeMae || !formData.memoria || !formData.qualidade}
            style={styles.button}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 25px rgba(233,30,99,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 15px rgba(233,30,99,0.3)"; }}
          >
            Gerar mensagem com IA.
          </button>
        </div>
      </div>
    </div>
  );

  if (step === "loading") return (
    <div style={styles.page}>
      <Petals />
      <div style={{ ...styles.loadingCard, ...fadeStyle }}>
        <div style={styles.spinner}>🌸</div>
        <h2 style={styles.loadingTitle}>Escrevendo com carinho...</h2>
        <p style={styles.loadingText}>A IA está criando uma mensagem única para sua mãe</p>
        <div style={styles.dots}>
          {[0, 0.2, 0.4].map((d, i) => (
            <span key={i} style={{ ...styles.dot, animationDelay: `${d}s` }} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <Petals />
      <Confetti active={showConfetti} />
      <div style={{ ...styles.card, maxWidth: "580px", ...fadeStyle }}>
        <div style={styles.cardTop}>
          <div style={styles.envelope}>💌</div>
          <h2 style={styles.cardTitle}>Para {formData.nomeMae}</h2>
          <p style={styles.cardSubtitle}>com todo o amor de {formData.nomeFilho}</p>
        </div>
        <div style={styles.divider} />
        <div style={styles.mensagemBox}>
          <p style={styles.mensagemText}>{mensagem}</p>
        </div>
        <div style={styles.cardFooter}>
          <p style={styles.footerText}> Feliz Dia das Mães !!!</p>
        </div>
        <div style={styles.actions}>
          <button onClick={() => setStep("form")} style={styles.btnSecondary}>↺ Gerar outro</button>
          <button onClick={() => { navigator.clipboard.writeText(mensagem); alert("Mensagem copiada!"); }} style={styles.btnPrimary}>
            Copiar mensagem.
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #ffe4ef 0%, #fce4ec 40%, #f8bbd0 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" },
  card: { background: "white", borderRadius: "24px", boxShadow: "0 20px 60px rgba(233,30,99,0.15)", padding: "2.5rem", width: "100%", maxWidth: "460px", position: "relative", zIndex: 1 },
  header: { textAlign: "center", marginBottom: "2rem" },
  iconCircle: { fontSize: "3rem", marginBottom: "0.5rem" },
  title: { fontSize: "1.8rem", fontWeight: "700", background: "linear-gradient(135deg, #e91e63, #f48fb1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 0.25rem" },
  subtitle: { color: "#aaa", fontSize: "0.85rem", margin: 0 },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem" },
  label: { fontSize: "0.8rem", fontWeight: "600", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" },
  input: { border: "1.5px solid #f8bbd0", borderRadius: "10px", padding: "0.65rem 0.9rem", fontSize: "0.9rem", color: "#333", outline: "none", background: "#fff9fc", width: "100%", boxSizing: "border-box" },
  textarea: { border: "1.5px solid #f8bbd0", borderRadius: "10px", padding: "0.65rem 0.9rem", fontSize: "0.9rem", color: "#333", outline: "none", resize: "none", background: "#fff9fc", width: "100%", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" },
  button: { background: "linear-gradient(135deg, #e91e63, #f06292)", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem", fontSize: "0.95rem", fontWeight: "600", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 15px rgba(233,30,99,0.3)", marginTop: "0.5rem" },
  loadingCard: { background: "white", borderRadius: "24px", boxShadow: "0 20px 60px rgba(233,30,99,0.15)", padding: "3rem 2rem", textAlign: "center", zIndex: 1 },
  spinner: { fontSize: "3.5rem", animation: "spin 1.5s linear infinite", display: "block", marginBottom: "1rem" },
  loadingTitle: { color: "#e91e63", fontSize: "1.3rem", margin: "0 0 0.5rem" },
  loadingText: { color: "#aaa", fontSize: "0.9rem", margin: "0 0 1.5rem" },
  dots: { display: "flex", gap: "6px", justifyContent: "center" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", background: "#e91e63", animation: "pulse 0.8s ease-in-out infinite", display: "inline-block" },
  cardTop: { textAlign: "center", marginBottom: "1.5rem" },
  envelope: { fontSize: "3rem", marginBottom: "0.5rem" },
  cardTitle: { fontSize: "1.6rem", fontWeight: "700", background: "linear-gradient(135deg, #e91e63, #f48fb1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 0.25rem" },
  cardSubtitle: { color: "#bbb", fontSize: "0.85rem", margin: 0 },
  divider: { height: "1px", background: "linear-gradient(to right, transparent, #f8bbd0, transparent)", margin: "1.5rem 0" },
  mensagemBox: { background: "linear-gradient(135deg, #fff0f6, #fff9fc)", borderRadius: "16px", padding: "1.5rem", border: "1px solid #fce4ec" },
  mensagemText: { color: "#444", fontSize: "0.95rem", lineHeight: "1.8", margin: 0, whiteSpace: "pre-line", textAlign: "center" },
  cardFooter: { textAlign: "center", margin: "1.5rem 0 0" },
  footerText: { color: "#f48fb1", fontSize: "0.9rem", margin: 0, letterSpacing: "0.1em" },
  actions: { display: "flex", gap: "0.75rem", marginTop: "1.5rem" },
  btnSecondary: { flex: 1, border: "1.5px solid #f8bbd0", background: "white", color: "#e91e63", borderRadius: "12px", padding: "0.75rem", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer" },
  btnPrimary: { flex: 2, background: "linear-gradient(135deg, #e91e63, #f06292)", color: "white", border: "none", borderRadius: "12px", padding: "0.75rem", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 15px rgba(233,30,99,0.3)" },
};