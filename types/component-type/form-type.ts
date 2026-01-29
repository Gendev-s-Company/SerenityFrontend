export type FieldConfig<T> = {
  name: keyof T;
  libelle: string;
  type: string;
  normal: boolean;
  items?: { id: string; label: string }[];
};

export type UseFormReturn<G> = {
  getForm: G;
  resetForm: () => void;
  handleInputChange: <K extends keyof G>(name: K, value: G[K]) => void;
};