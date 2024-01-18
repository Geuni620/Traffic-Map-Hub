import { CheckboxWithLabel } from 'components/common/checkbox-label';
import { LEGEND_CHECKBOX_LABEL } from 'constant/legend';

interface LegendCheckboxManagerProps {
  children: React.ReactNode;
}

export const LegendCheckboxManager: React.FC<LegendCheckboxManagerProps> = ({
  children,
}) => {
  return (
    <>
      <div className="legend-group">
        {LEGEND_CHECKBOX_LABEL.map(({ id, label }) => (
          <CheckboxWithLabel key={id} id={id} label={label} />
        ))}
      </div>
      {children}
    </>
  );
};
