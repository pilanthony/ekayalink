import {
  requestAccess,
  getAddress,
  signTransaction
} from "@stellar/freighter-api";



export async function getWalletAddress() {
  try {
    return await getAddress();
  } catch (error) {
    console.error(error);
    return null;
  }
}

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

    export { signTransaction };