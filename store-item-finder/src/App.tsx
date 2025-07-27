import { useState } from 'react';
import axios from 'axios';
import './App.css';
import type { StoreInformation } from './types';

function App() {
  const hardcodedStores = [
    { storeName: 'Store A' },
    { storeName: 'Store B' },
    { storeName: 'Store C' },
    { storeName: 'Store D' },
    { storeName: 'Store E' },
    { storeName: 'Store F' },
    { storeName: 'Store G' },
    { storeName: 'Store H' },
    { storeName: 'Store I' }
  ];

  const [groupResults, setGroupResults] = useState<StoreInformation[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  async function beginSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchTerm(searchTerm);

    try {
      const response = await axios.get('http://localhost:8080/findItem', { params: { term }});
      setGroupResults(response.data.length ? response.data : []);
    } catch (error) {
      console.error('Search error:', error);
      setGroupResults([]);
    }
  }

  function renderReturnedResultsDynamically() {
    return hardcodedStores.map(store => {
      const storeResult = getStoreResults(store.storeName);

      return (
        <div key={store.storeName} className="store">
        </div>
      )})
  }

  return (
    <main className="StoreFinderPage">
      <h1>Lost & Found It</h1>
      <input
        type="text"
        onChange={beginSearch}
        value={searchTerm}
      />
      <div className="storeGrid">
        {renderReturnedResultsDynamically()}
      </div>
    </main>
  );
}

export default App;
