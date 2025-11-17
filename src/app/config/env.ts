import dotenv from 'dotenv';

dotenv.config();


interface EnvVars {
    PORT: string;
    MONGO_URL: string;
}


const requiredEnvVariables: string[] = ["PORT", "MONGO_URL"];

const laodEnvVariables = (): EnvVars => {
    requiredEnvVariables.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        };
    });

    return {
        PORT: process.env.PORT as string,
        MONGO_URL: process.env.MONGO_URL as string,
    }
};

export const envVars = laodEnvVariables();