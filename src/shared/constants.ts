import * as Sort from "./sorting";

export enum ALG_ENUM {
  BUBBLE = "BUBBLE",
  SELECTION = "SELECTION",
  INSERTION = "INSERTION",
  QUICK = "QUICK",
  MERGE = "MERGE",
};

export type AlgMapType = Record<ALG_ENUM, { name: string; sorter: Sort.SortFunction }>;

export const ALG_MAP: AlgMapType = {
  [ALG_ENUM.BUBBLE]: { name: "Bubble Sort", sorter: Sort.bubbleSort },
  [ALG_ENUM.SELECTION]: { name: "Selection Sort", sorter: Sort.selectionSort },
  [ALG_ENUM.INSERTION]: { name: "Insertion Sort", sorter: Sort.insertionSort },
  [ALG_ENUM.QUICK]: { name: "Quick Sort", sorter: Sort.quicksort },
  [ALG_ENUM.MERGE]: { name: "Merge Sort", sorter: Sort.mergeSort },
};

export const MIN_HEIGHT = 20;
export const MAX_HEIGHT = 400;
export const INIT_NUM = 20;
export const INIT_ALG = ALG_ENUM.BUBBLE;
export const INIT_SPEED = 50;
