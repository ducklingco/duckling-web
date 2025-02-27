import type Surreal from "surrealdb";
import type { CampaignSupporter } from "@/types/CampaignSupporter";

export const createCampaignSupporter = async (supporter: CampaignSupporter, dbClient: Surreal): Promise<boolean> => {
    try {
        const response = await dbClient.create("campaignSupporter", supporter);
        return true;
    } catch (error) {
        console.log("An error occurred while creating the campaign supporter:", error);
        throw error;
    }
}