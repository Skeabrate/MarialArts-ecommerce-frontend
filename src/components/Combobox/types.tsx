type ItemProps = {
  __typename?: string;
  id: string;
  attributes: {
    __typename?: string;
    Tytul: string;
    Link: string;
  };
};

export type ComboboxProps = {
  label?: string;
  items: (ItemProps | undefined | null)[];
  filterType: string;
};
