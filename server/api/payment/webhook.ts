import { checkConnectionAndReturnClient } from "@/server/databaseClient";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const quickpayPrivateKey = config.quickpayPrivateKey;
  const checksum = getHeader(event, "quickpay-checksum-sha256");
  const rawBody = await readRawBody(event);
  if (rawBody) {
    const rawBodyString = rawBody.toString();
    const bodyHashed = crypto
      .createHmac("sha256", quickpayPrivateKey)
      .update(rawBodyString)
      .digest("hex");

    if (checksum === bodyHashed) {
      try {
        console.log("Checksum is correct");
        const body = JSON.parse(rawBodyString);
        if (body.type === "Payment" && body.accepted === true) {
          const orderId = body.order_id;
          const dbClient = await checkConnectionAndReturnClient();

          await dbClient.query(
            "UPDATE campaign_supporter SET paymentCaptured = true, capturedAt = $timestamp WHERE orderId = $orderId;",
            {
              timestamp: new Date().toISOString(),
              orderId: orderId,
            },
          );

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
});

/* export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const quickpayPrivateKey = config.quickpayPrivateKey;

  try {
    const headers = getHeaders(event);
    const checksum = headers["quickpay-checksum-sha256"] as string;

    if (!checksum) {
      console.log("❌ Checksum missing");
      return new Response("Checksum missing", { status: 400 });
    }

    const rawBodyString = await readRawBody(event, "utf-8");
    if (!rawBodyString) {
      console.log("❌ Request body missing");
      return new Response("Request body missing", { status: 400 });
    }

    // First parse the body
    const body = await readBody(event);

    // Calculate the HMAC
    const bodyHashed = crypto
      .createHmac("sha256", quickpayPrivateKey)
      .update(rawBodyString)
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
      // Try another approach - parse and re-stringify
      const parsedBody = JSON.parse(rawBodyString);
      const restringified = JSON.stringify(parsedBody);
      const alternateHash = crypto
        .createHmac("sha256", quickpayPrivateKey)
        .update(restringified)
        .digest("hex");

      console.log(`🔄 Alternative calculated checksum: ${alternateHash}`);

      if (checksum === alternateHash) {
        console.log("✅ Alternative checksum verified!");
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
        console.error("❌ Checksum verification failed with both methods");
      }
    }

    // Always return 200 to QuickPay
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response("Error processing webhook", { status: 200 });
  }
}); */
