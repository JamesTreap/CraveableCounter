import { fetchDataFromCollection } from "../firebase";

interface counts {
  id: string;
  count: number;
  lastTimestamp: Date;
  title: string;
}

export async function getCounts() {
  const data = await fetchDataFromCollection("data");

  const transformedData = data.map((item: any) => {
    let lastTimestampValue: Date;

    // Check if lastTimestamp exists and has the toDate method (characteristic of a Firestore Timestamp)
    if (item?.lastTimestamp && typeof item.lastTimestamp.toDate === "function") {
      lastTimestampValue = item.lastTimestamp.toDate();
    } else {
      console.warn(
        `'lastTimestamp' field for item with ID ${
          item.id || "unknown"
        } is not a Firestore Timestamp or is missing. Defaulting to current date.`
      );
      lastTimestampValue = new Date();
    }

    return {
      ...item,
      lastTimestamp: lastTimestampValue, // Override with the converted Date object
    };
  });

  return transformedData as counts[];
}
