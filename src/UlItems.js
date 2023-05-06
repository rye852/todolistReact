import LineItem from './LineItem';
const UlItems = ({ items, handelCheked, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          key={item.id}
          handleDelete={handleDelete}
          handelCheked={handelCheked}
          item={item}
        />
      ))}
    </ul>
  );
};

export default UlItems;
