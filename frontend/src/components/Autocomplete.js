import { useState, useRef } from 'react';
import useProduct from './../api/useProduct';
import './Autocomplete.css';

const Autocomplete = ({ value, onCreateItemChange, onCreateItem }) => {
  const searchInput = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const product = useProduct();

  const onChangeHandler = (query) => {
    onCreateItemChange(query);
    if (query.length > 0) {
      product.search(query).then((data) => {
        setSuggestions(data.items);
      });
    } else {
      setSuggestions([]);
    }
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter')
      onCreateItem();
  }

  const onBlurHandler = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  }

  const onChooseSuggestion = (text) => {
    onCreateItemChange(text);
    searchInput.current.focus();
  }

  return (
    <div className="Input">
      <input
        ref={searchInput}
        type="text"
        onChange={e => onChangeHandler(e.target.value)}
        onBlur={onBlurHandler}
        onKeyPress={onKeyPress}
        value={value}
      />
      {suggestions && suggestions.map((item) =>
        <div
          className="Suggestion"
          key={item.id}
          onClick={() => onChooseSuggestion(item.name)}
        >
          {item.name}
        </div>
      )}
    </div>
  );
}

export default Autocomplete;