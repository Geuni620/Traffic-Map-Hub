export type CategoryFilter = 'all' | 'highway' | 'seoul' | 'incheon' | 'toll';

type Legend = {
  id: CategoryFilter;
  label: string;
};

export const LEGEND_CHECKBOX_LABEL: Legend[] = [
  { id: 'highway', label: '통계연보' },
  { id: 'seoul', label: '서울시' },
  { id: 'incheon', label: '인천시' },
  { id: 'toll', label: "도로업무편람('21)" },
];
