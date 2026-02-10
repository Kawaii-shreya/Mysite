export default function FinalMessage() {
  return (
    <div className="card pop">
      <div className="kicker">💌 Final Message</div>

      <h1 className="title">Well bhooooonduuuuuuuu !!!</h1>

      <p className="text" style={{ marginTop: 10 }}>
        Good to see yaa here !! Ab yanha tak panhuch gaye ho toh ek baat sunlo !!
        Kabhi sochna mat akele ho tum !! Main hun tumhare sath !! 🥰
      </p>

      <p className="text" style={{ marginTop: 10 }}>
        And well Jo bhi hoga hum dekhenge !! Naa waise haan ab jaldi jaldi jake{" "}
        <b>CHATS main I LOVE U MADAM JI</b> likho warna eise marungi !! 🤭
      </p>

      <p className="text" style={{ marginTop: 10 }}>
        Wellll see yaa soon babe !! And lastly !!
      </p>

      <p className="text" style={{ marginTop: 10, fontWeight: 900 }}>
        I love u Piggy !!
      </p>

      <div style={{ marginTop: 16 }}>
          <img src={`${import.meta.env.BASE_URL}love.png`}
          alt="love"
          style={{
            width: "min(360px, 85vw)",
            borderRadius: 22,
            border: "1px solid rgba(255, 80, 140, 0.35)",
            boxShadow: "0 20px 70px rgba(0,0,0,0.25)",
          }}
        />
      </div>
    </div>
  );
}
