export const SkipToContent = () => {
  return (
    <a
      className="absolute z-50 w-0 h-0 overflow-hidden focus:min-h-fit focus:h-auto focus:w-auto"
      href={"#content"}
      aria-label="Перейти к основной части">
      <span className="py-1 px-2 bg-primary text-onPrimary rounded-br-md">К основной части</span>
    </a>
  );
};
