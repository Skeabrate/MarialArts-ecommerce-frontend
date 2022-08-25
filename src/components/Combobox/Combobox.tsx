import React, { useEffect, useMemo, useState } from 'react';
import { useSelect } from 'downshift';
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
  category: string;
};

function Combobox({ items, category, filtersHandler }: Props) {
  const router = useRouter();
  const displayedItems = useMemo(() => items.map((item) => item?.attributes.Tytul), [items]);
  const defaultValue = useMemo(
    () =>
      items.find((item) => item?.attributes.Link === router.query[category])?.attributes.Tytul ||
      displayedItems[0],
    [items, router.query, category, displayedItems]
  );

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
    filtersHandler(
      category,
      items.find((item) => item?.attributes.Tytul === selectedItem)?.attributes.Link
    );
  }, [selectedItem]);

  useEffect(() => {
    if (router.query[category])
      selectItem(
        items.find((item) => item?.attributes.Link === router.query[category])?.attributes.Tytul
      );
    else selectItem(displayedItems[0]);
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
