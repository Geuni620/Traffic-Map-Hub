import { BeatLoader } from 'react-spinners';

export const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <BeatLoader color="#36d7b7" />
    </div>
  );
};
