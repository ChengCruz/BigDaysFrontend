import { useState, useEffect } from 'react';

const useSearch = <T, >(items: T[], searchKey: keyof T) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item[searchKey]!.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items, searchKey]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
};

export default useSearch;
