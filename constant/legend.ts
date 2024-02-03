export type CategoryFilter =
  | 'all'
  | 'highway'
  | 'seoul'
  | 'incheon'
  | 'toll'
  | 'busan'
  | 'daegu'
  | 'daejeon';

type Legend = {
  id: CategoryFilter;
  label: string;
};

export const LEGEND_BUTTON_LABEL: Legend[] = [
  { id: 'highway', label: '통계연보' },
  { id: 'seoul', label: '서울시' },
  { id: 'incheon', label: '인천시' },
  { id: 'busan', label: '부산시' },
  { id: 'daegu', label: '대구시' },
  { id: 'daejeon', label: '대전시' },
  { id: 'toll', label: "도로업무편람('21)" },
];
