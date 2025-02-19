interface ChipProps {
  category: string;
  containerClassName?: string;
  selected?: boolean;
  onSelect?: (category: string) => void;
}

const Chip: React.FC<ChipProps> = ({
  category = "",
  selected,
  containerClassName,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect?.(category)}
      className={`border rounded-full md:py-4 md:px-10  lg:px-12 border-green-reeco py-2 px-8 ${containerClassName} ${
        selected && "bg-green-50"
      }`}
    >
      <span
        className={`text-sm text-text-primary font-semibold ${
          selected && "text-green-reeco"
        }`}
      >
        {category}
      </span>
    </button>
  );
};

export default Chip;
