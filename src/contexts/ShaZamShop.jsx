import { createContext, useContext } from "react";

// # Consumer
const ShopContext = createContext();
export const useShopContext = () => useContext(ShopContext);

// # Provider
export function ShopContextProvider({ children }) {
  const entries = [
    {
      id: 1,
      name: "Ability Score Improvement",
      icon: "✨",
      option: "✨",
      category: "Feat",
      prerequisite: "Lvl. 4",
      price: 3000,
      description:
        "Increase an Ability Score by 2 or Two Abilities Score by 1 (max 20)",
    },
    {
      id: 2,
      name: "Attunement Slot",
      icon: "🔮",
      option: "🔮",
      category: "Gift",
      prerequisite: "—",
      price: 10000,
      description: "Gain an Extra Attunement Slot",
    },
    {
      id: 3,
      name: "Popium Popis",
      icon: "🤡",
      option: "🤡",
      category: "Clown",
      prerequisite: "—",
      price: -1,
      description: "Sei un Clown",
    },
    {
      id: 4,
      name: "Customized Feature",
      icon: "🎨",
      option: "🎨",
      category: "Gift",
      prerequisite: "Lvl. 5",
      price: 25000,
      description: "Create a Customized Feature (max 1)",
    },
    {
      id: 5,
      name: "Epic Ability Score Improvement",
      icon: "🌟",
      option: "🌟",
      category: "Epic Feat",
      prerequisite: "Lvl. 8, Selected Stat 20+",
      price: 6000,
      description:
        "Increase an Ability Score by 2 or Two Abilities Score by 1 (max 30)",
    },
    {
      id: 6,
      name: "Epic Boon",
      icon: "🔥",
      option: "🔥",
      category: "Epic Feat",
      prerequisite: "Selected Boon Prer.",
      price: 6000,
      description: "Gain an Epic Boon Feat",
    },
    {
      id: 7,
      name: "Expertise",
      icon: "🎯",
      option: "🎯",
      category: "Proficiency",
      prerequisite: "Selected Skill Prof.",
      price: 2500,
      description: "Gain Expertise with a Skill",
    },
    {
      id: 8,
      name: "Extra Archetype",
      icon: "♟️",
      option: "♟️",
      category: "Gift",
      prerequisite: "Selected Class Lvl. 3",
      price: 10000,
      description: "Gain an Additional Archetype",
    },
    {
      id: 9,
      name: "Feature From Another Class",
      icon: "🌀",
      option: "🌀",
      category: "Gift",
      prerequisite: "Twice the Feature Lvl. in Main Class",
      price: 15000,
      description: "Gain a Feature From Another Class",
    },
    {
      id: 10,
      name: "Generic Feat",
      icon: "✨",
      option: "✨",
      category: "Feat",
      prerequisite: "Selected Feat Prer.",
      price: 3000,
      description: "Gain a General Feat",
    },
    {
      id: 11,
      name: "Legendary Resistance",
      icon: "🛡️",
      option: "🛡️",
      category: "Gift",
      prerequisite: "—",
      price: 7500,
      description:
        "Automatically Succeed on a Failed Save Once per Day (max 6/D)",
    },
    {
      id: 12,
      name: "Popis Popis",
      icon: "🤡",
      option: "🤡",
      category: "Clown",
      prerequisite: "—",
      price: -1,
      description: "Sei un Clown",
    },
    {
      id: 13,
      name: "Language",
      icon: "🗣️",
      option: "🗣️",
      category: "Proficiency",
      prerequisite: "—",
      price: 1000,
      description: "Learn One Standard, Rare or Secret Language",
    },
    {
      id: 14,
      name: "Proficiency",
      icon: "🧰",
      option: "🧰",
      category: "Proficiency",
      prerequisite: "—",
      price: 1000,
      description: "Gain Proficiency with a Skill, Weapon, Tool or Armor",
    },
    {
      id: 15,
      name: "Level Up",
      icon: "⬆️",
      option: "⬆️",
      category: "Gift",
      prerequisite: "—",
      price: null,
      description: "Gain a Level",
    },
  ];

  return (
    <ShopContext.Provider value={entries}>{children}</ShopContext.Provider>
  );
}
