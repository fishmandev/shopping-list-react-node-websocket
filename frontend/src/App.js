import { useState, useEffect } from 'react';
import useList from './api/useList';
import CreateItemInput from './components/CreateItemInput';
import List from './components/List';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const api = useList();

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
      api.read().then(setList).finally(() => { setIsLoaded(false) });
    }
    wsConnect();
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeBuyStatus = ({ target: { checked, dataset: { id } } }) => {
    setIsLoaded(true);
    api.update([id], checked).finally(() => { setIsLoaded(false) });
  };

  const onDelete = (id) => {
    setIsLoaded(true);
    api.remove(id).finally(() => { setIsLoaded(false) });
  };

  const onCreateItemChange = (value) => setItem(value);

  const onCreateItem = () => {
    if (!item) {
      return; // Not valid
    }
    setIsLoaded(true);
    api.create(item).then(() => {
      setItem('');
    }).finally(() => { setIsLoaded(false) });
  };

  return (
    <div className="App">
      <div>
        <CreateItemInput
          value={item}
          onCreateItemChange={onCreateItemChange}
          onCreateItem={onCreateItem}
        />
        <List
          list={list}
          onChangeBuyStatus={onChangeBuyStatus}
          onDelete={onDelete}
        />
      </div>
      { isLoaded && <div className="Loader"></div>}
    </div>
  );
}

export default App;