/** Return trimmed string or undefined */
export function getText(fd: FormData, key: string): string | undefined {
  const v = String(fd.get(key) ?? '').trim();
  return v === '' ? undefined : v;
}

/** Return trimmed string or undefined — used for enums */
export function getEnum(fd: FormData, key: string): string | undefined {
  return getText(fd, key);
}

/** Return number or undefined */
export function getNumber(fd: FormData, key: string): number | undefined {
  const v = getText(fd, key);
  if (!v) return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
}

/** Return Date or undefined */
export function getDate(fd: FormData, key: string): Date | undefined {
  const v = getText(fd, key);
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/** Return boolean ("on" | "true" | "1") */
export function getBool(fd: FormData, key: string): boolean | undefined {
  const v = fd.get(key);
  if (typeof v === 'boolean') return v;
  if (typeof v !== 'string') return undefined;

  const val = v.trim().toLowerCase();
  if (val === 'on' || val === 'true' || val === '1') return true;
  if (val === 'false' || val === '0') return false;

  return undefined;
}

/** Return required trimmed string (e.g. id, companyId, role) */
export function getRequiredText(fd: FormData, key: string): string {
  return String(fd.get(key) ?? '').trim();
}
