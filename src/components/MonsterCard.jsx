const AbilityBlock = ({ name, value }) => {
  const mod = Math.floor((value - 10) / 2);
  const sign = mod >= 0 ? "+" : "";
  return (
    <div className="col text-center border rounded p-1">
      <strong>{name}</strong>
      <div>
        {value} ({sign}
        {mod})
      </div>
    </div>
  );
};

const MonsterSection = ({ title, entries }) => {
  if (!entries || entries.length === 0) return null;
  return (
    <div className="mb-3">
      <h5 className="text-primary">{title}</h5>
      {entries.map((entry, i) => (
        <div key={i}>
          <strong>{entry.name}:</strong>{" "}
          {entry.entries?.join(" ") || entry.headerEntries?.join(" ")}
        </div>
      ))}
    </div>
  );
};

export default function MonsterCard({ monster }) {
  const {
    name,
    size,
    type,
    alignment,
    ac,
    hp,
    speed,
    str,
    dex,
    con,
    int,
    wis,
    cha,
    save,
    skill,
    senses,
    passive,
    languages,
    cr,
    trait,
    action,
    legendary,
    spellcasting,
    immune,
    conditionImmune,
    environment,
    treasure,
  } = monster;

  return (
    <div className="card my-3 shadow">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
          <h2 className="text-danger">{name}</h2>
          <span className="badge bg-secondary">
            CR {typeof cr === "object" ? cr.cr : cr}
          </span>
        </div>

        <p className="fst-italic">
          {size?.join("/") || ""} {typeof type === "string" ? type : type?.type}
          , {alignment?.join(" ")}
        </p>

        <div className="mb-2">
          <strong>AC:</strong> {ac?.join(", ")} | <strong>HP:</strong>{" "}
          {hp.average} ({hp.formula}) | <strong>Speed:</strong>{" "}
          {Object.entries(speed)
            .map(([k, v]) => `${k} ${v} ft.`)
            .join(", ")}
        </div>

        <div className="row text-center mb-3">
          <AbilityBlock name="STR" value={str} />
          <AbilityBlock name="DEX" value={dex} />
          <AbilityBlock name="CON" value={con} />
          <AbilityBlock name="INT" value={int} />
          <AbilityBlock name="WIS" value={wis} />
          <AbilityBlock name="CHA" value={cha} />
        </div>

        {save && (
          <p>
            <strong>Saving Throws:</strong>{" "}
            {Object.entries(save)
              .map(([k, v]) => `${k.toUpperCase()} ${v}`)
              .join(", ")}
          </p>
        )}
        {skill && (
          <p>
            <strong>Skills:</strong>{" "}
            {Object.entries(skill)
              .map(([k, v]) => `${k} ${v}`)
              .join(", ")}
          </p>
        )}
        {senses && (
          <p>
            <strong>Senses:</strong>{" "}
            {Array.isArray(senses)
              ? senses.join(", ")
              : `Passive Perception ${passive}`}
          </p>
        )}
        {languages && (
          <p>
            <strong>Languages:</strong> {languages.join(", ")}
          </p>
        )}
        {immune && (
          <p>
            <strong>Damage Immunities:</strong> {immune.join(", ")}
          </p>
        )}
        {conditionImmune && (
          <p>
            <strong>Condition Immunities:</strong> {conditionImmune.join(", ")}
          </p>
        )}
        {environment && (
          <p>
            <strong>Environment:</strong> {environment.join(", ")}
          </p>
        )}
        {treasure && (
          <p>
            <strong>Treasure:</strong> {treasure.join(", ")}
          </p>
        )}

        <MonsterSection title="Traits" entries={trait} />
        <MonsterSection title="Actions" entries={action} />
        <MonsterSection
          title="Reactions"
          entries={spellcasting?.filter((sc) => sc.displayAs === "reaction")}
        />
        <MonsterSection
          title="Spellcasting"
          entries={spellcasting?.filter((sc) => sc.displayAs === "action")}
        />
        <MonsterSection title="Legendary Actions" entries={legendary} />
      </div>
    </div>
  );
}
