type Props = {
  onProceed: () => void;
};

export default function Trial({ onProceed }: Props) {
  return (
    <div className="app">
      <div className="card pop">
        <div className="kicker">⚠️ Final Gate</div>

        <h1 className="title">Let’s go to the Trial 😌💖</h1>

        <p className="text">
          You’ve made it this far. Only the brave continue.
        </p>

        <button
          className="btn primary"
          onClick={onProceed}
          style={{ marginTop: 20 }}
        >
          Proceed ➜
        </button>

        <p
          className="text soft"
          style={{ marginTop: 18, fontSize: "0.95rem" }}
        >
          ⚠️ If you reached here, you can’t go back babe!!
        </p>
      </div>
    </div>
  );
}
