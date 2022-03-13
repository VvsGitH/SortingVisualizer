import { useRef, useEffect, memo } from "react";
import { useSpring, animated } from "@react-spring/web";

export interface SortElementProps {
  height: number,
  isMain: boolean,
  isSecondary: boolean,
  isTertiary: boolean
}


function setClass(isMain: boolean, isSecondary: boolean, isTertiary: boolean): string {
  if (isMain) return "main";
  if (isSecondary) return "secondary";
  if (isTertiary) return "tertiary";
  return "";
}


function SimpleSortElement({ height, isMain, isSecondary, isTertiary }: SortElementProps): JSX.Element {
  return (
    <div
      className={"bar " + setClass(isMain, isSecondary, isTertiary)}
      style={{ height: height }}
    ></div>
  );
}

const memoizedSimpleSortElement = memo(SimpleSortElement);


function AnimatedSortElement({ height, isMain, isSecondary, isTertiary }: SortElementProps): JSX.Element {
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
      className={"bar " + setClass(isMain, isSecondary, isTertiary)}
      style={animation}
    ></animated.div>
  );
}

const memoizedAnimatedSortElement = memo(AnimatedSortElement);


export {
  memoizedSimpleSortElement as SimpleSortElement,
  memoizedAnimatedSortElement as AnimatedSortElement, 
};