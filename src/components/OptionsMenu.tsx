import { useState, memo, FormEvent } from "react";
import { INIT_NUM, INIT_ALG, INIT_SPEED, ALG_ENUM } from "../shared/constants";

export interface FormFields {
  num: number;
  alg: ALG_ENUM;
  speed: number;
  animation: boolean;
}

export interface OptionsMenuProps {
  started: boolean;
  onSubmit: (fields: FormFields) => void;
  toggleStart: () => void;
}

function OptionsMenu({ onSubmit, started, toggleStart }: OptionsMenuProps): JSX.Element {
  const [num, setNum] = useState(INIT_NUM);
  const [alg, setAlg] = useState(INIT_ALG);
  const [speed, setSpeed] = useState(INIT_SPEED);
  const [animation, setAnimation] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ num, alg, speed, animation });
  };

  return (
    <form className="options-container" onSubmit={handleSubmit}>
      <div className="input-field">
        <label htmlFor="num-elements">Number of Elements</label>
        <input
          id="num-elements"
          type="number"
          min="2"
          max="200"
          value={num}
          onChange={(e) => setNum(parseInt(e.target.value))}
        />
      </div>
      <div className="input-field">
        <label htmlFor="alg-selector">Algorithm</label>
        <select
          id="alg-selector"
          value={alg}
          onChange={(e) => setAlg(e.target.value as unknown as ALG_ENUM)}
        >
          <option value={ALG_ENUM.BUBBLE}>Bubble Sort</option>
          <option value={ALG_ENUM.SELECTION}>Selection Sort</option>
          <option value={ALG_ENUM.INSERTION}>Insertion Sort</option>
          <option value={ALG_ENUM.QUICK}>Quick Sort</option>
          <option value={ALG_ENUM.MERGE}>Merge Sort</option>
        </select>
      </div>
      <div className="input-field">
        <label htmlFor="step-duration">Step duration [ms]</label>
        <input
          id="step-duration"
          type="number"
          min="10"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
      </div>
      <div className="input-field">
        <label htmlFor="anim-enabled">Enable Animations</label>
        <input
          id="anim-enabled"
          type="checkbox"
          checked={animation}
          onChange={(e) => setAnimation(e.target.checked)}
        />
      </div>
      <input type="submit" value="SET" />
      <input
        type="button"
        value={started ? "STOP" : "START"}
        onClick={(_) => toggleStart()}
      />
    </form>
  );
}

export default OptionsMenu;
