import { deleteButton } from "./icons";
import "./Item.css"

const Item = ({ item }) => {

  return (
    <div className='Item'>
      <input type="checkbox"
        className='Done'
        checked={item.isBought}
      />
      <p className={`Item-Text ${item.isBought ? "Bought" : ""}`}>{item.name}</p>
      <button className='Item-Delete'>{deleteButton}</button>
    </div>
  );
};

export default Item;