import CampoClownato from "../components/CampoClownato";

export default function HomePage() {
  return (
    <section>
      <div className="container my-5">
        <div className="row">
          <div className="col-6">
            <div className="text-semibold text-danger mt-5 mb-3">
              <h1>Il Master ti sta annoiando?</h1>
              <h4>Ignoralo e gioca a Campo Clownato!</h4>
            </div>
            <p className="text-light text-semibold">
              Campo Clownato funziona esattamente come Campo Fiorito, ma come mi
              sembra superfluo specificare è più bello e divertente.
              <br />
              <br />
              Se nun te sta' buono, t'ai verè co' Ciro hai capit? T'ho sconsigl.
            </p>
          </div>
          <div className="col-6">
            <CampoClownato />
          </div>
        </div>
      </div>
    </section>
  );
}
