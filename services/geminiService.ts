
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Flight, Drone } from '../types';

export async function summarizeFlights(flights: Flight[], drones: Drone[]): Promise<string> {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "API Key not configured. Please set the API_KEY environment variable.";
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const flightData = flights.map(flight => {
    const drone = drones.find(d => d.id === flight.droneId);
    return `- Flight on ${flight.date} with ${drone?.name || 'Unknown Drone'} at ${flight.location} for ${flight.duration} minutes.`;
  }).join('\n');
  
  const prompt = `
    You are a professional drone pilot analyst.
    Based on the following flight log data, provide a concise summary of flight patterns, battery performance insights, location trends, and one actionable recommendation for the pilot.
    Format the response in Markdown. Use headings for each section (## Flight Patterns, ## Battery Performance, ## Location Trends, ## Recommendation).

    Flight Data:
    ${flightData}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while generating the summary. Please check the console for details.";
  }
}

export async function analyzeImage(imageDataBase64: string, mimeType: string): Promise<string> {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "API Key not configured. Please set the API_KEY environment variable.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const imagePart = {
    inlineData: {
      data: imageDataBase64,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: 'Analyze this image from the perspective of a drone pilot. Describe the scene, identify potential flight hazards (like power lines, trees, people), mention interesting features to capture, and suggest ideal flight conditions. Format the response in Markdown.'
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for image analysis:", error);
    return "An error occurred while analyzing the image. Please check the console for details.";
  }
}

export async function getPreFlightChecklist(locationName: string): Promise<{ text: string, groundingChunks?: any[] }> {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return { text: "API Key not configured. Please set the API_KEY environment variable." };
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a drone pre-flight safety assistant.
    Generate a pre-flight checklist for a drone flight at "${locationName}".
    Use your knowledge and available tools to provide real-time weather, identify potential hazards, and create a comprehensive checklist.

    Structure your response in Markdown with the following sections:
    ### Weather Briefing
    - Provide a quick summary of the weather (e.g., Temperature, Wind, Visibility).
    
    ### Airspace & Hazard Analysis
    - Mention any potential hazards or important considerations for this specific location (e.g., proximity to airports, parks, restricted areas).

    ### Pre-Flight Checklist
    - Create a list of 5-7 critical, actionable checklist items. Prefix each item with "[ ]".
    - Include at least two items specific to the location/environment.
    - Examples:
      - [ ] Check battery levels and temperature.
      - [ ] Verify propeller condition.
      - [ ] Scan for pedestrian traffic in the park.
      - [ ] Confirm line-of-sight is maintained around the tall buildings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      }
    });
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    return { text: response.text, groundingChunks };
  } catch (error) {
    console.error("Error calling Gemini API for pre-flight checklist:", error);
    return { text: "An error occurred while generating the pre-flight checklist. The AI model may be temporarily unavailable." };
  }
}
