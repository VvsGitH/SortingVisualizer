import { useState, useCallback } from "react";

import {
  MIN_HEIGHT,
  MAX_HEIGHT,
  INIT_NUM,
  INIT_SPEED
} from "./shared/constants";
import { History } from "./shared/sorting";
import { generateArray } from "./shared/utils";

import OptionsMenu, { FormFields } from "./components/OptionsMenu";
import SortVisualizer from "./components/SortVisualizer";
import Loader from "./components/Loader";

import SortingWorker from "./workers/SortingWorker.js?worker";

export default function App(): JSX.Element {
  const [steps, setSteps] = useState<History>(() => [
    { type: "INIT", arr: generateArray(MIN_HEIGHT, MAX_HEIGHT, INIT_NUM) },
  ]);

  const [speed, setSpeed] = useState(INIT_SPEED);
  const [stepAnimation, setStepAnimation] = useState(false);

  const [started, setStarted] = useState(false);
  const toggleStart = useCallback(() => {
    setStarted((curr) => !curr);
  }, []);

  const [loading, setLoading] = useState(false);

  const handleOptionsChange = useCallback((newOptions: FormFields) => {
    const { num, alg, speed, animation } = newOptions;
    // STOP CURRENT ANIMATION
    setStarted(false);
    // SET THE LOADING STATE
    setLoading(true);
    // SAVE OPTIONS INTO STATE
    setSpeed(speed);
    setStepAnimation(animation);
    // CALCULATE STEPS WITH WORKER
    const worker = new SortingWorker();
    worker.onmessage = (message: MessageEvent<History>) => {
      let sortHistory = message.data;
      console.log(sortHistory);
      setSteps(sortHistory);
      setLoading(false);
    };
    worker.postMessage({ num, alg });
  }, []);

  return (
    <main>
      <OptionsMenu
        onSubmit={handleOptionsChange}
        started={started}
        toggleStart={toggleStart}
      />
      {loading ? (
        <Loader />
      ) : (
        <SortVisualizer
          steps={steps}
          speed={speed}
          stepAnimation={stepAnimation}
          started={started}
          toggleStart={toggleStart}
        />
      )}
    </main>
  );
}
