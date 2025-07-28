import { useEffect, useState} from 'react';
import './App.css';
import type { StoreInformation } from './types';
import axios from 'axios';

type StoreStage = 'neutral' | 'loading' | 'list' | 'no-results';

function App() {
  const [groupResults, setGroupResults] = useState<StoreInformation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [storeStages, setStoreStages] = useState<Record<string, StoreStage>>({});

  useEffect(() => {
    fetchStores(searchTerm);
  }, []);

  async function fetchStores(term: string) {
    try {
      const response = await axios.get<StoreInformation[]>('http://localhost:8080/findItem', {
        params: { term },
      });
      const data = response.data;
      setGroupResults(data);
      initialDisplay(data);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  }

  function initialDisplay(stores: StoreInformation[]) {
    const neutralStages: Record<string, StoreStage> = {};
    for (const store of stores) {
      neutralStages[store.storeName] = 'neutral';
    }
    setStoreStages(neutralStages);
  }

  function foundResults(store: StoreInformation): boolean {
    return store.sections?.some((section) =>
      section.aisles?.some((aisle) =>
        aisle.items?.some((item) =>
          item.itemName.toLowerCase().includes(searchTerm) ||
          item.variations?.some((v) => v.variationName.toLowerCase().includes(searchTerm))
        )
      )
    ) ?? false;
  }

  function showRedX(storeName: string) {
    setStoreStages((prev) => ({ ...prev, [storeName]: 'no-results' }));
  }

  function setCertainStoresToAisleView(storeName: string) {
    setStoreStages((prev) => ({ ...prev, [storeName]: 'loading' }));
  }

  function changeAisleToListView(storeName: string) {
    setStoreStages((prev) => ({ ...prev, [storeName]: 'list' }));
  }

  function beginSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event.target.value.trim().toLowerCase();
    setSearchTerm(term);

    if (!term) {
      fetchStores('');
      return;
    }

    for (const store of groupResults) {
      if (foundResults(store)) {
        setCertainStoresToAisleView(store.storeName);
        setTimeout(() => changeAisleToListView(store.storeName), 1000);
      } else {
        showRedX(store.storeName);
      }
    }
  }

  function renderListView(store: StoreInformation) {
    for (const section of store.sections) {
      for (const aisle of section.aisles) {
        for (const item of aisle.items) {
          const itemNameMatch = item.itemName.toLowerCase().includes(searchTerm);
          const matchingVariations = item.variations.filter(v =>
            v.variationName.toLowerCase().includes(searchTerm)
          );

          if (itemNameMatch) {
            const totalAmount = item.variations.reduce((sum, v) => sum + v.amount, 0);
            const variationNames = item.variations.map(v => v.variationName);
            return (
              <div
                key={`${item.itemName}-${aisle.aisleName}`}
                style={{ marginTop: '-12%' }}
              >
                <h4 className="item-header" style={{ textAlign: 'center' }}>{item.itemName}</h4>
                <p className="item-count">There are {totalAmount} left!</p>
                <p className="item-variations">
                  You can pick from: {variationNames.join(', ')}
                </p>
                <p className="item-location">
                  Find them in the {section.sectionName} section on {aisle.aisleName}!
                </p>
              </div>
            );
          } else if (matchingVariations.length > 0) {
            const variation = matchingVariations[0];
            return (
              <div
                key={`${variation.variationName}-${aisle.aisleName}`}
                style={{ marginTop: '-12%' }}
              >
                <h4 style={{ textAlign: 'center' }}>{variation.variationName}</h4>
                <p style={{
                  margin: '4px 0',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  There are {variation.amount} left!
                </p>
                <p style={{
                  margin: '4px 0',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  Find them in the {section.sectionName} section on {aisle.aisleName}!
                </p>
              </div>
            );
          }
        }
      }
    }

    return <p>No matching items found.</p>;
  }

  function renderReturnedResultsDynamically() {
    return groupResults.map((store) => {
      const stage = storeStages[store.storeName] || 'neutral';

      switch (stage) {
        case 'neutral':
          return <div key={store.storeName} className="Store neutral">{store.storeName}</div>;

        case 'loading':
          return (
            <div key={store.storeName} className="Store aisleView">
              <h3>{store.storeName}</h3>
              {store.sections.map((section, idx) => (
                <div key={idx}>
                  <strong>{section.sectionName}</strong>
                  {section.aisles.map((aisle, aIdx) => (
                    <p key={aIdx}>{aisle.aisleName}</p>
                  ))}
                </div>
              ))}
            </div>
          );

        case 'list':
          return (
            <div key={store.storeName} className="Store listView">
              <h3>{store.storeName}</h3>
              {renderListView(store)}
            </div>
          );

        case 'no-results':
          return (
            <div key={store.storeName} className="Store noResults">
              {store.storeName}
              <div className="redX">❌</div>
            </div>
          );

        default:
          return null;
      }
    });
  }

  return (
    <main className="StoreFinderPage">
      <h1>Lost & Found It</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={beginSearch}
        className='searchBar'
        placeholder="Search for an item..."
      />
      <div className="storeGrid">
        {renderReturnedResultsDynamically()}
      </div>
    </main>
  );
}

export default App;
