import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import Additem from './Additem';
import SearchItem from './SearchItem';
import apiRequest from './ApiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchErrore, setFetchErrore] = useState(null);
  const [isLoading, setIsLoaoding] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listeItems = await response.json();
        setItems(listeItems);
        setFetchErrore(null);
      } catch (err) {
        setFetchErrore(err);
      } finally {
        setIsLoaoding(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);
  }, []);

  const addItem = async (item) => {
    const itemId = items.length === 0 ? 1 : items[items.length - 1].id + 1;
    const newItem = {
      id: itemId,
      cheked: false,
      item: item,
    };
    const listItems = [...items, newItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    };

    const resault = await apiRequest(API_URL, postOptions);
    if (resault) setFetchErrore(resault);
  };

  const handelCheked = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, cheked: !item.cheked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOption = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cheked: myItem[0].cheked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const resault = await apiRequest(reqUrl, updateOption);
    if (resault) setFetchErrore(resault);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOptions = {
      method: 'DELETE',
    };
    const reqUrl = `${API_URL}/${id}`;
    const response = await apiRequest();
    const resault = await apiRequest(reqUrl, deleteOptions);
    if (resault) setFetchErrore(resault);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  return (
    <div className="App">
      <Header />
      <Additem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && (
          <div className="loadingPage">
            <div className="cadreAnimation">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>LOADING...</p>
          </div>
        )}
        {fetchErrore && <p style={{ color: 'red' }}>{`${fetchErrore}`}</p>}
        {!fetchErrore && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
            handelCheked={handelCheked}
            length={items.length}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
