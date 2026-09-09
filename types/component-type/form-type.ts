export type FieldOptions = {
  id: string; label: string, color?: string
}
export type FieldConfig<T> = {
  name: keyof T;
  libelle: string;
  type: string;
  normal: boolean;
  items?: FieldOptions[];
  objectMapping?: {
    idKey: string,
    labelKey: string
  };
  min?:number,
  max?:number,
  step?:number
};

export type UseFormReturn<G> = {
  getForm: G;
  resetForm: () => void;
  handleInputChange: <K extends keyof G>(name: K, value: G[K]) => void;
};