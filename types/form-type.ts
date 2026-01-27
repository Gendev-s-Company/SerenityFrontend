export type FieldConfig<T> = {
  name: keyof T;
  libelle: string;
  type: string;
  normal: boolean;
  items?: { id: string; label: string }[];
};