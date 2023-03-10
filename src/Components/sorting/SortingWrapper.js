import SortComponent from "./SortComponent";

const SortingWrapper = ({ isDisabled, onSortChange, sortOptions }) => {
  return (
    <>
      {!isDisabled ? (
        <SortComponent onChange={onSortChange} options={sortOptions} />
      ) : null}
    </>
  );
};

export default SortingWrapper;
