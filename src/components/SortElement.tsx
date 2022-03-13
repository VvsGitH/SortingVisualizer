import { useRef, useEffect, memo } from "react";
import { useSpring, animated } from "@react-spring/web";

export interface SortElementProps {
  height: number,
  isMain: boolean,
  isSecondary: boolean,
  isTertiary: boolean,
  isSectionStart: boolean,
  isSectionEnd: boolean
}


function setElmHigh({ isMain, isSecondary, isTertiary }: SortElementProps): string {
  if (isMain) return " main";
  if (isSecondary) return " secondary";
  if (isTertiary) return " tertiary";
  return "";
}


function setSectionHigh({ isSectionStart, isSectionEnd }: SortElementProps): string {
  if (isSectionStart) return " section-start";
  if (isSectionEnd) return " section-end";
  return "";
}


function SimpleSortElement(props: SortElementProps): JSX.Element {
  return (
    <div
      className={"bar" + setElmHigh(props) + setSectionHigh(props)}
      style={{ height: props.height }}
    ></div>
  );
}

const memoizedSimpleSortElement = memo(SimpleSortElement);


function AnimatedSortElement(props: SortElementProps): JSX.Element {
  const currentHeight = useRef(props.height);

  useEffect(() => {
    currentHeight.current = props.height;
  }, [props.height]);

  const animation = useSpring({
    from: { height: currentHeight.current },
    to: { height: props.height },
  });

  return (
    <animated.div
      className={"bar" + setElmHigh(props) + setSectionHigh(props)}
      style={animation}
    ></animated.div>
  );
}

const memoizedAnimatedSortElement = memo(AnimatedSortElement);


export {
  memoizedSimpleSortElement as SimpleSortElement,
  memoizedAnimatedSortElement as AnimatedSortElement, 
};