export default function ShaZamTable() {
  const rolls = [
    {
      id: 1,
      name: "Ability Score Improvement",
      category: "Feat",
      prerequisite: "Lvl. 4",
      price: 2000,
      description:
        "Increase an Ability Score by 2 or Two Abilities Score by 1 (max 20)",
    },
    {
      id: 2,
      name: "Armor Proficiency",
      category: "Proficiency",
      prerequisite: "Previous Armor Prof.",
      price: 1000,
      description: "Gain Proficiency with a Suit of Armor or Shield",
    },
    {
      id: 3,
      name: "Attunement Slot",
      category: "Gift",
      prerequisite: "—",
      price: 2500,
      description: "Gain an Extra Attunement Slot",
    },
    {
      id: 4,
      name: "Blessing",
      category: "Gift",
      prerequisite: "—",
      price: 2500,
      description: "Gain a Blessing",
    },
    {
      id: 5,
      name: "Customized Feature",
      category: "Gift",
      prerequisite: "Lvl. 5",
      price: 0,
      description: "Create a Customized Feature",
    },
    {
      id: 6,
      name: "Epic Ability Score Improvement",
      category: "Epic Feat",
      prerequisite: "Lvl. 8, Selected Stat 20+",
      price: 4000,
      description:
        "Increase an Ability Score by 2 or Two Abilities Score by 1 (max 30)",
    },
    {
      id: 7,
      name: "Epic Boon",
      category: "Epic Feat",
      prerequisite: "Selected Boon Prer.",
      price: 4500,
      description: "Gain an Epic Boon Feat",
    },
    {
      id: 8,
      name: "Exotic Language",
      category: "Feat",
      prerequisite: "—",
      price: 500,
      description: "Learn One Exotic Language",
    },
    {
      id: 9,
      name: "Expertise",
      category: "Proficiency",
      prerequisite: "Selected Skill Prof.",
      price: 1000,
      description: "Gain Expertise with a Skill",
    },
    {
      id: 10,
      name: "Extra Archetype",
      category: "Gift",
      prerequisite: "Selected Class Lvl. 3",
      price: 7500,
      description: "Gain an Additional Archetype",
    },
    {
      id: 11,
      name: "Feature From Another Class",
      category: "Gift",
      prerequisite: "Twice the Feature Lvl. in Main Class",
      price: 10000,
      description: "Gain a Feature From Another Class",
    },
    {
      id: 12,
      name: "Generic Feat",
      category: "Feat",
      prerequisite: "Selected Feat Prer.",
      price: 2500,
      description: "Gain a General Feat",
    },
    {
      id: 13,
      name: "Legendary Resistance",
      category: "Gift",
      prerequisite: "—",
      price: 5000,
      description:
        "Automatically Succeed on a Failed Save Once per Day (max 6/D)",
    },
    {
      id: 14,
      name: "Origin Feat",
      category: "Origin Feat",
      prerequisite: "—",
      price: 1500,
      description: "Gain an Origin Feat",
    },
    {
      id: 15,
      name: "Secret Language",
      category: "Feat",
      prerequisite: "—",
      price: 1000,
      description: "Learn One Secret Language",
    },
    {
      id: 16,
      name: "Skill Proficiency",
      category: "Proficiency",
      prerequisite: "—",
      price: 50,
      description: "Gain Proficiency with a Skill",
    },
    {
      id: 17,
      name: "Standard Language",
      category: "Feat",
      prerequisite: "—",
      price: 0,
      description: "Learn One Standard Language",
    },
    {
      id: 18,
      name: "Tool Proficiency",
      category: "Proficiency",
      prerequisite: "—",
      price: 500,
      description: "Gain Proficiency with a Tool",
    },
    {
      id: 19,
      name: "Weapon Proficiency",
      category: "Proficiency",
      prerequisite: "—",
      price: 500,
      description: "Gain Proficiency with a Weapon",
    },
    {
      id: 20,
      name: "Level Up",
      category: "Gift",
      prerequisite: "Milestone",
      price: 0,
      description: "Gain a Level",
    },
  ];

  return (
    <table className="table table-bordered table-striped mb-5">
      <thead className="table-dark">
        <tr>
          <th>Numero</th>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Prerequisiti</th>
          <th>Prezzo</th>
          <th>Descrizione</th>
        </tr>
      </thead>
      <tbody>
        {rolls.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.prerequisite}</td>
            <td>{item.price}</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
