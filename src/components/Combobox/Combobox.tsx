import { useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelect } from 'downshift';
import { FiltersContext } from 'context/FiltersContext';
import { ComboboxProps } from './types';
import { CategoryType } from 'types/CategoryType';

type Props = {
  label?: string;
  filterType: string;
  items: CategoryType[];
};

function Combobox({ label, items, filterType }: Props) {
  const router = useRouter();
  const displayedItems = useMemo(() => items.map((item) => item?.attributes?.category), [items]);
  const defaultValue = useMemo(
    () =>
      label
        ? null
        : items.find((item) => item?.attributes?.category === router.query[filterType])?.attributes
            ?.category || displayedItems[0],
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
        items.find((item) => item?.attributes?.category === selectedItem)?.attributes?.category ||
          ''
      );
  }, [selectedItem]);

  useEffect(() => {
    if (router.query[filterType])
      selectItem(
        items.find((item) => item?.attributes?.category === router.query[filterType])?.attributes
          ?.category
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
