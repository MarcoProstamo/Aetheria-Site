import { useBestiaryContext } from "../contexts/BestiaryContext";
import { useState } from "react";

function getCellColor(value) {
  if (value === 0) return "bg-opacity-10 bg-success";
  if (value <= 10) return "bg-opacity-20 bg-success";
  if (value <= 25) return "bg-opacity-30 bg-success";
  if (value <= 50) return "bg-opacity-50 bg-info";
  if (value <= 75) return "bg-opacity-70 bg-info";
  return "bg-primary";
}

function getPercentage(value, total) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

function getValueByType(creatures, damageType, immunitiesTrigger) {
  const total = creatures.length;
  const totalImmune = creatures.filter((creature) =>
    immunitiesTrigger
      ? creature.immune?.includes(damageType)
      : creature.resist?.includes(damageType)
  ).length;
  return getPercentage(totalImmune, total);
}

export default function BestiaryPage() {
  const { types, damages, monstersByType } = useBestiaryContext();
  const [immunitiesTrigger, setImmunitiesTrigger] = useState(true);

  const rowLabels = damages;
  const columnLabels = types;
  const monsterMap = {};
  monstersByType.forEach((type) => {
    monsterMap[type.name.toLowerCase()] = type.monsters;
  });

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-5">
        {immunitiesTrigger ? (
          <h1 className="text-center fw-bold">Immunità ai Danni</h1>
        ) : (
          <h1 className="text-center fw-bold">Resistenza ai Danni</h1>
        )}
        <button
          type="button"
          className="fs-5 btn btn-primary fw-semibold"
          onClick={() => {
            setImmunitiesTrigger(!immunitiesTrigger);
          }}
        >
          Switch
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th></th>
              {columnLabels.map((label, index) => (
                <th key={index} className="text-center">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((damageType, rowIndex) => (
              <tr key={rowIndex}>
                <td className="fw-bold text-center">{damageType}</td>
                {columnLabels.map((creatureType, colIndex) => {
                  const monsters = monsterMap[creatureType.toLowerCase()];
                  const value = getValueByType(
                    monsters,
                    damageType.toLowerCase(),
                    immunitiesTrigger
                  );
                  return (
                    <td
                      key={colIndex}
                      className={`text-center ${getCellColor(value)}`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 text-bg-dark p-3 rounded d-flex justify-content-center align-items-center flex-column w-50 mx-auto">
        <h3>Legenda</h3>
        <div className="d-flex flex-wrap gap-3">
          <div className="rounded p-2 bg-opacity-10 bg-success">0%</div>
          <div className="rounded p-2 bg-opacity-20 bg-success">1-10%</div>
          <div className="rounded p-2 bg-opacity-30 bg-success">11-25%</div>
          <div className="rounded p-2 bg-opacity-50 bg-info">26-50%</div>
          <div className="rounded p-2 bg-opacity-70 bg-info">51-75%</div>
          <div className="rounded p-2 bg-primary">76-100%</div>
        </div>
      </div>
    </div>
  );
}
