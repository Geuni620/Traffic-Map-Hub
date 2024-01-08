export const formatNumberWithCommas = (num: number | null) => {
  if (!num) {
    return '데이터가 존재하지 않아요.';
  }

  return new Intl.NumberFormat().format(num);
};
