import { requestAccess, getAddress } from "@stellar/freighter-api";

export async function connectFreighter() {
  try {
    console.log("STEP 1");

    const access = await requestAccess();

    console.log("ACCESS:", access);

    const address = await getAddress();

    console.log("ADDRESS:", address);

    return address;
  } catch (error) {
    console.error("FREIGHTER ERROR:", error);
    return null;
  }
}