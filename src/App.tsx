import { useMemo, useContext, useEffect } from 'react'
import { Context } from './context/AppContext';
import { useMediaContext } from './context/AppContext';
import { useAuthContext } from "./context/AuthContext";
import List from "./components/List";
import './App.css'

const App = () => {
  const { state, read } = useMediaContext();
  const { authenticate } = useAuthContext();

  const count = useMemo(
    () => {
      return `you have ${state.items.length} image${state.items.length > 1 ? 's': ''}`
    }, [state.items]
  );

  useEffect(() => {
    read();
    authenticate();
  }, []);
  
  return (
    <>
      <h1 className="text-center">Gallery</h1>
      {count}
      <List items={state.items} />
    </>
  );
};

export default App
