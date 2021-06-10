import Item from './Item';
import './List.css';

const List = ({ list, onChangeBuyStatus, onDelete }) => {

  return (
    <div className="List">
      {list.map((item) => {
        return <Item
          key={item.id}
          item={item}
          onChangeBuyStatus={onChangeBuyStatus}
          onDelete={onDelete}
        />
      })}
    </div>
  );
}

export default List;