function swap(i1: number, i2: number, arr: number[]) {
  let temp = arr[i2];
  arr[i2] = arr[i1];
  arr[i1] = temp;
}

export type History = {
  type: "INIT" | "COMP" | "SWAP";
  i1?: number;
  i2?: number;
  arr: number[];
}[];

export type SortFunction = (arr: number[]) => History;

export function bubbleSort(arr: number[]): History {
  const history: History = [{ type: "INIT", arr: [...arr] }];
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      history.push({ type: "COMP", i1: j + 1, i2: j, arr: [...arr] });
      if (arr[j + 1] < arr[j]) {
        swapped = true;
        swap(j + 1, j, arr);
        history.push({ type: "SWAP", i1: j + 1, i2: j, arr: [...arr] });
      }
    }
    if (!swapped) break;
  }
  return history;
}

export function selectionSort(arr: number[]): History {
  const history: History = [{ type: "INIT", arr: [...arr] }];
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      history.push({ type: "COMP", i1: j, i2: minIndex, arr: [...arr] });
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (i !== minIndex) {
      swap(i, minIndex, arr);
      history.push({ type: "SWAP", i1: i, i2: minIndex, arr: [...arr] });
    }
  }
  return history;
}

export function insertionSort(arr: number[]): History {
  const history: History = [{ type: "INIT", arr: [...arr] }];
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      history.push({ type: "SWAP", i1: j + 1, i2: j, arr: [...arr] });
      j--;
    }
    arr[j + 1] = current;
    history.push({ type: "SWAP", i1: j + 1, i2: i, arr: [...arr] });
  }
  return history;
}

function _quicksort(arr: number[], lo: number, hi: number, history: History) {
  if (lo < 0 || lo >= hi) return;

  // PARTITIONING
  let pi: number;
  while (true) {
    const piValue = arr[Math.floor((lo + hi) * 0.5)];
    let i = lo;
    let j = hi;
    while (arr[i] < piValue) {
      i++;
      history.push({ type: "COMP", i1: i, i2: j, arr: [...arr] });
    }
    while (arr[j] > piValue) {
      j--;
      history.push({ type: "COMP", i1: i, i2: j, arr: [...arr] });
    }
    if (i < j) {
      swap(i, j, arr);
      history.push({ type: "SWAP", i1: i, i2: j, arr: [...arr] });
    } else {
      pi = j;
      break;
    }
  }

  // RECURSION
  _quicksort(arr, lo, pi - 1, history);
  _quicksort(arr, pi + 1, hi, history);
}

export function quicksort(arr: number[]): History {
  const history: History = [{ type: "INIT", arr: [...arr] }];
  _quicksort(arr, 0, arr.length - 1, history);
  return history;
}
