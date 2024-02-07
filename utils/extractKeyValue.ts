export const extractKeyValue = (data: Array<any>, key: string) => {
  return data.map((item) => item[key]).filter((value) => value !== undefined);
};

function countValues(values) {
  return values.reduce((accumulator, value) => {
    accumulator[value] = (accumulator[value] || 0) + 1;
    return accumulator;
  }, {});
}
