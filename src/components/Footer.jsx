export default function Footer() {
  return (
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#3f51b5" }}
    >
      <div className="container">
        <section className="mt-4 mb-3">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
                Solo i Clown Certificati possono accedere a questo sito.
                Proseguendo, accetti senza riserve di fare Popi Popi ad ogni
                passo, tirare 1d20 ogni ora per evitare di inciampare su una
                banana e onorare il sacro codice del Naso Rosso.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <a
          className="text-white"
          target="_blank"
          href="https://www.youtube.com/watch?v=yWCIlRsxcIk"
        >
          Solo Clown Certificati
        </a>
      </section>
    </footer>
  );
}
