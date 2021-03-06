// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
function range(start: number, stop: number, step: number): number[] {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

// http://stackoverflow.com/questions/962802#962890
function shuffle(array: number[]): number[] {
  if (!array?.length) return array;
  let tmp: number, current: number, top: number = array.length;
  while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

export function generateArray(min: number, max: number, elements: number): number[] {
  return shuffle(range(min, max, Math.floor(max / elements)));
}
