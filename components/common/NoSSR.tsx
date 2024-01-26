import dynamic from 'next/dynamic';

interface NoSSRProps {
  children: React.ReactNode;
}

const NoSSRComponent: React.FC<NoSSRProps> = ({ children }) => <>{children}</>;

const DynamicNoSSRComponent = dynamic(() => Promise.resolve(NoSSRComponent), {
  ssr: false,
});

export const NoSSR = ({ children }: NoSSRProps) => {
  return <DynamicNoSSRComponent>{children}</DynamicNoSSRComponent>;
};
