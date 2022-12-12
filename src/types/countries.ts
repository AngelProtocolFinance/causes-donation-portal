export type Country = {
  flags: { png?: string; svg?: string };
  name: {
    common: string;
  };
};

export type CountryOption = {
  name: string;
  flag: string;
};
