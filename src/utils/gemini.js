import { GoogleGenerativeAI } from "@google/generative-ai"; // Stick with this package!
import { GEMINI_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// You can simply type the new model name here
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default model;