import React, { useEffect } from 'react';
import { useSelect } from 'downshift';
import { ALL_PRODUCTS } from 'utils/filtersValues';
import { useRouter } from 'next/router';

type ItemProps = {
  __typename?: string;
  id: string;
  attributes: {
    __typename?: string;
    Tytul: string;
    Link: string;
  };
};

type Props = {
  items: (ItemProps | undefined | null)[];
  defaultValue?: string;
  filtersHandler: Function;
};

function Combobox({ items, defaultValue, filtersHandler }: Props) {
  const router = useRouter();
  const displayedItems = items.map((item) => item?.attributes.Tytul);

  const {
    isOpen,
    selectedItem,
    selectItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: displayedItems, initialSelectedItem: defaultValue || displayedItems[0] });

  useEffect(() => {
    filtersHandler(items.find((item) => item?.attributes.Tytul === selectedItem)?.attributes.Link);
  }, [selectedItem]);

  useEffect(() => {
    if (!Object.entries(router.query).length) selectItem(displayedItems[0]);
  }, [router.query]);

  return (
    <div>
      <button type='button' {...getToggleButtonProps()}>
        {selectedItem}
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
