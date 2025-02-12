"use server"

import { getCookies } from "@/utils/getCookies"

interface LogMoodData {
    emotion: string;
    activities: string[];
    moodScore: number;
}

interface LogMoodResponse {
    message: string;
    success: boolean;
}

export default async function logMood({ emotion, activities, moodScore }: LogMoodData): Promise<LogMoodResponse> {
    try {
        const token = (await getCookies()).accessToken;
        if (!token) {
            return {
                success: false,
                message: "No token found. Please log in again.",
            };
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dailyMood`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emotion,
                moodScore,
                activities
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to log mood. Status: ${response.status}`);
        }

        const data = await response.json();
        return {
            message: data.message,
            success: data.success,
        } as LogMoodResponse;

    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to log mood"
        } as LogMoodResponse;
    }
}