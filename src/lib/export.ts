export function serializeCssObject(styles: Record<string, string | number>): string {
  return Object.entries(styles)
    .map(([key, val]) => {
      const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  ${kebab}: ${val};`;
    })
    .join('\n');
}

export function arrayToCsv(headers: string[], rows: (string | number)[][]): string {
  const escapeCell = (val: string | number) => {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headerLine = headers.map(escapeCell).join(',');
  const rowLines = rows.map((r) => r.map(escapeCell).join(','));
  return [headerLine, ...rowLines].join('\n');
}

export function formatJsonPretty(obj: any): string {
  return JSON.stringify(obj, null, 2);
}
