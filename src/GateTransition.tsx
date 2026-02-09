import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  durationMs?: number;
  onDone?: () => void;
};

export default function GateTransition({ open, durationMs = 900, onDone }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const t = setTimeout(() => {
        onDone?.();
        // keep it hidden after done
        setVisible(false);
      }, durationMs);
      return () => clearTimeout(t);
    }
  }, [open, durationMs, onDone]);

  if (!open && !visible) return null;

  return (
    <div className={`gateOverlay ${open ? "open" : ""}`}>
      <div className="gateDoor left" />
      <div className="gateDoor right" />
      <div className="gateGlow" />
      <div className="gateText">Opening the Trial… 💖</div>
    </div>
  );
}
