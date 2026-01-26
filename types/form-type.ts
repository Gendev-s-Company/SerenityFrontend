export type FieldConfig = {
  name: string;
  libelle: string;
  type: string;
  normal: boolean;
  items?: { id: string; label: string }[];
};