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
    const term = event.target.value.trim().toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setGroupResults(null);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/findItem', { params: { term }});
      setGroupResults(response.data.length ? response.data : []);
    } catch (error) {
      console.error('Search error:', error);
      setGroupResults([]);
    }
  }

  function getStoreResults(storeName: string) {
    if (!groupResults) return null;
    return groupResults.find(store => store.storeName === storeName) || null;
  }

  // Filter variations based on search term (case insensitive, partial)
  function filterVariations(variations: any[]) {
    if (!searchTerm) return variations;

    return variations.filter(v =>
      v.variationName.toLowerCase().includes(searchTerm)
    );
  }

  function renderReturnedResultsDynamically() {
    return hardcodedStores.map(store => {
      const storeResult = getStoreResults(store.storeName);

      // No search yet
      if (groupResults === null) {
        return (
          <div key={store.storeName} className="store">
            <h2>{store.storeName}</h2>
            <p>Search to see results</p>
          </div>
        );
      }

      // Search done but no results at all (empty array)
      if (groupResults.length === 0) {
        return (
          <div key={store.storeName} className="store no-results">
            <h2>{store.storeName}</h2>
            <div className="red-x-overlay">✗</div>
            <p style={{ color: 'red', fontStyle: 'italic' }}>Nothing found</p>
          </div>
        );
      }

      // Search done, but no results for this store
      if (!storeResult) {
        return (
          <div key={store.storeName} className="store no-results">
            <h2>{store.storeName}</h2>
            <p style={{ color: 'red', fontStyle: 'italic' }}>No match</p>
          </div>
        );
      }

      // We have results for this store — render them but filter variations
      return (
        <div key={store.storeName} className="store">
          <h2>{store.storeName}</h2>
          {storeResult.sections.map(section => (
            <div key={section.sectionName} className="section">
              <h3>{section.sectionName}</h3>
              {section.aisles.map(aisle => (
                <div key={aisle.aisleName} className="aisle">
                  <h4>{aisle.aisleName}</h4>
                  <ol>
                    {aisle.items.map(item => {
                      // Filter variations based on search term
                      const filteredVars = filterVariations(item.variations);
                      if (filteredVars.length === 0) return null; // no matching variations for this item, skip

                      return (
                        <li key={item.itemName}>
                          {item.itemName} - {filteredVars.map(v => v.brandName).join(', ')} - {filteredVars.map(v => v.amount).reduce((a,b) => a+b, 0)}
                          <ul>
                            {filteredVars.map(v => (
                              <li key={v.variationName} style={{ fontStyle: 'italic', color: '#555' }}>
                                Variation: {v.variationName}
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    });
  }

  return (
    <main className="StoreFinderPage">
      <h1>Lost & Found It</h1>
      <input
        type="text"
        onChange={beginSearch}
        placeholder="Search items or variations..."
        value={searchTerm}
      />
      <div className="storeGrid">
        {renderReturnedResultsDynamically()}
      </div>
    </main>
  );
}

export default App;
