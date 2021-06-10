import './CreateItemInput.css';

const CreateItemInput = ({ value, onCreateItemChange, onCreateItem }) => {

  const onChange = (e) => {
    onCreateItemChange(e.target.value);
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter')
      onCreateItem();
  }

  return <div className="Input">
    <input type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  </div>
}

export default CreateItemInput;