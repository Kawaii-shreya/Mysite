import { useMemo, useState } from "react";

type Question = {
  prompt: string;
  answers: string[];
  placeholder?: string;
  hint?: string;
};

type Props = {
  onFinish: () => void; // required now
};

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function matchesAny(input: string, answers: string[]) {
  const x = normalize(input);
  return answers.some((a) => normalize(a) === x);
}

export default function Questions({ onFinish }: Props) {
  const questions = useMemo<Question[]>(
    () => [
      {
        prompt: "Q1) What is the first Nickname that Shreya gave you?",
        answers: ["piggy"],
        placeholder: "Type your answer…",
      },
      {
        prompt: "Q2) What food does Shreya love to eat?",
        answers: [
          "Chicken Katsu Donburi",
          "katsu donburi",
          "katsu don",
          "Chicken Katsu",
        ],
        placeholder: "Type the dish name…",
        hint: "Japanese 😌",
      },
      {
        prompt: "Q3) What name does Shreya love to be called?",
        answers: ["Samaira", "Sam","Madam ji"],
        placeholder: "Type the name…",
      },
      {
        prompt: "Q4) Which animal does Shreya loves to pet?",
        answers: ["cats", "cat"],
        placeholder: "Type the animal…",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passed, setPassed] = useState(false);

  const current = questions[index];

  function submit() {
    if (!matchesAny(input, current.answers)) {
      setError("Wrong 😌 Try again...");
      return;
    }

    setError(null);
    setInput("");

    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setPassed(true);
      window.setTimeout(() => onFinish(), 600);
    }
  }

  if (passed) {
    return (
      <div className="card pop">
        <div className="kicker">✅ Congrats!</div>
        <h1 className="title">You passed 😌💖</h1>
        <p className="text">Preparing your report card…</p>
      </div>
    );
  }

  return (
    <div className="card pop">
      <div className="kicker">🧩 Trial Questions</div>

      <h1 className="title">
        Question {index + 1} / {questions.length}
      </h1>

      <p className="text">{current.prompt}</p>

      {current.hint && (
        <p className="text soft" style={{ marginTop: 6, fontSize: "0.95rem" }}>
          Hint: {current.hint}
        </p>
      )}

      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={current.placeholder ?? "Type here…"}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          style={{
            padding: "12px 14px",
            borderRadius: 16,
            border: "1px solid rgba(255, 80, 140, 0.45)",
            background: "rgba(255,255,255,0.35)",
            outline: "none",
            fontSize: "1rem",
            color: "#5a1a2c",
          }}
        />

        <button className="btn primary" onClick={submit}>
          Submit ✅
        </button>

        {error && (
          <div className="toast" style={{ background: "rgba(255,255,255,0.55)" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
