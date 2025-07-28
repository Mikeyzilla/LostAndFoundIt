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
    if (groupResults == null) { return };
    if (groupResults.length == 0) {return <div className='nothingThere'>No Matches Found</div>}
       return groupResults.map(store => (
        <div className={`Store ${store.sections.length > 0 ? 'aisleMap' : 'redX'}`}>{store.storeName}</div>
       ))
    }
      /*//if the groupedResults.length > 0
      if (groupResults == null) {
        
        //change the div to display No Match <abovediv>No Match Found<abovediv>
        //and change set another div inside the div with a z index of 100 
        //and a background image of a red X.
        return;
      } 
      if (groupResults.length > 0) {
        //if the store has data
        groupResults.map(store => {
          //for each store, 
          //hide the store's background image 
          //which will reveal a map of the internal store underneath
          store.sections.map(section => {
            section.aisles.map(aisle => {
              
          //then, for every section, for every aisle, for every item, 
          //if the search found a match in that aisle, display a list that looks like the following
          return <ol>
            <li></li>
          </ol>
          //BrandName + variationname (or itemname) up at the top
          //if item name is the one at the top, 
          //There are X left! You can get Y - replace X with variation.amount and Y with a list of the variations
          //Find them in section Y (section.sectionName) at aisle (aisle.aisleName)
          //if variationname is up at the top
          //the only thing that changes is you get rid of the you can get Y part
            })
          })
        
        })
      }
    }
  }*/

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
