import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useShopContext } from "../contexts/ShaZamShop";

export default function WheelComponent() {
  const entries = useShopContext();
  console.log(entries);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(null);

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * entries.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  return (
    <div className="text-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={entries}
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
          setResult(entries[prizeNumber]);
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
