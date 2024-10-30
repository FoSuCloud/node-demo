import { Configuration, OpenAIApi } from "openai";
console.log("openai====================")
const configuration = new Configuration({
    organization: "",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
console.log(openai)
const response = await openai.listEngines();
console.log(response.status,response.statusText,response.data)
