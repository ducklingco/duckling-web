import { getDBClient } from "@/server/databaseClient";
import crypto from "crypto";
import type { CampaignSupporter } from "@/types/CampaignSupporter";

const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const quickpayAPIKey = config.quickpayAPIKey;
  const headers = event.node.req.headers;
  const checksum = headers["quickpay-checksum-sha256"];
  const body = await readBody(event);
  const bodyAsString = JSON.stringify(body);
  const bodyHashed = crypto
    .createHmac("sha256", quickpayAPIKey)
    .update(bodyAsString)
    .digest("hex");

  if (checksum === bodyHashed) {
    console.log("Checksum is correct");
    try {
      if (body.type === "Payment" && body.accepted === true) {
        const orderId = body.order_id;
        const dbClient = getDBClient();

        const updatedSupporter = await dbClient.query<CampaignSupporter[]>(
          "UPDATE campaign_supporter SET paymentCaptured = true, capturedAt = $timestamp WHERE orderId = $orderId",
          {
            $timestamp: new Date().toISOString(),
            $orderId: orderId,
          },
        );

        console.log(updatedSupporter[0]);

        // Add any additional post-payment logic here
        console.log(`Payment ${orderId} successfully captured`);
      }

      // Always return 200 OK to QuickPay to acknowledge receipt
      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Webhook processing error:", error);
      // Still return 200 to QuickPay (and handle the error internally)
      return new Response("Internal processing error", { status: 200 });
    }
  } else {
    console.log("Checksum is incorrect");
  }

  // Validate the signature (you'll need QuickPay's private key)
  // const isValid = validateQuickPaySignature(signature, JSON.stringify(body), privateKey);
  // if (!isValid) {
  //   return createError({ statusCode: 401, statusMessage: 'Invalid signature' });
  // }
});
