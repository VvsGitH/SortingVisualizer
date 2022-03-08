import { useState, useEffect, useMemo, memo } from "react";
import { History } from "../shared/sorting";
import { AnimatedSortElement, SimpleSortElement } from "./SortElement";

export interface SortVisualizerProps {
  steps: History,
  speed: number,
  stepAnimation: boolean,
  started: boolean,
  toggleStart: () => void
}

function SortVisualizer({ steps, speed, stepAnimation, started, toggleStart }: SortVisualizerProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0);
  }, [steps]);

  useEffect(() => {
    let visualization: number;

    if (started) {
      visualization = setInterval(() => {
        let isFinished = false;
        setCurrentStep((step) => {
          if (step < steps.length - 1) {
            step += 1;
          } else {
            isFinished = true;
            clearInterval(visualization);
          }
          return step;
        });
        if (isFinished) {
          toggleStart();
        }
      }, speed);
    }

    return () => {
      if (visualization) clearInterval(visualization);
    };
  }, [started, speed, steps.length, toggleStart]);

  const SortElement = useMemo(
    () => (stepAnimation ? AnimatedSortElement : SimpleSortElement),
    [stepAnimation]
  );

  if (!steps) return <div id="NO_STEPS"></div>;

  return (
    <div className="bar-container">
      <div className="step-counter">{currentStep}</div>

      {steps[currentStep]?.arr.map((height, idx) => (
        <SortElement
          key={idx}
          height={height}
          isMain={steps[currentStep].i1 === idx}
          isSecondary={steps[currentStep].i2 === idx}
        />
      ))}
    </div>
  );
}

export default memo(SortVisualizer);
