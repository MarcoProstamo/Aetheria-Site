import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function ExperienceLogPage() {
  const [log, setLog] = useState([]);
  const [newEntry, setNewEntry] = useState({
    session: "",
    quantity: "",
    description: "",
    extra: "",
  });

  useEffect(() => {
    const q = query(collection(db, "experienceLog"), orderBy("session"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLog(items);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (
      !newEntry.session.trim() ||
      !newEntry.quantity ||
      !newEntry.description.trim()
    ) {
      alert("Compila almeno Sessione, Quantità e Descrizione.");
      return;
    }

    const entry = {
      ...newEntry,
      id: Date.now(),
      quantity: parseInt(newEntry.quantity),
    };
    await addDoc(collection(db, "experienceLog"), entry);
    setNewEntry({ session: "", quantity: "", description: "", extra: "" });
  };

  return (
    <div className="container">
      <h1 className="text-semibold text-dark mt-5 mb-3">
        Cronologia Esperienza
      </h1>

      <div className="row mb-4">
        <div className="col">
          <input
            name="session"
            placeholder="Session"
            className="form-control"
            value={newEntry.session}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            name="quantity"
            placeholder="Quantity"
            type="number"
            className="form-control"
            value={newEntry.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            name="description"
            placeholder="Description"
            className="form-control"
            value={newEntry.description}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            name="extra"
            placeholder="Extra"
            className="form-control"
            value={newEntry.extra}
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <button onClick={handleAdd} className="btn btn-success">
            Aggiungi
          </button>
        </div>
      </div>

      <table className="table table-bordered table-striped mb-5">
        <thead className="table-dark">
          <tr>
            <th>Session</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Extra</th>
          </tr>
        </thead>
        <tbody>
          {log.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.session}</td>
              <td>{entry.quantity}</td>
              <td>{entry.description}</td>
              <td>{entry.extra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
