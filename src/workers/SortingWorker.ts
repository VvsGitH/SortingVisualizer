import { ALG_ENUM, MAX_HEIGHT, MIN_HEIGHT } from "../shared/constants";
import { History } from "../shared/sorting";
import { generateArray, getAlg } from "../shared/utils";

function generateHistory(num: number, alg: ALG_ENUM): History {
  const toSort = generateArray(MIN_HEIGHT, MAX_HEIGHT, num);
  const sorter = getAlg(alg);
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
