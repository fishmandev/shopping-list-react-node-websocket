import { useState, useEffect } from 'react';
import useList from './api/useList';
import Autocomplete from './components/Autocomplete';
import useProduct from './api/useProduct';
import List from './components/List';
import Alert from './components/Alert';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const api = useList();
  const product = useProduct();

  useEffect(() => {
    const wsConnect = () => {
      let webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER_URL);
      webSocket.onclose = () => {
        setTimeout(() => wsConnect(), 1000);
      }
      webSocket.onmessage = event => {
        setList(JSON.parse(event.data));
        setIsLoaded(false);
      }
    }
    const fetchList = () => {
      setIsLoaded(true);
      setIsError(false);
      api.read()
        .then(setList)
        .catch(err => {
          setIsError(true);
        })
        .finally(() => { setIsLoaded(false) });
    }
    wsConnect();
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeBuyStatus = ({ target: { checked, dataset: { id } } }) => {
    setIsLoaded(true);
    setIsError(false);
    api.update([id], checked)
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => { setIsLoaded(false) });
  };

  const onDelete = (id) => {
    setIsLoaded(true);
    setIsError(false);
    api.remove(id)
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => { setIsLoaded(false) });
  };

  const onChangeAutocompleteHandler = (query) => {
    setItem(query);
    if (query.length > 0) {
      setIsLoaded(true);
      product.search(query).then((data) => {
        setSuggestions(data.items);
      })
        .finally(() => setIsLoaded(false));
    } else {
      setSuggestions([]);
    }
  };

  const onCreateItem = () => {
    if (!item) {
      return; // Not valid
    }
    setIsLoaded(true);
    setIsError(false);
    api.create(item)
      .then(() => setItem(''))
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(false));
  };

  return (
    <div className="App">
      <div>
        {isError && <Alert message="Something went wrong..." />}
        <Autocomplete
          value={item}
          suggestions={suggestions}
          onChangeHandler={onChangeAutocompleteHandler}
          onCreateItem={onCreateItem}
        />
        <List
          list={list}
          onChangeBuyStatus={onChangeBuyStatus}
          onDelete={onDelete}
        />
      </div>
      {isLoaded && <div className="Loader"></div>}
    </div>
  );
}

export default App;