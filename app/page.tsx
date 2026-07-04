"use client";

import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════
   SUMAN PAUDEL — TERMINAL MANIFESTO
   CRT / phosphor / hacker aesthetic
   ══════════════════════════════════════════════ */

const NAME_LINES = [
  { prompt: "$ whoami", output: "suman paudel" },
  { prompt: "$ cat /etc/role", output: "voice_ai_engineer · ml/ai · infrastructure" },
  { prompt: "$ uptime", output: "5 years · 2000+ calls/day · 99.9% reliability" },
];

const STATS = [
  { label: "LATENCY", value: "<900ms", bar: 0.92 },
  { label: "UPTIME", value: "99.9%", bar: 0.999 },
  { label: "CALLS/DAY", value: "2000+", bar: 0.85 },
  { label: "ACCURACY", value: "95%", bar: 0.95 },
];

const PRINCIPLES = [
  {
    id: "01", file: "01_latency_is_everything.md", tag: "LATENCY IS EVERYTHING", theme: "warm",
    title: "Every millisecond is a conversation lost",
    lines: [
      "> In real-time voice AI, latency isn't a metric — it's the difference",
      "> between a natural conversation and an awkward silence.",
      "> ",
      "> I architected self-hosted LiveKit infrastructure on AWS achieving",
      "> <900ms end-to-end latency, orchestrating 2000+ daily calls at",
      "> 99.9% uptime. Because humans don't wait for machines.",
    ],
    metrics: [
      { k: "p50_latency_ms", v: "871" },
      { k: "p99_latency_ms", v: "1.2k" },
      { k: "concurrent_calls", v: "120" },
    ],
  },
  {
    id: "02", file: "02_scale_relentlessly.md", tag: "SCALE RELENTLESSLY", theme: "warm",
    title: "One call is a demo. Two thousand is a system.",
    lines: [
      "> Built end-to-end voice AI backend via multi-channel SIP trunking",
      "> across Twilio, Plivo, Telecimi, Acefone with automatic failover.",
      "> ",
      "> Engineered resilient call routing with intelligent retry mechanisms,",
      "> reducing failed call rate by 60%. Automated 3000+ monthly healthcare",
      "> interactions.",
    ],
    metrics: [
      { k: "daily_calls", v: "2000+" },
      { k: "failed_rate_delta", v: "-60%" },
      { k: "sip_providers", v: "4" },
    ],
  },
  {
    id: "03", file: "03_own_the_stack.md", tag: "OWN THE STACK", theme: "warm",
    title: "Open source is not a compromise. It's a weapon.",
    lines: [
      "> Integrated open-source Qwen3 TTS with LiveKit via custom Alibaba",
      "> Cloud deployment, reducing TTS costs by 70% while maintaining",
      "> natural speech quality.",
      "> ",
      "> When you own every layer, you control every outcome.",
    ],
    metrics: [
      { k: "tts_cost_delta", v: "-70%" },
      { k: "self_hosted", v: "true" },
      { k: "vendor_lock", v: "none" },
    ],
  },
  {
    id: "04", file: "04_impact_over_output.md", tag: "IMPACT OVER OUTPUT", theme: "warm",
    title: "Measure in outcomes, not deployments",
    lines: [
      "> Improved patient medication adherence by 40% through proactive",
      "> automated refill reminders. Reduced manual claim processing time",
      "> by 5+ hours daily.",
      "> ",
      "> 92% query accuracy on healthcare document retrieval.",
      "> The code is invisible — the impact is what patients feel.",
    ],
    metrics: [
      { k: "adherence_delta", v: "+40%" },
      { k: "hours_saved_daily", v: "5+" },
      { k: "query_accuracy", v: "92%" },
    ],
  },
  {
    id: "05", file: "05_inference_is_infra.md", tag: "INTELLIGENCE AT INFERENCE", theme: "warm",
    title: "Serve models like you serve users — fast and reliable",
    lines: [
      "> Architected a production-grade open-source LLM inference platform",
      "> using vLLM, serving GPT-OSS-20B, Qwen3-4B embeddings, and",
      "> Qwen3-VL-8B.",
      "> ",
      "> 5 concurrent inference jobs on a single NVIDIA H100, fully",
      "> compliant with data-sovereignty requirements.",
    ],
    metrics: [
      { k: "gpu", v: "H100" },
      { k: "concurrent_jobs", v: "5" },
      { k: "engine", v: "vLLM" },
    ],
  },
  {
    id: "06", file: "06_retrieval_is_reasoning.md", tag: "RETRIEVAL IS REASONING", theme: "cool",
    title: "The best answer is the one grounded in truth",
    lines: [
      "> Designed RAG + SQL agent pipelines solving large-scale manufacturing",
      "> analytics with LangGraph, enabling unified reasoning across multi-",
      "> file documents and structured databases.",
      "> ",
      "> 95% retrieval accuracy. 78% on complex multi-step reasoning.",
    ],
    metrics: [
      { k: "retrieval_acc", v: "95%" },
      { k: "multi_step", v: "78%" },
      { k: "stack", v: "LangGraph" },
    ],
  },
  {
    id: "07", file: "07_fine_tune_fearlessly.md", tag: "TEACH THE MACHINE TO SEE", theme: "cool",
    title: "When pre-trained falls short, fine-tune fearlessly",
    lines: [
      "> Fine-tuned state-of-the-art OCR and Vision-Language models —",
      "> DeepSeek OCR, PaddleOCR, OLMO-v2, Qwen3-8B — for banking document",
      "> understanding.",
      "> ",
      "> 1000+ labeled samples via Gemini 3.0 as teacher. SFT + DPO pushed",
      "> domain-specific accuracy from 84% → 95%.",
    ],
    metrics: [
      { k: "acc_before", v: "84%" },
      { k: "acc_after", v: "95%" },
      { k: "technique", v: "SFT+DPO" },
    ],
  },
  {
    id: "08", file: "08_compete_to_learn.md", tag: "COMPETE TO LEARN", theme: "cool",
    title: "The arena sharpens the blade",
    lines: [
      "> Won CHIPSAL @ COLING 2025 — Shared Task on Hate Speech Target",
      "> Identification in Devanagari script.",
      "> ",
      "> Research paper accepted at ACL — the world's premier NLP conference.",
      "> Competition isn't about winning — it's about pushing the boundary",
      "> of what you know into territory that does not yet exist.",
    ],
    metrics: [
      { k: "competition", v: "1st place" },
      { k: "venue", v: "ACL 2025" },
      { k: "script", v: "Devanagari" },
    ],
  },
];

/* ── Typewriter hook ── */
function useTypewriter(lines: typeof NAME_LINES, speed = 38) {
  const [typed, setTyped] = useState<{ prompt: string; output: string }[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let li = 0, ci = 0, phase: "prompt" | "pause" | "output" = "prompt";
    const current: { prompt: string; output: string }[] = lines.map(() => ({ prompt: "", output: "" }));
    setTyped([...current]);

    const tick = () => {
      if (li >= lines.length) { setDone(true); return; }
      const line = lines[li]!;
      if (phase === "prompt") {
        if (ci <= line.prompt.length) {
          current[li]!.prompt = line.prompt.slice(0, ci);
          setTyped([...current]);
          ci++;
        } else {
          phase = "pause"; ci = 0;
          setTimeout(tick, 200); return;
        }
      } else if (phase === "pause") {
        phase = "output"; ci = 0;
      } else {
        if (ci <= line.output.length) {
          current[li]!.output = line.output.slice(0, ci);
          setTyped([...current]);
          ci++;
        } else {
          li++; ci = 0; phase = "prompt";
          setTimeout(tick, 180); return;
        }
      }
      setTimeout(tick, speed);
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [lines, speed]);

  return { typed, done };
}

export default function TerminalManifesto() {
  const { typed, done } = useTypewriter(NAME_LINES);
  const matrixRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  /* ── Matrix rain background ── */
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, cols = 0;
    let drops: number[] = [];
    const charset = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\=+-*&^%$#@!";
    const fontSize = 14;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / fontSize);
      drops = new Array(cols).fill(0).map(() => Math.random() * -50);
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    function draw(now: number) {
      if (now - last > 55) {
        last = now;
        ctx!.fillStyle = "rgba(5, 8, 6, 0.08)";
        ctx!.fillRect(0, 0, w, h);
        ctx!.font = `${fontSize}px "JetBrains Mono", monospace`;
        for (let i = 0; i < cols; i++) {
          const ch = charset[Math.floor(Math.random() * charset.length)]!;
          const x = i * fontSize;
          const y = drops[i]! * fontSize;
          // Head bright
          ctx!.fillStyle = "rgba(140, 255, 180, 0.75)";
          ctx!.fillText(ch, x, y);
          // Trail
          if (Math.random() > 0.975) {
            ctx!.fillStyle = "rgba(70, 200, 130, 0.35)";
            ctx!.fillText(ch, x, y - fontSize);
          }
          if (y > h && Math.random() > 0.965) drops[i] = 0;
          drops[i]!++;
        }
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Scroll progress + reveal observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal, .principle").forEach((el) => obs.observe(el));

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (progressRef.current) {
        const filled = Math.floor(p * 40);
        progressRef.current.textContent =
          "[" + "█".repeat(filled) + "░".repeat(40 - filled) + "] " + Math.floor(p * 100).toString().padStart(3, "0") + "%";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <canvas id="matrix-bg" ref={matrixRef} />
      <div className="scanlines" />
      <div className="vignette" />

      {/* Top status bar */}
      <div className="topbar">
        <span className="topbar-left">suman@paudel:~$</span>
        <span className="topbar-mid" ref={progressRef}>[░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 000%</span>
        <span className="topbar-right">● REC  {new Date().getFullYear()}</span>
      </div>

      <main id="content">
        {/* ═══════ HERO ═══════ */}
        <section className="hero">
          <div className="terminal-window">
            <div className="tw-chrome">
              <span className="tw-dot red" />
              <span className="tw-dot yellow" />
              <span className="tw-dot green" />
              <span className="tw-title">— suman@paudel:~/manifesto —</span>
            </div>
            <div className="tw-body">
              {typed.map((t, i) => (
                <div className="tw-line" key={i}>
                  {t.prompt && (
                    <div className="tw-cmd">
                      <span className="tw-ps1">suman@paudel:~$</span> <span className="tw-cmdtext">{t.prompt.replace(/^\$ /, "")}</span>
                    </div>
                  )}
                  {t.output && <div className="tw-out">{t.output}</div>}
                </div>
              ))}
              {!done && <span className="tw-cursor">▊</span>}
            </div>
          </div>

          {/* Stats bar */}
          <div className="stats-row reveal">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-bar">
                  <div className="stat-bar-fill" style={{ width: `${s.bar * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-hint reveal">
            <span>$ scroll --down --to=manifesto</span>
            <span className="blink">▼</span>
          </div>
        </section>

        {/* ═══════ PREAMBLE ═══════ */}
        <section className="preamble reveal">
          <div className="preamble-prompt">suman@paudel:~$ cat README.md</div>
          <div className="preamble-body">
            <p>
              I build systems that <span className="hl">listen</span>, <span className="hl">understand</span>, and <span className="hl">respond</span> — at scale.
            </p>
            <p>
              Five years of relentless pursuit across ML, AI, and voice engineering.
              From training models to orchestrating 2000+ daily calls with sub-second latency.
              From fine-tuning vision models to winning international NLP competitions.
            </p>
            <p className="preamble-signoff">
              This is my manifesto — the principles that drive every system I build.
            </p>
          </div>
        </section>

        {/* ═══════ PART I ═══════ */}
        <section className="part-header reveal">
          <div className="part-prompt">suman@paudel:~$ cd manifesto/part_i &amp;&amp; ls -la</div>
          <h2 className="part-title">{"//"} PART I — THE FOUNDATION</h2>
          <p className="part-sub">what I optimize for when building voice AI systems</p>
        </section>

        {PRINCIPLES.slice(0, 5).map((p) => (
          <PrincipleBlock key={p.id} {...p} />
        ))}

        {/* ═══════ PART II ═══════ */}
        <section className="part-header cool reveal">
          <div className="part-prompt">suman@paudel:~$ cd ../part_ii &amp;&amp; ls -la</div>
          <h2 className="part-title">{"//"} PART II — THE CRAFT</h2>
          <p className="part-sub">how I push boundaries when the pre-trained falls short</p>
        </section>

        {PRINCIPLES.slice(5).map((p) => (
          <PrincipleBlock key={p.id} {...p} />
        ))}

        {/* ═══════ CLOSING ═══════ */}
        <section className="closing reveal">
          <div className="closing-prompt">suman@paudel:~$ echo $MISSION</div>
          <h2 className="closing-title">
            {">"} let&apos;s build<br />what matters.
          </h2>
          <p className="closing-body">
            The future belongs to those who ship outcomes, not outputs.<br />
            If you&apos;re building something that listens — I want to help.
          </p>
          <div className="closing-commands">
            <a href="mailto:dastonsuman1997@gmail.com" className="cmd-link">
              $ mail <span>suman@paudel</span>
            </a>
            <a href="https://linkedin.com/in/suman-paudel" target="_blank" rel="noopener noreferrer" className="cmd-link">
              $ open <span>linkedin.com/in/suman-paudel</span>
            </a>
            <a href="https://github.com/p-sumann" target="_blank" rel="noopener noreferrer" className="cmd-link">
              $ git clone <span>github.com/p-sumann</span>
            </a>
          </div>
          <div className="closing-exit">
            <span className="tw-ps1">suman@paudel:~$</span> exit<span className="blink">▊</span>
          </div>
        </section>
      </main>
    </>
  );
}

/* ── Principle block component ── */
function PrincipleBlock({
  id, file, tag, theme, title, lines, metrics,
}: {
  id: string; file: string; tag: string; theme: string; title: string;
  lines: string[];
  metrics: { k: string; v: string }[];
}) {
  return (
    <article className={`principle ${theme}`}>
      <div className="p-head">
        <span className="p-id">[{id}]</span>
        <span className="p-cmd">suman@paudel:~$ cat manifesto/{file}</span>
      </div>
      <div className="p-box">
        <div className="p-tag">── {tag} ──</div>
        <h3 className="p-title">{title}</h3>
        <div className="p-body">
          {lines.map((l, i) => (
            <div className="p-line" key={i}>{l || "\u00a0"}</div>
          ))}
        </div>
        <div className="p-metrics">
          {metrics.map((m) => (
            <div className="p-metric" key={m.k}>
              <span className="pm-k">{m.k}</span>
              <span className="pm-eq">=</span>
              <span className="pm-v">{m.v}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
