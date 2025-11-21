export type SelectOption = {
  value: string;
  label: string;
};

export type EnumLabelFormat = 'humanize' | 'uppercase' | 'lowercase';

export function humanizeEnum(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatEnumLabel(
  value: string,
  format: EnumLabelFormat = 'humanize',
): string {
  switch (format) {
    case 'uppercase':
      return value.toUpperCase();
    case 'lowercase':
      return value.toLowerCase();
    case 'humanize':
    default:
      return humanizeEnum(value);
  }
}

export function buildEnumOptions<T extends Record<string, string>>(
  enumObj: T,
  format: EnumLabelFormat = 'humanize',
): SelectOption[] {
  return Object.values(enumObj).map((value) => ({
    value,
    label: formatEnumLabel(value, format),
  }));
}
