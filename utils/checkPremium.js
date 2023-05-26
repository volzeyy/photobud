import Purchases from "react-native-purchases";

async function checkPremium() {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return typeof customerInfo.entitlements.active["premium"] !== "undefined";
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export default checkPremium;
