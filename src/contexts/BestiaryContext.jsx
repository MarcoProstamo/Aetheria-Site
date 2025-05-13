import { useEffect, useState, createContext, useContext } from "react";

// # Consumer
const BestiaryContext = createContext();
export const useBestiaryContext = () => useContext(BestiaryContext);

// # Utility functions
function computeDamageStats(monsters) {
  const damageTypes = [
    "acid",
    "bludgeoning",
    "cold",
    "fire",
    "force",
    "lightning",
    "necrotic",
    "piercing",
    "poison",
    "psychic",
    "radiant",
    "slashing",
    "thunder",
  ];

  const statsMap = Object.fromEntries(
    damageTypes.map((type) => [type, { type, resist: 0, immune: 0 }])
  );

  for (const monster of monsters) {
    const resistances = monster.resist || [];
    const immunities = monster.immune || [];

    for (const type of resistances)
      if (statsMap[type]) statsMap[type].resist += 1;

    for (const type of immunities)
      if (statsMap[type]) statsMap[type].immune += 1;
  }

  return Object.values(statsMap).sort((a, b) => a.type.localeCompare(b.type));
}

function computeConditionStats(monsters) {
  const conditions = [
    "blinded",
    "charmed",
    "deafened",
    "disease",
    "exhaustion",
    "frightened",
    "grappled",
    "incapacitated",
    "invisible",
    "paralyzed",
    "petrified",
    "poisoned",
    "prone",
    "restrained",
    "stunned",
    "unconscious",
  ];

  const statsMap = Object.fromEntries(
    conditions.map((type) => [type, { type, immune: 0 }])
  );

  for (const monster of monsters) {
    const immunities = monster.conditionImmune || [];

    for (const type of immunities)
      if (statsMap[type]) statsMap[type].immune += 1;
  }

  return Object.values(statsMap).sort((a, b) => a.type.localeCompare(b.type));
}

// # Provider
export function BestiaryContextProvider({ children }) {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    const loadMonsters = async () => {
      const books = [
        { url: "/data/bestiary-xmm.json", source: "MM2024" },
        { url: "/data/bestiary-xdmg.json", source: "DMG2024" },
        { url: "/data/bestiary-xphb.json", source: "PHB2024" },
      ];

      const allMonsters = [];

      for (const book of books) {
        const res = await fetch(book.url);
        const data = await res.json();
        const enriched = data.monster.map((m) => ({
          ...m,
          source: book.source,
        }));
        allMonsters.push(...enriched);
      }

      setMonsters(allMonsters);
    };

    loadMonsters();
  }, []);

  const damageTypes = computeDamageStats(monsters);
  const conditionTypes = computeConditionStats(monsters);

  return (
    <BestiaryContext.Provider value={{ monsters, damageTypes, conditionTypes }}>
      {children}
    </BestiaryContext.Provider>
  );
}
