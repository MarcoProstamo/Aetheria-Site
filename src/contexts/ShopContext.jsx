import { createContext, useContext } from "react";

// # Consumer
const ShopContext = createContext();
export const useShopContext = () => useContext(ShopContext);

// # Provider
export function ShopContextProvider({ children }) {
  const shopEntries = [
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
      name: "Origin Feat",
      icon: "✨",
      option: "✨",
      category: "Feat",
      prerequisite: "-",
      price: 1000,
      description: "Gain an Origin Feat",
    },
    {
      id: 3,
      name: "Expertise",
      icon: "🎯",
      option: "🎯",
      category: "Proficiency",
      prerequisite: "Selected Skill Prof.",
      price: 2500,
      description: "Gain Expertise with a Skill",
    },
    {
      id: 4,
      name: "Generic Feat",
      icon: "✨",
      option: "✨",
      category: "Feat",
      prerequisite: "Selected Feat Prer.",
      price: 3000,
      description: "Gain a General Feat",
    },
    {
      id: 5,
      name: "Language",
      icon: "🗣️",
      option: "🗣️",
      category: "Proficiency",
      prerequisite: "—",
      price: 1000,
      description: "Learn One Standard, Rare or Secret Language",
    },
    {
      id: 6,
      name: "Proficiency",
      icon: "🧰",
      option: "🧰",
      category: "Proficiency",
      prerequisite: "—",
      price: 1000,
      description: "Gain Proficiency with a Skill, Weapon, Tool or Armor",
    },
  ];

  const wheelEntries = [
    {
      id: 1,
      name: "Attunement Slot",
      icon: "🔮",
      option: "🔮",
      category: "Gift",
      prerequisite: "—",
      price: null,
      description: "Gain an Extra Attunement Slot",
    },
    {
      id: 2,
      name: "Epic Ability Score Improvement",
      icon: "🌟",
      option: "🌟",
      category: "Epic Feat",
      prerequisite: "Lvl. 8, Selected Stat 20+",
      price: null,
      description:
        "Increase an Ability Score by 2 or Two Abilities Score by 1 (max 30)",
    },
    {
      id: 3,
      name: "Epic Boon",
      icon: "🔥",
      option: "🔥",
      category: "Epic Feat",
      prerequisite: "Selected Boon Prer.",
      price: null,
      description: "Gain an Epic Boon Feat",
    },
    {
      id: 4,
      name: "Extra Archetype",
      icon: "♟️",
      option: "♟️",
      category: "Gift",
      prerequisite: "Selected Class Lvl. 3",
      price: null,
      description: "Gain an Additional Archetype",
    },
    {
      id: 5,
      name: "Legendary Resistance",
      icon: "🛡️",
      option: "🛡️",
      category: "Gift",
      prerequisite: "—",
      price: null,
      description:
        "Automatically Succeed on a Failed Save Once per Day (max 6/D)",
    },
    {
      id: 6,
      name: "Level Up",
      icon: "⬆️",
      option: "⬆️",
      category: "Gift",
      prerequisite: "—",
      price: null,
      description: "Gain a Level",
    },
    {
      id: 7,
      name: "Benedizione Epica",
      icon: "🎁",
      option: "🎁",
      category: "Gift",
      prerequisite: "—",
      price: null,
      description: "Ottieni una Benedizione Epica",
    },
  ];

  return (
    <ShopContext.Provider value={{ wheelEntries, shopEntries }}>
      {children}
    </ShopContext.Provider>
  );
}
