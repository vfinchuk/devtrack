export type FormState<TFields extends string, TValues extends object = {}> = {
  message?: string;
  errors?: Partial<Record<TFields, string[]>>;
  values?: Partial<TValues>;
};
