import { FaTrashAlt } from 'react-icons/fa';
const LineItem = ({ item, handelCheked, handleDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.cheked}
        onChange={() => handelCheked(item.id)}
      />
      <label
        onDoubleClick={() => handelCheked(item.id)}
        style={item.cheked ? { textDecoration: 'line-through' } : null}>
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default LineItem;
