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
        // Official Books
        { url: "/data/bestiary-xdmg.json", source: "DMG2024" },
        { url: "/data/bestiary-xmm.json", source: "MM2024" },
        { url: "/data/bestiary-xphb.json", source: "PHB2024" },
        // Test Data
        { url: "/test/bestiary-aatm.json", source: "AATM" },
        { url: "/test/bestiary-ai.json", source: "AI" },
        { url: "/test/bestiary-aitfr-dn.json", source: "AITFR-DN" },
        { url: "/test/bestiary-aitfr-fcd.json", source: "AITFR-FCD" },
        { url: "/test/bestiary-aitfr-isf.json", source: "AITFR-ISF" },
        { url: "/test/bestiary-aitfr-thp.json", source: "AITFR-THP" },
        { url: "/test/bestiary-awm.json", source: "AWM" },
        { url: "/test/bestiary-bam.json", source: "BAM" },
        { url: "/test/bestiary-bgdia.json", source: "BGDIA" },
        { url: "/test/bestiary-bgg.json", source: "BGG" },
        { url: "/test/bestiary-bmt.json", source: "BMT" },
        { url: "/test/bestiary-cm.json", source: "CM" },
        { url: "/test/bestiary-coa.json", source: "COA" },
        { url: "/test/bestiary-cos.json", source: "COS" },
        { url: "/test/bestiary-crcotn.json", source: "CRCOTN" },
        { url: "/test/bestiary-dc.json", source: "DC" },
        { url: "/test/bestiary-dip.json", source: "DIP" },
        { url: "/test/bestiary-ditlcot.json", source: "DITLCOT" },
        { url: "/test/bestiary-dmg.json", source: "DMG" },
        { url: "/test/bestiary-dod.json", source: "DOD" },
        { url: "/test/bestiary-dodk.json", source: "DODK" },
        { url: "/test/bestiary-dosi.json", source: "DOSI" },
        { url: "/test/bestiary-dsotdq.json", source: "DSOTDQ" },
        { url: "/test/bestiary-egw.json", source: "EGW" },
        { url: "/test/bestiary-erlw.json", source: "ERLW" },
        { url: "/test/bestiary-esk.json", source: "ESK" },
        { url: "/test/bestiary-ftd.json", source: "FTD" },
        { url: "/test/bestiary-ggr.json", source: "GGR" },
        { url: "/test/bestiary-ghloe.json", source: "GHLOE" },
        { url: "/test/bestiary-gos.json", source: "GOS" },
        { url: "/test/bestiary-gotsf.json", source: "GOTSF" },
        { url: "/test/bestiary-hat-tg.json", source: "HAT-TG" },
        { url: "/test/bestiary-hftt.json", source: "HFTT" },
        { url: "/test/bestiary-hol.json", source: "HOL" },
        { url: "/test/bestiary-hotdq.json", source: "HOTDQ" },
        { url: "/test/bestiary-idrotf.json", source: "IDROTF" },
        { url: "/test/bestiary-imr.json", source: "IMR" },
        { url: "/test/bestiary-jttrc.json", source: "JTTRC" },
        { url: "/test/bestiary-kftgv.json", source: "KFTGV" },
        { url: "/test/bestiary-kkw.json", source: "KKW" },
        { url: "/test/bestiary-llk.json", source: "LLK" },
        { url: "/test/bestiary-lmop.json", source: "LMOP" },
        { url: "/test/bestiary-lox.json", source: "LOX" },
        { url: "/test/bestiary-lr.json", source: "LR" },
        { url: "/test/bestiary-lrdt.json", source: "LRDT" },
        { url: "/test/bestiary-mabjov.json", source: "MABJOV" },
        { url: "/test/bestiary-mcv1sc.json", source: "MCV1SC" },
        { url: "/test/bestiary-mcv2dc.json", source: "MCV2DC" },
        { url: "/test/bestiary-mcv3mc.json", source: "MCV3MC" },
        { url: "/test/bestiary-mcv4ec.json", source: "MCV4EC" },
        { url: "/test/bestiary-mff.json", source: "MFF" },
        { url: "/test/bestiary-mgelft.json", source: "MGELFT" },
        { url: "/test/bestiary-mismv1.json", source: "MISMV1" },
        { url: "/test/bestiary-mm.json", source: "MM" },
        { url: "/test/bestiary-mot.json", source: "MOT" },
        { url: "/test/bestiary-mpmm.json", source: "MPMM" },
        { url: "/test/bestiary-mpp.json", source: "MPP" },
        { url: "/test/bestiary-mtf.json", source: "MTF" },
        { url: "/test/bestiary-nrh-ass.json", source: "NRH-ASS" },
        { url: "/test/bestiary-nrh-at.json", source: "NRH-AT" },
        { url: "/test/bestiary-nrh-avitw.json", source: "NRH-AVITW" },
        { url: "/test/bestiary-nrh-awol.json", source: "NRH-AWOL" },
        { url: "/test/bestiary-nrh-coi.json", source: "NRH-COI" },
        { url: "/test/bestiary-nrh-tcmc.json", source: "NRH-TCMC" },
        { url: "/test/bestiary-nrh-tlt.json", source: "NRH-TLT" },
        { url: "/test/bestiary-oota.json", source: "OOTA" },
        { url: "/test/bestiary-oow.json", source: "OOW" },
        { url: "/test/bestiary-pabtso.json", source: "PABTSO" },
        { url: "/test/bestiary-phb.json", source: "PHB" },
        { url: "/test/bestiary-pota.json", source: "POTA" },
        { url: "/test/bestiary-ps-a.json", source: "PS-A" },
        { url: "/test/bestiary-ps-d.json", source: "PS-D" },
        { url: "/test/bestiary-ps-i.json", source: "PS-I" },
        { url: "/test/bestiary-ps-k.json", source: "PS-K" },
        { url: "/test/bestiary-ps-x.json", source: "PS-X" },
        { url: "/test/bestiary-ps-z.json", source: "PS-Z" },
        { url: "/test/bestiary-qftis.json", source: "QFTIS" },
        { url: "/test/bestiary-rmbre.json", source: "RMBRE" },
        { url: "/test/bestiary-rot.json", source: "ROT" },
        { url: "/test/bestiary-rtg.json", source: "RTG" },
        { url: "/test/bestiary-sads.json", source: "SADS" },
        { url: "/test/bestiary-scc.json", source: "SCC" },
        { url: "/test/bestiary-sdw.json", source: "SDW" },
        { url: "/test/bestiary-skt.json", source: "SKT" },
        { url: "/test/bestiary-slw.json", source: "SLW" },
        { url: "/test/bestiary-tce.json", source: "TCE" },
        { url: "/test/bestiary-tdcsr.json", source: "TDCSR" },
        { url: "/test/bestiary-tftyp.json", source: "TFTYP" },
        { url: "/test/bestiary-toa.json", source: "TOA" },
        { url: "/test/bestiary-tob1-2023.json", source: "TOB1-2023" },
        { url: "/test/bestiary-tofw.json", source: "TOFW" },
        { url: "/test/bestiary-ttp.json", source: "TTP" },
        { url: "/test/bestiary-vd.json", source: "VD" },
        { url: "/test/bestiary-veor.json", source: "VEOR" },
        { url: "/test/bestiary-vgm.json", source: "VGM" },
        { url: "/test/bestiary-vrgr.json", source: "VRGR" },
        { url: "/test/bestiary-wbtw.json", source: "WBTW" },
        { url: "/test/bestiary-wdh.json", source: "WDH" },
        { url: "/test/bestiary-wdmm.json", source: "WDMM" },
        { url: "/test/bestiary-xge.json", source: "XGE" },
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
