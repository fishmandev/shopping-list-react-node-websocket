import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  
  useEffect(() => {  
    const wsConnect = () => {
      let webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER_URL);
      webSocket.onclose = () => {
        setTimeout(() => wsConnect(), 1000);
      }
      webSocket.onmessage = event => {
        setList(JSON.parse(event.data));
      }
    }
    const fetchList = () => {
      fetch(process.env.REACT_APP_API_SERVER_URL + '/lists')
        .then(response => response.json())
        .then(data => {
          setList(data.items);
        })
    }
    wsConnect();
    fetchList();

  }, []);
  return (
    <div className="App">
      <h3>Hello React!</h3>
    </div>
  );
}

export default App;
