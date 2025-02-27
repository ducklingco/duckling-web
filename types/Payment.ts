import { z } from "zod";

export const PaymentCreateSchema = z.object({
  lang: z.union([z.literal("da"), z.literal("en")]),
  type: z.union([
    z.literal("monthly"),
    z.literal("lifetime"),
    z.literal("custom_once"),
    z.literal("custom_recurring"),
  ]),
  amount: z.number(),
  email: z.string().optional(),
  wantsToReceiveUpdates: z.boolean(),
  wantsLifetimePremium: z.boolean().optional(),
  recurring: z.boolean(),
});

export type PaymentCreateBody = z.infer<typeof PaymentCreateSchema>;

export type PaymentUrlObject = {
  url: string;
};
