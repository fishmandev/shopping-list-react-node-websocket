import { useRef } from 'react';
import './Autocomplete.css';

const Autocomplete = ({ suggestions, value, onChangeHandler, onCreateItem, onBlurHandler }) => {
  const searchInput = useRef(null);

  const onKeyPress = (e) => {
    if (e.key === 'Enter')
      onCreateItem();
  }

  const onChooseSuggestion = (text) => {
    onChangeHandler(text);
    searchInput.current.focus();
  }

  return (
    <div className="Input">
      <input
        ref={searchInput}
        type="text"
        onChange={e => onChangeHandler(e.target.value)}
        onKeyPress={onKeyPress}
        onBlur={onBlurHandler}
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