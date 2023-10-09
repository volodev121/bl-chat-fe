
export const tokenEndpoint = process.env.API_LOCATION === 'local' ? "http://localhost:3001/api/v1/auth/" : "https://llm-storage.brandslisten.com/api/v1/auth/";

export const configEndpoint = process.env.API_LOCATION === 'local' ? "http://localhost:9682/config" : "https://llm-storage.brandslisten.com/config";

export const historyEndpoint = process.env.API_LOCATION === 'local' ? "http://localhost:9756/history" : "https://llm-storage.brandslisten.com/history";

export const ratingEndpoint = process.env.API_LOCATION === 'local' ? "http://localhost:9132/rating" : "https://llm-storage.brandslisten.com/rating";

export const chatEndpoint = process.env.API_LOCATION === 'local' ? "http://localhost:9968/chat" : "https://llm-storage.brandslisten.com/chat";

export const streamEndpoint = process.env.API_LOCATION === 'local' ? "http://localhost:9968/stream" : "https://llm-storage.brandslisten.com/stream";
