import { add, multiply } from './math.js';

const resultAdd = add(2, 3);
const resultMultiply = multiply(4, 5);

const output = `
  <p>2 + 3 = ${resultAdd}</p>
  <p>4 * 5 = ${resultMultiply}</p>
`;

document.body.innerHTML = output;
