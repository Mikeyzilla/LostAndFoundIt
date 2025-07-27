-Lost & Found It
Find items fast – down to the aisle and variation – inside real store layouts.

🧠 What It Does
Lost & Found It is a search tool that helps customers locate specific products inside stores, showing:

🔍 Search results by item or variation (e.g., “Granny” finds “Granny Smith Apple”).

🗂️ Grouped results by store, section, and aisle.

🚫 If no match is found, the store still appears but clearly shows “nothing found.”

🧪 Upgraded to ElasticSearch, so you can search partial phrases like "chip" for "Chips" or "granny" for "Granny Apple".

🧱 Built With
Frontend: React (TypeScript), Axios

Backend: Spring Boot, ElasticSearch

Search: Nested Elastic queries for matching itemName and variationName with matchPhrasePrefix

🔨 Started Simple, Then Leveled Up
Before integrating ElasticSearch, I built and fully understood a custom search function that worked by:

Traversing each store, section, aisle, and item manually

Matching input text to item, variation, and brand names

Pushing matched results into a local array

This foundational search logic gave me the confidence to move into more scalable, full-text search with ElasticSearch. I still understand that original implementation completely — and it's how I validated search behavior early in the project.

🛠️ In Progress
I'm currently working on:

🗺️ Visual animation flow: Store image ➝ internal store map ➝ zoom on matching aisles ➝ results

📷 Each store gets a custom image (will visually switch if it has results)

🧠 Rebuilding complex logic: I'm breaking down and recreating sections I initially didn’t fully understand (like deeply nested ElasticSearch queries and dynamic result filtering in React)

💡 About the Build Process
Yes — I used AI (ChatGPT) during the process. But:

I didn’t just paste code and call it done.

For anything I didn’t understand, I’m rebuilding it from scratch, piece by piece, until I can explain and recreate it independently.

I’ve already reimplemented many sections and am currently working to rebuild areas like:

Nested ElasticSearch queries (itemName vs. variationName)

Filtering React results (filterVariations, getStoreResults)

Data mapping logic that conditionally renders UI based on match context