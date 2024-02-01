import { LoadingSpinner } from 'components/common/loading-spinner';

interface LoadingIndicatorProps {
  isFetching: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isFetching,
}) => {
  if (!isFetching) return null;

  return (
    <div className="centered-container">
      <LoadingSpinner />
    </div>
  );
};
