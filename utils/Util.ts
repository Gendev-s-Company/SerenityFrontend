

export function getCurrency (amount: number,lang: string='fr', currency:string='MGA'){
    return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: currency,
}).format(amount)
}

export const dateToBackend = (isoString : string) => {
  if (!isoString) return "";

  const date = new Date(isoString);
  
  // 1. Ajouter manuellement 3 heures (3 * 60 * 60 * 1000 ms)
  const offsetDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));

  // 2. Convertir en format ISO et retirer le 'Z' final
  // .toISOString() donne "2026-02-23T20:00:11.960Z"
  // .replace('Z', '') donne "2026-02-23T20:00:11.960"
  return offsetDate.toISOString().replace('Z', '');
};

// Convertit les dates de format :2026-02-23T20:00:11.960Z en 23 fevrier 2026 a 00:11:960
export function timestampToText(timestamp :any) {
  const date = new Date(timestamp);

  return date.toLocaleString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Date en texte
export function formatDateFR(dateString: any) {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}


export function normalizeDateKey(dateString: string | null) {
  if(dateString === null) return null;  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function generateDateRange(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const dateArray: string[] = [];

  const currentDate = new Date(start);
  while (currentDate <= end) {
    dateArray.push(normalizeDateKey(currentDate.toISOString()));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

export const getStartOfDay = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return dateToBackend(d.toISOString());
};

export const getEndOfDay = () => {
  const d = new Date();
  d.setHours(23, 0, 0, 0);
  return dateToBackend(d.toISOString());
};

// PHOTO
// Conversion de photo en base64
export  const convertToBase64 = (buffer: number[], type: string) => {
    if (!buffer || buffer.length === 0) return "";
    const uint8Array = new Uint8Array(buffer);
    let binary = "";
    uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
    return `data:${type};base64,${buffer}`;
};