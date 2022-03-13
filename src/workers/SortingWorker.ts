import { ALG_ENUM, ALG_MAP, MAX_HEIGHT, MIN_HEIGHT } from "../shared/constants";
import { History } from "../shared/sorting";
import { generateArray } from "../shared/utils";

function generateHistory(num: number, alg: ALG_ENUM): History {
  const toSort = generateArray(MIN_HEIGHT, MAX_HEIGHT, num);
  const sorter = ALG_MAP[alg].sorter;
  return sorter(toSort);
};

export type SortMessageType = {
  num: number;
  alg: ALG_ENUM;
}

onmessage = (message: MessageEvent<SortMessageType>) => {
  const { num, alg } = message.data;
  const history = generateHistory(num, alg);
  console.log(history);
  postMessage(history);
};
