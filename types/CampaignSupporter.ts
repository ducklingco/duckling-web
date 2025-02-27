export type CampaignSupporter = {
  amount: number;
  currency: "USD" | "DKK";
  createdAt: string;
  paymentCaptured: boolean;
  capturedAt?: string;
  orderId: string;
  wantsToReceiveUpdates: boolean;
  email?: string;
  wantsLifetimePremium?: boolean;
  recurring: boolean;
};
