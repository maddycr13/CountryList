export interface Country {
    code: string;
    name: string;
    capital: string;
    emoji: string;
    currency: string;
    languages: { name: string }[];  // Array of language objects
  }