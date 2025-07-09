export type ApiResponse<T> = {
  status: number;
  statusMsg: string;
  data: T;
};

function isDateField(key: string): boolean {
  return ["createdAt", "updatedAt", "dueDate"].includes(key);
}

function convertDates<T extends Record<string, any>>(obj: T): T {
  const copy = { ...obj };

  for (const key in copy) {
    if (isDateField(key) && typeof copy[key] === "string") {
      (copy[key] as unknown) = new Date(copy[key]);
    }
  }

  return copy;
}

export async function parseApiResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} - ${errorText}`);
  }

  const json = (await res.json()) as ApiResponse<T>;

  const data = json.data;

  if (Array.isArray(data)) {
    return data.map((item) => convertDates(item as Record<string, any>)) as T;
  }

  return convertDates(data as Record<string, any>) as T;
}
