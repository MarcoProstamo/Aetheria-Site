import { useBestiaryContext } from "../contexts/BestiaryContext";
import { useState, useEffect } from "react";
import MonsterCard from "../components/MonsterCard";

function getCellColor(value) {
  if (value === 0) return "bg-opacity-10 bg-success";
  if (value <= 10) return "bg-opacity-20 bg-success";
  if (value <= 25) return "bg-opacity-30 bg-success";
  if (value <= 50) return "bg-opacity-50 bg-info";
  if (value <= 75) return "bg-opacity-70 bg-info";
  return "bg-primary";
}

function getValueByType(creatures, damageType, conditionType, triggerValue) {
  switch (triggerValue) {
    case 1:
      return creatures.filter((c) => c.immune?.includes(damageType));
    case 2:
      return creatures.filter((c) => c.resist?.includes(damageType));
    case 3:
      return creatures.filter((c) => c.vulnerable?.includes(damageType));
    case 4:
      return creatures.filter((c) =>
        c.conditionImmune?.includes(conditionType)
      );
    default:
      return [];
  }
}

export default function BestiaryPage() {
  const { types, damages, monstersByType, conditions } = useBestiaryContext();
  const [triggerValue, setTriggerValue] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [rowLabels, setRowLabels] = useState(damages);
  const columnLabels = types;
  const monsterMap = {};
  monstersByType.forEach((type) => {
    monsterMap[type.name.toLowerCase()] = type.monsters;
  });

  useEffect(() => {
    if (triggerValue === 4) {
      setRowLabels(conditions);
    } else {
      setRowLabels(damages);
    }
  }, [triggerValue, conditions, damages]);

  return (
    <div className="container my-3">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
        {(triggerValue === 1 && (
          <h1 className="text-center fw-bold">Immunità ai Danni</h1>
        )) ||
          (triggerValue === 2 && (
            <h1 className="text-center fw-bold">Resistenza ai Danni</h1>
          )) ||
          (triggerValue === 3 && (
            <h1 className="text-center fw-bold">Vulnerabilità ai Danni</h1>
          )) ||
          (triggerValue === 4 && (
            <h1 className="text-center fw-bold">Immunità alle Condizioni</h1>
          ))}
        <button
          type="button"
          className="fs-5 btn btn-primary fw-semibold"
          onClick={() => {
            setTriggerValue(
              triggerValue === 1
                ? 2
                : triggerValue === 2
                ? 3
                : triggerValue === 3
                ? 4
                : 1
            );
          }}
        >
          Switch
        </button>
      </div>
      <div className="table-responsive p-1">
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
            {rowLabels.map((label, rowIndex) => (
              <tr key={rowIndex}>
                <td className="fw-bold text-center">{label}</td>
                {columnLabels.map((creatureType, colIndex) => {
                  const monsters = monsterMap[creatureType.toLowerCase()];
                  const value = getValueByType(
                    monsters,
                    triggerValue === 4 ? null : label.toLowerCase(), // damageType
                    triggerValue === 4 ? label.toLowerCase() : null, // conditionType
                    triggerValue
                  );
                  value.sort((a, b) => a.name.localeCompare(b.name));
                  const count = value.length;

                  return (
                    <td
                      key={colIndex}
                      className={`text-center cursor-pointer ${getCellColor(
                        count
                      )}`}
                      onClick={() =>
                        setModalData({
                          type: creatureType,
                          damage: label,
                          value,
                        })
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#damageModal"
                    >
                      {count}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legenda */}
      <div className="mt-5 text-bg-dark p-3 rounded d-flex justify-content-center align-items-center flex-column w-50 mx-auto">
        <h3>Legenda</h3>
        <div className="d-flex flex-wrap gap-3">
          <div className="rounded p-2 bg-opacity-10 bg-success">0</div>
          <div className="rounded p-2 bg-opacity-20 bg-success">1-10</div>
          <div className="rounded p-2 bg-opacity-30 bg-success">11-25</div>
          <div className="rounded p-2 bg-opacity-50 bg-info">26-50</div>
          <div className="rounded p-2 bg-opacity-70 bg-info">51-75</div>
          <div className="rounded p-2 bg-primary">76+</div>
        </div>
      </div>

      {/* Creature List Modal By Type*/}
      <div
        className="modal fade"
        id="damageModal"
        tabIndex="-1"
        aria-labelledby="damageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-uppercase fw-semibold"
                id="damageModalLabel"
              >
                {modalData?.type || "Tipo"} - {modalData?.damage || "Danno"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {modalData?.value.length > 0 && <span>Creature:</span>}
              {(modalData?.value.length > 0 && (
                <ul className="m-0">
                  {modalData?.value.map((creature) => {
                    return (
                      <li
                        key={creature.id + creature.name}
                        data-bs-toggle="modal"
                        data-bs-target="#creatureModal"
                        onClick={() => {
                          setModalData({
                            ...modalData,
                            creature: creature,
                          });
                        }}
                        className="cursor-pointer fw-semibold"
                      >
                        {creature.name}
                      </li>
                    );
                  })}
                </ul>
              )) || <p className="m-0">Nessuna creatura trovata</p>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Creature Details Modal */}
      <div className="modal fade" id="creatureModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="creatureModalLabel">
                Ciao sono un {modalData?.creature?.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {modalData?.creature && (
                <MonsterCard monster={modalData.creature} />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
