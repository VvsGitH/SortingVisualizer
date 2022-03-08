import { useRef, useEffect, memo } from "react";
import { useSpring, animated } from "@react-spring/web";

export interface SortElementProps {
  height: number,
  isMain: boolean,
  isSecondary: boolean
}


function SimpleSortElement({ height, isMain, isSecondary }: SortElementProps): JSX.Element {
  return (
    <div
      className={"bar " + (isMain ? "main" : "") + (isSecondary ? "secondary" : "")}
      style={{ height: height }}
    ></div>
  );
}

const memoizedSimpleSortElement = memo(SimpleSortElement);


function AnimatedSortElement({ height, isMain, isSecondary }: SortElementProps): JSX.Element {
  const currentHeight = useRef(height);

  useEffect(() => {
    currentHeight.current = height;
  }, [height]);

  const animation = useSpring({
    from: { height: currentHeight.current },
    to: { height: height },
  });

  return (
    <animated.div
      className={"bar " + (isMain ? "main" : "") + (isSecondary ? "secondary" : "")}
      style={animation}
    ></animated.div>
  );
}

const memoizedAnimatedSortElement = memo(AnimatedSortElement);


export {
  memoizedSimpleSortElement as SimpleSortElement,
  memoizedAnimatedSortElement as AnimatedSortElement, 
};