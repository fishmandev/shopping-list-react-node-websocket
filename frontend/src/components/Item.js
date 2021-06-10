import { deleteButton } from "./icons";
import "./Item.css"

const Item = ({ item, onChangeBuyStatus, onDelete }) => {

  return (
    <div className='Item'>
      <input type="checkbox"
        className='Done'
        checked={item.isBought}
        data-id={item.id}
        onChange={onChangeBuyStatus}
      />
      <p className={`Item-Text ${item.isBought ? "Bought" : ""}`}>{item.name}</p>
      <button
        className='Item-Delete'
        onClick={() => onDelete(item.id)}
      >
        {deleteButton}
      </button>
    </div>
  );
};

export default Item;