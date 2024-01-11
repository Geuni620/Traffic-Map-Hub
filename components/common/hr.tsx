interface Props {
  classNames?: string;
}

export const Hr: React.FC<Props> = ({ classNames }) => {
  return (
    <hr
      className={`${classNames} my-3 w-full border-t-[0.7px] border-solid border-gray-300`}
    />
  );
};
