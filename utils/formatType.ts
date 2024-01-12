export const formatType = (type?: string) => {
  if (!type || type === '수시') {
    return { label: '' };
  }

  return { label: '*' };
};
