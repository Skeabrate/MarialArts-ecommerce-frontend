import React, { useEffect } from 'react';
import { useSelect } from 'downshift';

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
  filtersHandler: Function;
};

function Combobox({ items, filtersHandler }: Props) {
  const displayedItems = items.map((item) => item?.attributes.Tytul);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: displayedItems, initialSelectedItem: displayedItems[0] });

  useEffect(() => {
    filtersHandler(items.find((item) => item?.attributes.Tytul === selectedItem)?.attributes.Link);
  }, [selectedItem]);

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
