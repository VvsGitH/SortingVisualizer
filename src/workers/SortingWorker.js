import { MAX_HEIGHT, MIN_HEIGHT } from "../shared/constants";
import { generateArray, getAlg } from "../shared/utils";

function generateHistory(num, alg) {
  const toSort = generateArray(MIN_HEIGHT, MAX_HEIGHT, num);
  const sorter = getAlg(alg);
  return sorter(toSort);
};

onmessage = function (message) {
  const { num, alg } = message.data;
  const history = generateHistory(num, alg);
  postMessage(history);
};
