import { useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelect } from 'downshift';
import { FiltersContext } from 'context/FiltersContext';
import { ComboboxProps } from './types';

function Combobox({ label, items, filterType }: ComboboxProps) {
  const router = useRouter();
  const displayedItems = useMemo(() => items.map((item) => item?.attributes.Tytul), [items]);
  const defaultValue = useMemo(
    () =>
      label
        ? false
        : items.find((item) => item?.attributes.Link === router.query[filterType])?.attributes
            .Tytul || displayedItems[0],
    [label, items, router.query, filterType, displayedItems]
  );

  const { filtersHandler } = useContext(FiltersContext);

  const {
    isOpen,
    selectedItem,
    selectItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: displayedItems, initialSelectedItem: defaultValue });

  useEffect(() => {
    if (selectedItem)
      filtersHandler(
        filterType,
        items.find((item) => item?.attributes.Tytul === selectedItem)?.attributes.Link || ''
      );
  }, [selectedItem]);

  useEffect(() => {
    if (router.query[filterType])
      selectItem(
        items.find((item) => item?.attributes.Link === router.query[filterType])?.attributes.Tytul
      );
  }, [router.query]);

  return (
    <div>
      <button type='button' {...getToggleButtonProps()}>
        {selectedItem || label}
      </button>
      <ul {...getMenuProps()}>
        {isOpen &&
          displayedItems.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Combobox;
