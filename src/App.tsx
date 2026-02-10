import { useEffect, useState } from "react";
import GateTransition from "./GateTransition";
import Trial from "./Trial";
import Questions from "./Questions";
import ReportCard from "./ReportCard";
import FinalMessage from "./FinalMessage";

type Screen = "intro" | "trial" | "questions" | "report" | "final";

const flowerEmojis = ["🌸", "🌺", "🌷", "💮", "🌹"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [noMsg, setNoMsg] = useState<string | null>(null);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const createFlower = () => {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.textContent =
        flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

      flower.style.left = Math.random() * 100 + "vw";
      flower.style.fontSize = 12 + Math.random() * 14 + "px";

      const fallDuration = 6 + Math.random() * 6;
      const swayDuration = 2 + Math.random() * 2;
      flower.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;

      document.body.appendChild(flower);
      setTimeout(() => flower.remove(), fallDuration * 1000);
    };

    const interval = window.setInterval(createFlower, 320);
    return () => window.clearInterval(interval);
  }, []);

  function onYes() {
    setNoMsg(null);
    setScreen("trial");
    setGateOpen(true);
  }

  function onNo() {
    setNoMsg(
      "Aww okay. But just so you know… you missed a golden opportunity 😌💅"
    );
    window.setTimeout(() => window.location.replace("about:blank"), 2500);
  }

  return (
    <div className="app">
      <GateTransition
        open={gateOpen}
        durationMs={950}
        onDone={() => setGateOpen(false)}
      />
      <div style={{ opacity: gateOpen ? 0 : 1, transition: "opacity 180ms ease" }}>
        {screen === "intro" && (
          <div className="card pop">
            <div className="kicker">💌 Private Entry</div>

            <h1 className="title">Welcome to a Page Written with Love 💖</h1>

            <p className="text">
              Are you the one destiny picked as Shreya’s life partner?
            </p>
            <p className="text soft">
              If yes… prove it. Step into the Trial 😌✨
            </p>

            <div className="btnRow">
              <button className="btn primary" onClick={onYes}>
                YES, I’m ready
              </button>
              <button className="btn" onClick={onNo}>
                No… I’m scared
              </button>
            </div>

            {noMsg && <div className="toast">{noMsg}</div>}
          </div>
        )}

        {screen === "trial" && (
          <Trial onProceed={() => setScreen("questions")} />
        )}

        {screen === "questions" && (
          <Questions onFinish={() => setScreen("report")} />
        )}

        {screen === "report" && (
          <ReportCard onDone={() => setScreen("final")} />
        )}

        {screen === "final" && <FinalMessage />}
      </div>
      <footer className="footer">
      <p className="footer-title">
      Made by <strong>Kawaii_Shreya</strong>
      </p>
      <p className="footer-sub">
        Free for Anyone to use ✨
      </p>
        <div className="footer-links">
        <span>Telegram: <strong>Kawaii_shreya</strong></span>
        <span>Discord: <strong>Kawaiishreya</strong></span>
        <span>Email: <strong>shrya2205@gmail.com</strong></span>
        </div>
      </footer>
    </div>
  );
}
