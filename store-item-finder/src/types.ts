export interface Variation {
  variationName: string;
  brandName: string;
  amount: number;
}

export interface Item {
  itemName: string;
  variations: Variation[];
}

export interface Aisle {
  aisleName: string;
  items: Item[];
}

export interface Section {
  sectionName: string;
  aisles: Aisle[];
}

export interface StoreInformation {
  storeName: string;
  sections: Section[];
}
