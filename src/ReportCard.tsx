import { useEffect, useMemo, useState } from "react";

type Trait = {
  label: string;
  score: number; // 1-10
};

type Props = {
  onDone?: () => void;
};

function clamp10(n: number) {
  return Math.max(1, Math.min(10, n));
}

export default function ReportCard({ onDone }: Props) {
  const traits = useMemo<Trait[]>(
    () => [
      { label: "Adorable", score: 10 },
      { label: "Handsome", score: 5 },
      { label: "Kind", score: 10 },
      { label: "Anger", score: 7 },
      { label: "Whim", score: 10 },
      { label: "Lovely", score: 10 },
    ],
    []
  );

  const [rolling, setRolling] = useState<Record<string, number>>({});
  const [doneKeys, setDoneKeys] = useState<Record<string, boolean>>({});
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    traits.forEach((t, i) => {
      const startDelay = 200 + i * 180;

      const startTimer = window.setTimeout(() => {
        const interval = window.setInterval(() => {
          setRolling((prev) => {
            const curr = prev[t.label] ?? 1;
            const next = curr >= 10 ? 1 : curr + 1;
            return { ...prev, [t.label]: next };
          });
        }, 60);

        const stopAfter = 1100 + i * 180;
        const stopTimer = window.setTimeout(() => {
          window.clearInterval(interval);

          setRolling((prev) => ({ ...prev, [t.label]: clamp10(t.score) }));

          setDoneKeys((prev) => {
            const next = { ...prev, [t.label]: true };
            if (Object.keys(next).length === traits.length) {
              window.setTimeout(() => setAllDone(true), 400);
            }
            return next;
          });
        }, stopAfter);

        timers.push(stopTimer);
      }, startDelay);

      timers.push(startTimer);
    });

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [traits]);

  useEffect(() => {
    if (!allDone) return;
    const t = window.setTimeout(() => {
      onDone?.();
    }, 30_000);
    return () => window.clearTimeout(t);
  }, [allDone, onDone]);

  return (
    <div className="card pop">
      <div className="kicker">📋 Report Card</div>
      <h1 className="title">Your Character Stats 😌✨</h1>
      <p className="text soft">Numbers will roll 1 → 10 and lock in 💖</p>

      <div className="statsGrid" style={{ marginTop: 16 }}>
        {traits.map((t) => {
          const val = rolling[t.label] ?? 1;
          const done = !!doneKeys[t.label];

          return (
            <div key={t.label} className="statRow">
              <div className="statLabel">{t.label}</div>

              <div className="barWrap">
                <div
                  className={`barFill ${done ? "done" : ""}`}
                  style={{ width: `${(val / 10) * 100}%` }}
                />
              </div>

              <div className={`statValue ${done ? "popNum" : ""}`}>{val}</div>
            </div>
          );
        })}
      </div>

      <p className="text soft" style={{ marginTop: 16, fontSize: "0.95rem" }}>
        (Calculating… 😌💖)
      </p>
    </div>
  );
}
