import { checkConnectionAndReturnClient } from "@/server/databaseClient";
import crypto from "crypto";
import type { CampaignSupporter } from "@/types/CampaignSupporter";

/* export default defineEventHandler(async (event) => {
  const quickpayAPIKey = config.quickpayApiKey;
  const headers = event.node.req.headers;
  console.log(headers);
  const checksum = headers["quickpay-checksum-sha256"];
  const rawBody = await readRawBody(event);
  if (rawBody) {
    const rawBodyString = rawBody.toString();
    const bodyHashed = crypto
      .createHmac("sha256", quickpayAPIKey)
      .update(rawBodyString)
      .digest("hex");

    if (checksum === bodyHashed) {
      try {
        console.log("Checksum is correct");
        const body = JSON.parse(rawBodyString);
        if (body.type === "Payment" && body.accepted === true) {
          const orderId = body.order_id;
          const dbClient = await checkConnectionAndReturnClient();

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
      return new Response("Checksum is incorrect", { status: 400 });
    }
  }
  return new Response("No body", { status: 400 });
}); */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  // Make sure this matches the environment variable name in docker-compose.yml
  const quickpayApiKey = config.quickpayApiKey;

  const headers = event.node.req.headers;
  const checksum = headers["quickpay-checksum-sha256"] as string;

  try {
    // First parse the body
    const body = await readBody(event);

    // Then re-serialize it exactly as QuickPay expects
    const bodyAsString = JSON.stringify(body);

    // Calculate the HMAC
    const bodyHashed = crypto
      .createHmac("sha256", quickpayApiKey)
      .update(bodyAsString)
      .digest("hex");

    if (checksum === bodyHashed) {
      console.log("✅ Checksum verified!");

      if (body.type === "Payment" && body.accepted === true) {
        const orderId = body.order_id;
        const dbClient = await checkConnectionAndReturnClient();

        await dbClient.query(
          "UPDATE campaign_supporter SET paymentCaptured = true, capturedAt = $timestamp WHERE orderId = $orderId",
          {
            $timestamp: new Date().toISOString(),
            $orderId: orderId,
          },
        );

        console.log(`Payment ${orderId} successfully captured`);
      }
    } else {
      console.log("❌ Invalid checksum");
    }

    // Always return 200 to QuickPay
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response("Error processing webhook", { status: 200 });
  }
});
