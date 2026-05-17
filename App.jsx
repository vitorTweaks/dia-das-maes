import { useState, useEffect, useRef, useMemo } from "react";
import html2canvas from "html2canvas";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 480);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function Toast({ mensagem, visivel, cor }) {
  return (
    <div style={{
      position: "fixed",
      bottom: "2rem",
      left: "50%",
      transform: visivel ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(120%)",
      transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      background: cor || "#333",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "100px",
      fontSize: "0.9rem",
      fontWeight: "600",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
      zIndex: 9999,
      whiteSpace: "nowrap",
      pointerEvents: "none",
    }}>
      {mensagem}
    </div>
  );
}

// h t
function useToast() {
  const [toast, setToast] = useState({ visivel: false, mensagem: "", cor: "" });
  const timerRef = useRef(null);

  function mostrarToast(mensagem, cor = "#2e7d32") {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ visivel: true, mensagem, cor });
    timerRef.current = setTimeout(() => {
      setToast(t => ({ ...t, visivel: false }));
    }, 2500);
  }

  return { toast, mostrarToast };
}

// ttemas 01
const TEMAS = {
  flores: {
    nome: "Flores",
    emoji: "🌸",
    petals: ["🌸", "🌺", "🌷", "🌸", "🌺", "🌸", "🌷", "🌸", "🌺", "🌷"],
    pageBg: "linear-gradient(135deg, #ffe4ef 0%, #fce4ec 40%, #f8bbd0 100%)",
    titleGradient: "linear-gradient(135deg, #e91e63, #f48fb1)",
    dividerBg: "linear-gradient(to right, transparent, #f8bbd0, transparent)",
    mensagemBg: "linear-gradient(135deg, #fff0f6, #fff9fc)",
    mensagemBorder: "1px solid #fce4ec",
    mensagemColor: "#444",
    footerColor: "#f48fb1",
    envelopeEmoji: "💌",
    btnGradient: "linear-gradient(135deg, #e91e63, #f06292)",
    btnShadow: "0 4px 15px rgba(233,30,99,0.3)",
    inputBorder: "#f8bbd0",
    inputBg: "#fff9fc",
    accentColor: "#e91e63",
    subtitleColor: "#bbb",
    confettiColors: ["#e91e63", "#f48fb1", "#ff80ab", "#fce4ec", "#f06292", "#ff4081"],
  },
  coracoes: {
    nome: "Corações",
    emoji: "💜",
    petals: ["💜", "💙", "💜", "🫧", "💜", "💙", "🫧", "💜", "💙", "💜"],
    pageBg: "linear-gradient(135deg, #ede7f6 0%, #e8eaf6 40%, #d1c4e9 100%)",
    titleGradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    dividerBg: "linear-gradient(to right, transparent, #d1c4e9, transparent)",
    mensagemBg: "linear-gradient(135deg, #f3e8ff, #ede9fe)",
    mensagemBorder: "1px solid #e9d5ff",
    mensagemColor: "#3b1f6e",
    footerColor: "#7c3aed",
    envelopeEmoji: "💌",
    btnGradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    btnShadow: "0 4px 15px rgba(124,58,237,0.3)",
    inputBorder: "#d1c4e9",
    inputBg: "#f5f3ff",
    accentColor: "#7c3aed",
    subtitleColor: "#a78bfa",
    confettiColors: ["#7c3aed", "#a78bfa", "#c4b5fd", "#ddd6fe", "#8b5cf6", "#6d28d9"],
  },
  aquarela: {
    nome: "Aquarela",
    emoji: "🎨",
    petals: ["🍂", "🌿", "✨", "🍂", "🌿", "✨", "🍂", "🌿", "✨", "🍂"],
    pageBg: "linear-gradient(135deg, #fdf6ec 0%, #fef3c7 40%, #fde68a 100%)",
    titleGradient: "linear-gradient(135deg, #b45309, #f59e0b)",
    dividerBg: "linear-gradient(to right, transparent, #fde68a, transparent)",
    mensagemBg: "linear-gradient(135deg, #fffbeb, #fef9ec)",
    mensagemBorder: "1px solid #fde68a",
    mensagemColor: "#44332a",
    footerColor: "#b45309",
    envelopeEmoji: "📜",
    btnGradient: "linear-gradient(135deg, #b45309, #f59e0b)",
    btnShadow: "0 4px 15px rgba(180,83,9,0.3)",
    inputBorder: "#fde68a",
    inputBg: "#fffbeb",
    accentColor: "#b45309",
    subtitleColor: "#d97706",
    confettiColors: ["#b45309", "#f59e0b", "#fcd34d", "#fde68a", "#d97706", "#92400e"],
  },
};

function gradienteTexto(gradient) {
  return {
    background: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    display: "inline-block",
  };
}

// fe
function Confetti({ active, cores }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!active) return;
    setPieces(Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: cores[Math.floor(Math.random() * cores.length)],
      delay: Math.random() * 1.5,
      size: Math.random() * 8 + 6,
      duration: Math.random() * 2 + 2,
      round: Math.random() > 0.5,
    })));
    const t = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.left}%`, top: "-10px",
          width: p.size, height: p.size, background: p.color,
          borderRadius: p.round ? "50%" : "2px",
          animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
        }} />
      ))}
    </div>
  );
}

// flores
function Petals({ emojis }) {
  const petalData = useMemo(() =>
    emojis.map((emoji, i) => ({
      emoji,
      left: i * 10 + Math.random() * 5,
      fontSize: Math.random() * 10 + 14,
      duration: Math.random() * 4 + 5,
      delay: i * 0.7,
    })),
    [emojis]
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {petalData.map((p, i) => (
        <span key={i} style={{
          position: "absolute", top: "-30px",
          left: `${p.left}%`,
          fontSize: `${p.fontSize}px`,
          animation: `petalFall ${p.duration}s ${p.delay}s linear infinite`,
          opacity: 0.7,
        }}>{p.emoji}</span>
      ))}
    </div>
  );
}

// temas 02
function SeletorTema({ temaSelecionado, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label style={styles.label}>Visual do cartão</label>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {Object.entries(TEMAS).map(([chave, tema]) => {
          const ativo = temaSelecionado === chave;
          return (
            <button
              key={chave}
              onClick={() => onChange(chave)}
              style={{
                flex: 1, padding: "0.6rem 0.4rem", borderRadius: "12px",
                border: ativo ? `2px solid ${tema.accentColor}` : "2px solid #f0f0f0",
                background: ativo ? tema.mensagemBg : "white",
                cursor: "pointer", transition: "all 0.2s ease",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem",
                boxShadow: ativo ? `0 0 0 3px ${tema.accentColor}22` : "none",
                minHeight: "64px",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>{tema.emoji}</span>
              <span style={{ fontSize: "0.7rem", fontWeight: "600", color: ativo ? tema.accentColor : "#888" }}>
                {tema.nome}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// main
export default function App() {
  const isMobile = useIsMobile();
  const { toast, mostrarToast } = useToast();

  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({
    nomeFilho: "", nomeMae: "", memoria: "", qualidade: "", estilo: "carinhoso",
  });
  const [mensagem, setMensagem] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [visible, setVisible] = useState(false);
  const [temaKey, setTemaKey] = useState("flores");

  const cartaoRef = useRef(null);
  const [salvando, setSalvando] = useState("idle");

  const tema = TEMAS[temaKey];

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
      const response = await fetch("/api/gerar", {
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
      mostrarToast("❌ Erro ao gerar mensagem. Tente novamente.", "#c62828");
      setStep("form");
    }
  }

  // copiar msg
  function copiarMensagem() {
    navigator.clipboard.writeText(mensagem)
      .then(() => mostrarToast("✅ Mensagem copiada!", "#2e7d32"))
      .catch(() => mostrarToast("❌ Não foi possível copiar.", "#c62828"));
  }

  // enviar no wpp
  function enviarWhatsApp() {
    const texto = encodeURIComponent(mensagem);
    window.open(`https://wa.me/?text=${texto}`, "_blank");
  }

  async function salvarComoImagem() {
    if (!cartaoRef.current || salvando === "salvando") return;
    setSalvando("salvando");
    try {
      const acoesEl = cartaoRef.current.querySelector("[data-no-capture]");
      if (acoesEl) acoesEl.style.visibility = "hidden";
      await new Promise(resolve => setTimeout(resolve, 120));
      const canvas = await html2canvas(cartaoRef.current, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false,
        windowWidth: cartaoRef.current.scrollWidth,
        windowHeight: cartaoRef.current.scrollHeight,
      });
      if (acoesEl) acoesEl.style.visibility = "visible";
      const nomeSanitizado = formData.nomeMae
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-").toLowerCase();
      const link = document.createElement("a");
      link.download = `cartao-dia-das-maes-${nomeSanitizado}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setSalvando("sucesso");
      mostrarToast("🖼️ Imagem salva!", "#1565c0");
      setTimeout(() => setSalvando("idle"), 2500);
    } catch (err) {
      console.error("Erro ao salvar imagem:", err);
      const acoesEl = cartaoRef.current?.querySelector("[data-no-capture]");
      if (acoesEl) acoesEl.style.visibility = "visible";
      setSalvando("erro");
      mostrarToast("❌ Erro ao salvar. Tente novamente.", "#c62828");
      setTimeout(() => setSalvando("idle"), 2500);
    }
  }

  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  };

  const r = {
    pageAlign: isMobile ? "flex-start" : "center",
    pagePadding: isMobile ? "1rem 0.75rem 2rem" : "2rem 1rem",
    cardPadding: isMobile ? "1.5rem 1.25rem" : "2.5rem",
    cardRadius: isMobile ? "20px" : "24px",
    titleSize: isMobile ? "1.5rem" : "1.8rem",
    cardTitleSize: isMobile ? "1.8rem" : "2.2rem",
    mensagemSize: isMobile ? "1.05rem" : "1.15rem",
    mensagemPadding: isMobile ? "1rem" : "1.5rem",
    loadingPadding: isMobile ? "2rem 1.25rem" : "3rem 2rem",
    actionsDirection: isMobile ? "column" : "row",
    btnFlex: isMobile ? "none" : undefined,
    btnWidth: isMobile ? "100%" : undefined,
  };

  // formulario || preenchimento 
  if (step === "form") return (
    <div style={{ ...styles.page, background: tema.pageBg, alignItems: r.pageAlign, padding: r.pagePadding }}>
      <Petals emojis={tema.petals} />
      <Confetti active={showConfetti} cores={tema.confettiColors} />
      <Toast {...toast} />
      <div style={{ ...styles.card, ...fadeStyle, padding: r.cardPadding, borderRadius: r.cardRadius }}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>💝</div>
          <h1 style={{ ...styles.title, fontSize: r.titleSize, ...gradienteTexto(tema.titleGradient) }}>
            Cartão das Mães
          </h1>
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
                ? <textarea name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder}
                  rows={isMobile ? 2 : 3}
                  style={{ ...styles.textarea, borderColor: tema.inputBorder, background: tema.inputBg, fontSize: isMobile ? "1rem" : "0.9rem" }} />
                : <input name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder}
                  style={{ ...styles.input, borderColor: tema.inputBorder, background: tema.inputBg, fontSize: isMobile ? "1rem" : "0.9rem" }} />}
            </div>
          ))}
          <div style={styles.field}>
            <label style={styles.label}>Estilo da mensagem</label>
            <select name="estilo" value={formData.estilo} onChange={handleChange}
              style={{ ...styles.input, borderColor: tema.inputBorder, background: tema.inputBg, fontSize: isMobile ? "1rem" : "0.9rem" }}>
              <option value="carinhoso">🤍 Carinhoso e emotivo</option>
              <option value="poético">🤍 Poético e lírico</option>
              <option value="divertido">🤍 Divertido e leve</option>
              <option value="simples">🤍 Simples e direto do coração</option>
            </select>
          </div>

          <SeletorTema temaSelecionado={temaKey} onChange={setTemaKey} />

          <button
            onClick={gerarMensagem}
            disabled={!formData.nomeFilho || !formData.nomeMae || !formData.memoria || !formData.qualidade}
            style={{
              ...styles.button, background: tema.btnGradient, boxShadow: tema.btnShadow,
              padding: isMobile ? "1rem" : "0.9rem", fontSize: isMobile ? "1rem" : "0.95rem"
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}
          >
            Gerar mensagem com IA ✨
          </button>
        </div>
      </div>
    </div>
  );

  // carregamento (sistema)
  if (step === "loading") return (
    <div style={{ ...styles.page, background: tema.pageBg }}>
      <Petals emojis={tema.petals} />
      <div style={{ ...styles.loadingCard, ...fadeStyle, padding: r.loadingPadding }}>
        <div style={styles.spinner}>{tema.emoji}</div>
        <h2 style={{ ...styles.loadingTitle, color: tema.accentColor }}>Escrevendo com carinho...</h2>
        <p style={styles.loadingText}>A IA está criando uma mensagem única para sua mãe</p>
        <div style={styles.dots}>
          {[0, 0.2, 0.4].map((d, i) => (
            <span key={i} style={{ ...styles.dot, background: tema.accentColor, animationDelay: `${d}s` }} />
          ))}
        </div>
      </div>
    </div>
  );

  // cartão
  return (
    <div style={{ ...styles.page, background: tema.pageBg, alignItems: r.pageAlign, padding: r.pagePadding }}>
      <Petals emojis={tema.petals} />
      <Confetti active={showConfetti} cores={tema.confettiColors} />
      <Toast {...toast} />

      <div ref={cartaoRef} style={{ ...styles.card, maxWidth: "580px", ...fadeStyle, padding: r.cardPadding, borderRadius: r.cardRadius }}>
        <div style={styles.cardTop}>
          <div style={styles.envelope}>{tema.envelopeEmoji}</div>
          <h2 style={{
            ...styles.cardTitle,
            fontSize: r.cardTitleSize,
            fontFamily: "'Dancing Script', cursive",
            fontWeight: "700",
            ...gradienteTexto(tema.titleGradient),
          }}>
            Para {formData.nomeMae}
          </h2>
          <p style={{
            ...styles.cardSubtitle,
            color: tema.subtitleColor,
            fontFamily: "'Dancing Script', cursive",
            fontSize: isMobile ? "1rem" : "1.1rem",
          }}>
            com todo o amor de {formData.nomeFilho}
          </p>
        </div>

        <div style={{ ...styles.divider, background: tema.dividerBg }} />

        <div style={{ ...styles.mensagemBox, background: tema.mensagemBg, border: tema.mensagemBorder, padding: r.mensagemPadding }}>
          <p style={{
            ...styles.mensagemText,
            color: tema.mensagemColor,
            fontSize: r.mensagemSize,
            fontFamily: "'Dancing Script', cursive",
            lineHeight: "2",
            letterSpacing: "0.01em",
          }}>
            {mensagem}
          </p>
        </div>

        <div style={styles.cardFooter}>
          <p style={{
            ...styles.footerText,
            color: tema.footerColor,
            fontFamily: "'Dancing Script', cursive",
            fontSize: isMobile ? "1.1rem" : "1.25rem",
            letterSpacing: "0.02em",
          }}>
            {tema.emoji} Feliz Dia das Mães {tema.emoji}
          </p>
        </div>

        {/* Botões */}
        <div data-no-capture style={{ ...styles.actions, flexDirection: r.actionsDirection }}>

          <button
            onClick={() => setStep("form")}
            style={{ ...styles.btnSecondary, borderColor: tema.inputBorder, color: tema.accentColor, flex: r.btnFlex, width: r.btnWidth }}
          >
            ↺ Gerar outro
          </button>

          {/* Copiar — alert verde(modificaçoes) */}
          <button
            onClick={copiarMensagem}
            style={{ ...styles.btnPrimary, background: tema.btnGradient, boxShadow: tema.btnShadow, flex: r.btnFlex, width: r.btnWidth }}
          >
            📋 Copiar
          </button>

          {/* WhatsApp — verde fixo, abre whtsp */}
          <button
            onClick={enviarWhatsApp}
            style={{ ...styles.btnWhatsapp, flex: r.btnFlex, width: r.btnWidth }}
          >
            <span style={{ fontSize: "1rem" }}>💬</span> WhatsApp
          </button>

          {/* Salvar imagm */}
          <button
            onClick={salvarComoImagem}
            disabled={salvando === "salvando"}
            style={{
              ...styles.btnSalvar,
              flex: r.btnFlex, width: r.btnWidth,
              color: salvando === "idle" ? tema.accentColor : undefined,
              borderColor: salvando === "idle" ? tema.accentColor : undefined,
              ...(salvando === "salvando" ? styles.btnSalvarLoading : {}),
              ...(salvando === "sucesso" ? styles.btnSalvarSucesso : {}),
              ...(salvando === "erro" ? styles.btnSalvarErro : {}),
            }}
          >
            {salvando === "salvando" && "⏳ Salvando..."}
            {salvando === "sucesso" && "✅ Salvo!"}
            {salvando === "erro" && "❌ Erro"}
            {salvando === "idle" && "💾 Salvar"}
          </button>

        </div>
      </div>
    </div>
  );
}

// base
const styles = {
  page: { minHeight: "100vh", display: "flex", justifyContent: "center", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" },
  card: { background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", width: "100%", maxWidth: "460px", position: "relative", zIndex: 1 },
  header: { textAlign: "center", marginBottom: "2rem" },
  iconCircle: { fontSize: "3rem", marginBottom: "0.5rem" },
  title: { fontWeight: "700", margin: "0 0 0.25rem" },
  subtitle: { color: "#aaa", fontSize: "0.85rem", margin: 0 },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem" },
  label: { fontSize: "0.8rem", fontWeight: "600", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" },
  input: { border: "1.5px solid", borderRadius: "10px", padding: "0.65rem 0.9rem", color: "#333", outline: "none", width: "100%", boxSizing: "border-box" },
  textarea: { border: "1.5px solid", borderRadius: "10px", padding: "0.65rem 0.9rem", color: "#333", outline: "none", resize: "none", width: "100%", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" },
  button: { color: "white", border: "none", borderRadius: "12px", fontWeight: "600", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", marginTop: "0.5rem" },
  loadingCard: { background: "white", borderRadius: "24px", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", textAlign: "center", zIndex: 1, width: "90%", maxWidth: "400px" },
  spinner: { fontSize: "3.5rem", animation: "spin 1.5s linear infinite", display: "block", marginBottom: "1rem" },
  loadingTitle: { fontSize: "1.3rem", margin: "0 0 0.5rem" },
  loadingText: { color: "#aaa", fontSize: "0.9rem", margin: "0 0 1.5rem" },
  dots: { display: "flex", gap: "6px", justifyContent: "center" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", animation: "pulse 0.8s ease-in-out infinite", display: "inline-block" },
  cardTop: { textAlign: "center", marginBottom: "1.5rem" },
  envelope: { fontSize: "3rem", marginBottom: "0.5rem" },
  cardTitle: { fontWeight: "700", margin: "0 0 0.25rem" },
  cardSubtitle: { fontSize: "0.85rem", margin: 0 },
  divider: { height: "1px", margin: "1.5rem 0" },
  mensagemBox: { borderRadius: "16px" },
  mensagemText: { margin: 0, whiteSpace: "pre-line", textAlign: "center" },
  cardFooter: { textAlign: "center", margin: "1.5rem 0 0" },
  footerText: { margin: 0 },
  actions: { display: "flex", gap: "0.6rem", marginTop: "1.5rem", flexWrap: "wrap" },
  btnSecondary: { flex: 1, minWidth: "80px", border: "1.5px solid", background: "white", borderRadius: "12px", padding: "0.85rem 0.5rem", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer" },
  btnPrimary: { flex: 2, minWidth: "80px", color: "white", border: "none", borderRadius: "12px", padding: "0.85rem 0.5rem", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer" },
  btnWhatsapp: { flex: 2, minWidth: "80px", background: "linear-gradient(135deg, #25d366, #128c7e)", color: "white", border: "none", borderRadius: "12px", padding: "0.85rem 0.5rem", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 15px rgba(37,211,102,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem" },
  btnSalvar: { flex: 2, minWidth: "80px", background: "white", border: "1.5px solid", borderRadius: "12px", padding: "0.85rem 0.5rem", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease" },
  btnSalvarLoading: { background: "#f5f5f5", cursor: "not-allowed", opacity: 0.75 },
  btnSalvarSucesso: { background: "#e8f5e9", color: "#2e7d32", borderColor: "#a5d6a7" },
  btnSalvarErro: { background: "#fce4ec", color: "#c62828", borderColor: "#ef9a9a" },
};
