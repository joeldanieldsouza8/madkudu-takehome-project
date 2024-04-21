type Callback<T> = (data: any) => T;

export default async function fetchData<T>(
  url: string,
  callback?: Callback<T>
): Promise<T> {
  try {
    const response = await fetch(url, {
      // next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    // console.log("Data fetched:", data); // debug

    // If a callback function is provided, call it with the fetched data
    if (callback) {
      const callbackData = callback(data);

      return callbackData;
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
