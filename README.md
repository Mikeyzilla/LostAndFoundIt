Lost & Found It
Find items fast – down to the aisle and variation – inside real store layouts.

🧠 What It Does
Lost & Found It is a search tool that helps customers locate specific products inside stores, showing:

🔍 Search results by item or variation (e.g., searching “Granny” finds “Granny Smith Apple”).

🗂️ Grouped results organized by store, section, and aisle.

🚫 Stores with no matches still appear clearly marked as “nothing found.”

🧪 Powered by ElasticSearch, enabling partial phrase matching like "chip" for "Chips" or "granny" for "Granny Apple".

🧱 Built With
Frontend: React (TypeScript), Axios

Backend: Spring Boot, ElasticSearch

Search: Nested ElasticSearch queries matching both itemName and variationName via matchPhrasePrefix.

🔨 Development Journey
I originally built a custom search implementation from scratch before integrating ElasticSearch. This foundational logic:

Traversed each store, section, aisle, and item manually

Matched input text against item, variation, and brand names

Compiled matched results into a local array

Building this myself gave me full understanding and confidence in how the search should behave, and served as a vital baseline to validate the ElasticSearch integration.

Since then, I have fully internalized and refined the entire search and rendering logic — everything is my original work, carefully designed, and rebuilt step-by-step. This includes:

Deeply nested ElasticSearch queries for item and variation matching

Complex React filtering logic (filterVariations, getStoreResults)

Data mapping and conditional rendering based on detailed match context

🛠️ Current Focus

Adding custom images per store that visually indicate match status

Don't just return the first match, instead return the first match but add in a view all matches button

Add in styling and decorations to make it less barebones.