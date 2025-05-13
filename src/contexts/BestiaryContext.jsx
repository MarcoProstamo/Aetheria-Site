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

function getMonstersByType(monsters) {
  const monsterByType = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  monsters.forEach((monster) => {
    const type = monster.type;
    switch (type) {
      case "aberration":
        monsterByType[0].push(monster);
        break;
      case "beast":
        monsterByType[1].push(monster);
        break;
      case "celestial":
        monsterByType[2].push(monster);
        break;
      case "construct":
        monsterByType[3].push(monster);
        break;
      case "dragon":
        monsterByType[4].push(monster);
        break;
      case "elemental":
        monsterByType[5].push(monster);
        break;
      case "fey":
        monsterByType[6].push(monster);
        break;
      case "fiend":
        monsterByType[7].push(monster);
        break;
      case "giant":
        monsterByType[8].push(monster);
        break;
      case "humanoid":
        monsterByType[9].push(monster);
        break;
      case "monstrosity":
        monsterByType[10].push(monster);
        break;
      case "ooze":
        monsterByType[11].push(monster);
        break;
      case "plant":
        monsterByType[12].push(monster);
        break;
      case "undead":
        monsterByType[13].push(monster);
        break;
    }
  });
  return monsterByType;
}

// # Provider
export function BestiaryContextProvider({ children }) {
  const [monsters, setMonsters] = useState([]);

  const conditions = [
    "Blinded",
    "Charmed",
    "Deafened",
    "Disease",
    "Exhaustion",
    "Frightened",
    "Grappled",
    "Incapacitated",
    "Invisible",
    "Paralyzed",
    "Petrified",
    "Poisoned",
    "Prone",
    "Restrained",
    "Stunned",
    "Unconscious",
  ];

  const types = [
    "Aberration",
    "Beast",
    "Celestial",
    "Construct",
    "Dragon",
    "Elemental",
    "Fey",
    "Fiend",
    "Giant",
    "Humanoid",
    "Monstrosity",
    "Ooze",
    "Plant",
    "Undead",
  ];

  const damages = [
    "Acid",
    "Bludgeoning",
    "Cold",
    "Fire",
    "Force",
    "Lightning",
    "Necrotic",
    "Piercing",
    "Poison",
    "Psychic",
    "Radiant",
    "Slashing",
    "Thunder",
  ];

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
  const monstersByTypeRaw = getMonstersByType(monsters);
  const monstersByType = [
    { name: "Aberration", monsters: monstersByTypeRaw[0] },
    { name: "Beast", monsters: monstersByTypeRaw[1] },
    { name: "Celestial", monsters: monstersByTypeRaw[2] },
    { name: "Construct", monsters: monstersByTypeRaw[3] },
    { name: "Dragon", monsters: monstersByTypeRaw[4] },
    { name: "Elemental", monsters: monstersByTypeRaw[5] },
    { name: "Fey", monsters: monstersByTypeRaw[6] },
    { name: "Fiend", monsters: monstersByTypeRaw[7] },
    { name: "Giant", monsters: monstersByTypeRaw[8] },
    { name: "Humanoid", monsters: monstersByTypeRaw[9] },
    { name: "Monstrosity", monsters: monstersByTypeRaw[10] },
    { name: "Ooze", monsters: monstersByTypeRaw[11] },
    { name: "Plant", monsters: monstersByTypeRaw[12] },
    { name: "Undead", monsters: monstersByTypeRaw[13] },
  ];

  return (
    <BestiaryContext.Provider
      value={{
        monsters,
        damageTypes,
        conditionTypes,
        conditions,
        types,
        monstersByType,
        damages,
      }}
    >
      {children}
    </BestiaryContext.Provider>
  );
}
