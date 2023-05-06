import UlItems from './UlItems';
const Content = ({ length, items, handelCheked, handleDelete }) => {
  return (
    <>
      {length ? (
        <UlItems
          items={items}
          handelCheked={handelCheked}
          handleDelete={handleDelete}
        />
      ) : (
        <p>there is any data</p>
      )}
    </>
  );
};

export default Content;
