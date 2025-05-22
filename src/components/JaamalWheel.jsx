import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useShopContext } from "../contexts/ShopContext";

export default function WheelComponent() {
  const { wheelEntries } = useShopContext();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(null);

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * wheelEntries.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      <div className="position-relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={wheelEntries}
          spinDuration={1}
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
            setResult(wheelEntries[prizeNumber]);
          }}
        />
        <button
          className="btn btn-primary fs-3 px-2 position-absolute top-50 start-50 translate-middle"
          onClick={handleSpinClick}
        >
          Girami
        </button>
      </div>

      {result && (
        <div className="card mt-4 bg-light text-dark w-100">
          <div className="card-body">
            <h5 className="card-title">{result.name}</h5>
            <p className="card-text">{result.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
