import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const rolls = [
  {
    id: 1,
    name: "✨",
    category: "Feat",
    prerequisite: "Lvl. 4",
    price: 2000,
    description:
      "Increase an Ability Score by 2 or Two Abilities Score by 1 (max 20)",
  },
  {
    id: 2,
    name: "🦾",
    category: "Proficiency",
    prerequisite: "Previous Armor Prof.",
    price: 1000,
    description: "Gain Proficiency with a Suit of Armor or Shield",
  },
  {
    id: 3,
    name: "🪄",
    category: "Gift",
    prerequisite: "—",
    price: 2500,
    description: "Gain an Extra Attunement Slot",
  },
  {
    id: 4,
    name: "🤡",
    category: "Gift",
    prerequisite: "—",
    price: 2500,
    description: "Gain a Blessing",
  },
  {
    id: 5,
    name: "🧙‍♂️",
    category: "Gift",
    prerequisite: "Lvl. 5",
    price: 0,
    description: "Create a Customized Feature",
  },
  {
    id: 6,
    name: "🌟",
    category: "Epic Feat",
    prerequisite: "Lvl. 8, Selected Stat 20+",
    price: 4000,
    description:
      "Increase an Ability Score by 2 or Two Abilities Score by 1 (max 30)",
  },
  {
    id: 7,
    name: "🎁",
    category: "Epic Feat",
    prerequisite: "Selected Boon Prer.",
    price: 4500,
    description: "Gain an Epic Boon Feat",
  },
  {
    id: 8,
    name: "🗣️",
    category: "Feat",
    prerequisite: "—",
    price: 500,
    description: "Learn One Exotic Language",
  },
  {
    id: 9,
    name: "🧠",
    category: "Proficiency",
    prerequisite: "Selected Skill Prof.",
    price: 1000,
    description: "Gain Expertise with a Skill",
  },
  {
    id: 10,
    name: "🧑‍🔧",
    category: "Gift",
    prerequisite: "Selected Class Lvl. 3",
    price: 7500,
    description: "Gain an Additional Archetype",
  },
  {
    id: 11,
    name: "🧌",
    category: "Gift",
    prerequisite: "Twice the Feature Lvl. in Main Class",
    price: 10000,
    description: "Gain a Feature From Another Class",
  },
  {
    id: 12,
    name: "🧩",
    category: "Feat",
    prerequisite: "Selected Feat Prer.",
    price: 2500,
    description: "Gain a General Feat",
  },
  {
    id: 13,
    name: "🛡️",
    category: "Gift",
    prerequisite: "—",
    price: 5000,
    description:
      "Automatically Succeed on a Failed Save Once per Day (max 6/D)",
  },
  {
    id: 14,
    name: "🤡",
    category: "Origin Feat",
    prerequisite: "—",
    price: 1500,
    description: "Gain an Origin Feat",
  },
  {
    id: 15,
    name: "🗣️",
    category: "Feat",
    prerequisite: "—",
    price: 1000,
    description: "Learn One Secret Language",
  },
  {
    id: 16,
    name: "🧠",
    category: "Proficiency",
    prerequisite: "—",
    price: 50,
    description: "Gain Proficiency with a Skill",
  },
  {
    id: 17,
    name: "🗣️",
    category: "Feat",
    prerequisite: "—",
    price: 0,
    description: "Learn One Standard Language",
  },
  {
    id: 18,
    name: "🛠️",
    category: "Proficiency",
    prerequisite: "—",
    price: 500,
    description: "Gain Proficiency with a Tool",
  },
  {
    id: 19,
    name: "⚔️",
    category: "Proficiency",
    prerequisite: "—",
    price: 500,
    description: "Gain Proficiency with a Weapon",
  },
  {
    id: 20,
    name: "🪙",
    category: "Gift",
    prerequisite: "Milestone",
    price: 0,
    description: "Gain a Level",
  },
];
const MAX_LABEL_LENGTH = 10;
const truncatedData = rolls.map((item) => ({
  option:
    item.name.length > MAX_LABEL_LENGTH
      ? item.name.slice(0, MAX_LABEL_LENGTH - 3) + "..."
      : item.name,
}));

export default function WheelComponent() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(null);

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * truncatedData.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  return (
    <div className="text-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={truncatedData}
        spinDuration={0.4}
        innerRadius={30}
        innerBorderWidth={2}
        outerBorderColor="#ffffff"
        outerBorderWidth={2}
        innerBorderColor="#ffffff"
        radiusLineColor="#ffffff"
        radiusLineWidth={2}
        textDistance={70}
        fontSize={30}
        fontFamily="Arial"
        textColors={["#000000"]}
        backgroundColors={["#FFCC00", "#FF9900", "#3366CC", "#66CCFF"]}
        onStopSpinning={() => {
          setMustSpin(false);
          setResult(rolls[prizeNumber]);
        }}
      />
      <button className="btn btn-primary mt-4" onClick={handleSpinClick}>
        Gira la Ruota!
      </button>

      {result && (
        <div className="card mt-4 bg-light text-dark">
          <div className="card-body">
            <h5 className="card-title">{result.name}</h5>
            <p className="card-text">{result.description}</p>
            <small>
              Categoria: {result.category} | Prezzo: {result.price}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
