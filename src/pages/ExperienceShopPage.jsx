import { useShopContext } from "../contexts/ShopContext";

export default function ExperienceShopPage() {
  const { shopEntries } = useShopContext();

  return (
    <section className="d-flex justify-content-center align-items-center my-5">
      <div className="container">
        <h1 className="text-semibold text-dark mt-5 mb-3">
          Negozio dell'Esperienza
        </h1>

        <table className="table table-bordered table-striped mb-5">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Costo</th>
              <th>Descrizione</th>
            </tr>
          </thead>
          <tbody>
            {shopEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.category}</td>
                <td>{entry.price}</td>
                <td>{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
