import { generateIdWithPrepend } from "@/utils/idHelpers";
import { PaymentCreateSchema, type PaymentUrlObject } from "@/types/Payment";
import { checkConnectionAndReturnClient } from "@/server/databaseClient";
import type { CampaignSupporter } from "@/types/CampaignSupporter";
import { type QuickpayEndpoints } from "@/types/Quickpay";
import destr from "destr";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const authHeader = `Basic ${Buffer.from(`:${config.quickpayApiKey}`).toString("base64")}`;
  const quickpayAPIUrl = `https://api.quickpay.net/`;
  const body = await readValidatedBody(event, (body) =>
    PaymentCreateSchema.safeParse(body),
  );
  if (!body.success) {
    console.error("Invalid body", body.error);
    throw new Error("Invalid body");
  }

  const lang = body.data.lang;
  const amount = body.data.amount;
  const quickpayAmount = amount * 100;
  const type = body.data.type;
  const email = body.data.email;
  const wantsToReceiveUpdates = body.data.wantsToReceiveUpdates;
  const wantsLifetimePremium = body.data.wantsLifetimePremium;
  const recurring = body.data.recurring;

  let currency: "USD" | "DKK" = "USD";
  switch (lang) {
    case "da":
      currency = "DKK";
      break;
    case "en":
      currency = "USD";
      break;
    default:
      throw new Error("Invalid lang");
  }

  let idPrefix = "";
  switch (type) {
    case "monthly":
      idPrefix = "mth";
      break;
    case "lifetime":
      idPrefix = "lfe";
      break;
    case "custom_once":
      idPrefix = "cmo";
      break;
    case "custom_recurring":
      idPrefix = "cmr";
      break;
    default:
      throw new Error("Invalid type");
  }

  const orderId = generateIdWithPrepend(idPrefix, 20);

  const campaignSupport: CampaignSupporter = {
    amount: amount,
    currency,
    createdAt: new Date().toISOString(),
    paymentCaptured: false,
    orderId: orderId,
    wantsToReceiveUpdates: wantsToReceiveUpdates,
    recurring,
  };
  if (email !== undefined) {
    campaignSupport.email = email;
  }
  if (
    wantsLifetimePremium &&
    (type === "lifetime" ||
      type === "custom_once" ||
      type === "custom_recurring") &&
    amount >= (currency === "DKK" ? 999 : 149)
  ) {
    campaignSupport.wantsLifetimePremium = true;
  }
  if (email === undefined && wantsLifetimePremium) {
    throw new Error("Email is required for lifetime premium");
  }
  if (currency === "DKK" && amount < 9) {
    throw new Error("Minimum amount is 9 DKK");
  } else if (currency === "USD" && amount < 2) {
    throw new Error("Minimum amount is 2 USD");
  }

  const dbClient = await checkConnectionAndReturnClient();

  dbClient.create("campaign_supporter", campaignSupport);

  try {
    const paymentUrlObject = await createOnetimePayment(
      quickpayAmount,
      orderId,
      currency,
      authHeader,
      quickpayAPIUrl,
      config.public.webPlayerUrl,
    );
    return paymentUrlObject;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create payment");
  }
});

const createOnetimePayment = async (
  quickpayAmount: number,
  orderId: string,
  currency: "USD" | "DKK",
  authHeader: string,
  quickpayAPIUrl: string,
  webPlayerUrl: string,
): Promise<PaymentUrlObject> => {
  const quickpayEndpoints: QuickpayEndpoints = {
    generalOptions: {
      headers: {
        "Accept-Version": "v10",
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    },
    createPayment: {
      url: () => "payments",
      options: {
        method: "POST",
        body: JSON.stringify({ currency: currency, order_id: orderId }),
      },
    },
    updatePayment: {
      url: (id: string) => `payments/${id}/link`,
      options: {
        method: "PUT",
        body: JSON.stringify({
          amount: quickpayAmount,
          auto_capture: true,
          continue_url: `${webPlayerUrl}/campaign/confirmation`,
          callback_url: `${webPlayerUrl}/api/payment/webhook`,
        }),
      },
    },
  };
  const createPaymentResponse = await fetch(
    `${quickpayAPIUrl}${quickpayEndpoints.createPayment.url()}`,
    {
      ...quickpayEndpoints.generalOptions,
      ...quickpayEndpoints.createPayment.options,
    },
  );
  if (!createPaymentResponse.ok) {
    const errorData = await createPaymentResponse.text();
    console.error("Payment creation failed:", errorData);
    throw new Error(
      `Failed to create payment: ${createPaymentResponse.status}`,
    );
  }
  // Extract the payment ID from QuickPay's response
  const paymentData = await createPaymentResponse.json();
  const paymentId = paymentData.id; // This is the ID from QuickPay!
  const updatePaymentResponse = await fetch(
    `${quickpayAPIUrl}${quickpayEndpoints.updatePayment.url(paymentId)}`,
    {
      ...quickpayEndpoints.generalOptions,
      ...quickpayEndpoints.updatePayment.options,
    },
  );

  if (!updatePaymentResponse.ok) {
    const errorData = await updatePaymentResponse.text();
    console.error("Payment update failed:", errorData);
    throw new Error(
      `Failed to update payment: ${updatePaymentResponse.status}`,
    );
  }
  const paymentUrlObject = destr<PaymentUrlObject>(
    await updatePaymentResponse.json(),
  );
  return paymentUrlObject;
};
/* 
const createMonthlyPayment = async (
  amount: number,
  orderId: string,
): PaymentUrlObject => {};
 */
