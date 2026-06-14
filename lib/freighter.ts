import { isConnected } from "@stellar/freighter-api";

export async function checkFreighter() {
  try {
    const result = await isConnected();

    console.log("FREIGHTER RESULT:", result);

    return result.isConnected;
  } catch (error) {
    console.error("FREIGHTER ERROR:", error);

    return false;
  }
}