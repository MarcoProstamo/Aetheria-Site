import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ExperienceContext = createContext();

export function useExperience() {
  return useContext(ExperienceContext);
}

export function ExperienceProvider({ children }) {
  const [log, setLog] = useState([]);
  const [totalExp, setTotalExp] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "experienceLog"), orderBy("session"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLog(items);
      setTotalExp(
        items.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0)
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <ExperienceContext.Provider value={{ log, totalExp }}>
      {children}
    </ExperienceContext.Provider>
  );
}
