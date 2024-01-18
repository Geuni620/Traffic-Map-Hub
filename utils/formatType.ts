export const formatType = (type: string | null) => {
  if (!type || type === '수시') {
    return { label: '' };
  }

  return { label: '*' };
};
