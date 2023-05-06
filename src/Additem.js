import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';
const Additem = ({newItem, setNewItem, handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form className="addForm" onSubmit={(e)=>handleSubmit(e)}>
      {/* <label htmlFor="addItem" />
      Add Item
      <label /> */}
      <input
        type="text"
        autoFocus
        ref={inputRef}
        id="addItem"
        placeholder="add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="sybmit" aria-label="add Item" onClick={() => inputRef.current.focus()} >
        <FaPlus />
      </button>
    </form>
  );
};

export default Additem;
