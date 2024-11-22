import { defineEventHandler, getQuery, sendError, createError } from "h3";
import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  try {
    if (event.node.req.method === "OPTIONS") {
      event.node.res.setHeader("Access-Control-Allow-Origin", "*");
      event.node.res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE",
      );
      event.node.res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
      );
      event.node.res.statusCode = 204;
      event.node.res.end();
      return;
    }

    const { proxyUrl } = getQuery(event);

    if (!proxyUrl) {
      throw new Error("No proxy URL provided");
    }

    const proxyUrlString = String(proxyUrl);

    const response = await $fetch(proxyUrlString, {
      responseType: "arrayBuffer",
    });

    // Set the correct Content-Type header
    event.node.res.setHeader("Content-Type", "application/octet-stream");

    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(response);

    // Return the buffer directly
    return buffer;
  } catch (error) {
    console.error("Proxy error:", error);
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Proxy request failed",
      }),
    );
  }
});
