export type History = {
  type: "INIT" | "COMP" | "SWAP";
  i1?: number;
  i2?: number;
  i3?: number;
  sstart?: number; // start of the current partition of the array
  send?: number; // end of the current partition of the array
  arr?: number[];
}[];

export type SortFunction = (arr: number[]) => History;



function swap(i1: number, i2: number, arr: number[]) {
  let temp = arr[i2];
  arr[i2] = arr[i1];
  arr[i1] = temp;
}


export function bubbleSort(arr: number[]): History {
  const history: History = [{ type: "INIT", arr: [...arr] }];
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      history.push({ type: "COMP", i1: j + 1, i2: j });
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
      history.push({ type: "COMP", i1: j, i2: minIndex });
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
    history.push({ type: "SWAP", i1: j + 1, arr: [...arr] });
  }
  return history;
}



export function quicksort(arr: number[]): History {
  const history: History = [{ type: "INIT", arr: [...arr] }];

  function partition(a: number[], lo: number, hi: number): number {
    let pi: number = hi; 
    let smallIndx: number = lo - 1;

    // Move all elements smaller than the pivot in the left part of the array
    for (let j = lo; j < hi; j++) {
      history.push({ type: "COMP", i1: pi, i2: j, i3: smallIndx >= lo ? smallIndx : undefined, sstart: lo, send: hi });
      if (arr[j] < arr[pi]) {
        smallIndx++;
        swap(smallIndx, j, a);
        history.push({ type: "SWAP", i1: pi, i2: j, i3: smallIndx, sstart: lo, send: hi, arr: [...a] });
      }
    }

    // Move the pivot after all the smaller elements
    swap(smallIndx + 1, hi, a);
    pi = smallIndx + 1;
    history.push({ type: "SWAP", i1: pi, i3: smallIndx, sstart: lo, send: hi, arr: [...a] });

    return pi;
  }

  // Recursive sort function
  function sort(a: number[], lo: number, hi: number) {
    if (lo < 0 || lo >= hi) return;
    const pi = partition(a, lo, hi);
    sort(a, lo, pi - 1);
    sort(a, pi + 1, hi);
  }

  sort(arr, 0, arr.length - 1);
  return history;
}



export function mergeSort(arr: number[]): History {
  const history: History = [{ type: "INIT", arr: [...arr] }];

  // Merge alg without a copy array
  // NOTE: this merge function is not the common merge-sort merge function because it
  // doesn't use a copy array and it does in-place swapping instead.
  // This choice was made in order to be able to visualize the merge in a comprehensible way.
  function merge_noCopy(a: number[], left: number, center: number, right: number): void {
    // The array is fractioned like this: 0 ... | i ... m | j ... right | ... end
    // The sectors i...m and j...right are already ordered by recursion, so I just have to merge them
    let i = left, m = center, j = center + 1;
    
    // ... | 1 4 5 7 | 9 10 11 23 | ... --> this array section is already ordered!
    if (a[m] < a[j]) {
      history.push({ type: "COMP", i1: m, i2: j, sstart: left, send: right });
      return;
    }

    // ... | 1 4 9 15 | 3 10 11 23 | ... --> ... | 1 3 4 9 10 11 15 23 | ...
    while (i <= m && j <= right) {
      history.push({ type: "COMP", i1: i, i2: j, sstart: left, send: right });
      // ... | 1 4 i=10 m=23 | j=5 7 11 25 | ... --> ... | 1 4 5 i=10 m=23 | j=7 11 25 | ...
      if (a[i] > a[j]) {
        let temp = a[j];
        for (let w = j; w > i; w--) {
          a[w] = a[w-1];
          history.push({ type: "SWAP", i1: w, i2: w-1, sstart: left, send: right, arr: [...a] });
        }
        a[i] = temp;
        history.push({ type: "SWAP", i1: i, sstart: left, send: right, arr: [...a] });
        j++; m++;
      }
      i++;
    }
  }

  // Classic merge function, with a copy array
  // NOTE: this merge function is quicker than the noCopy version, but creates a
  // less comprehensible visualization.
  function merge_classic(a: number[], left: number, center: number, right: number): void {
    // The array is fractioned like this: 0 ... | i ... m | j ... right | ... end
    // The sectors i...m and j...right are already ordered by recursion, so I just have to merge them
    let i = left, j = center + 1, k = 0;

    // ... | 1 4 5 7 | 9 10 11 23 | ... --> this array section is already ordered!
    if (a[center] < a[j]) {
      history.push({ type: "COMP", i1: center, i2: j, sstart: left, send: right });
      return;
    }

    // ... | 1 4 9 15 | 3 10 11 23 | ... --> ... | 1 3 4 9 10 11 15 23 | ...
    const merged: number[] = [];
    while (i <= center && j <= right) {
      history.push({ type: "COMP", i1: i, i2: j, sstart: left, send: right });
      // ... | 1 4 i=10 m=23 | j=5 7 11 25 | ... --> ... | 1 4 5 i=10 m=23 | j=7 11 25 | ...
      if (a[i] <= a[j]) {
        merged[k] = a[i];
        i++;
      } else {
        merged[k] = a[j];
        j++;
      }
      k++;
    }
    while (i <= center) {
      merged[k] = a[i];
      k++; i++;
    }
    while (j <= right) {
      merged[k] = a[j];
      k++; j++;
    }
    // Copy of the merged array into the original
    for (let w = left; w <= right; w++ ) {
      a[w] = merged[w - left];
      history.push({ type: "SWAP", i1: w, sstart: left, send: right, arr: [...a] });
    }
  }

  // Recursive sort function
  function sort(a: number[], left: number, right: number): void {
    if (left < right) {
      let center = Math.floor((left + right) / 2);
      sort(a, left, center);
      sort(a, center + 1, right);
      merge_classic(a, left, center, right);
      // merge_noCopy(a, left, center, right);
    }
  }

  sort(arr, 0, arr.length - 1);
  return history;
}
