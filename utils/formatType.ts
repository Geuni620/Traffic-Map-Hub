export const formatType = (type?: string) => {
  if (!type || type === '수시') {
    return { label: '수', color: '#364fc7' };
  }

  return { label: '상', color: '#2b8a3e' };
};
