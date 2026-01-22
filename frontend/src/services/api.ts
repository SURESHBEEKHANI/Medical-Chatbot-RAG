// API client for the Medical Chatbot backend

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface MedicalQuery {
  question: string;
}

export interface MedicalAnswer {
  answer: string;
}

/**
 * Ask a medical question to the RAG-powered chatbot
 */
export async function askMedicalQuestion(
  question: string
): Promise<MedicalAnswer> {
  const url = `${API_BASE_URL}/api/ask`;
  console.log("📤 Sending request to:", url);
  console.log("📝 Question:", question);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    console.log("📥 Response status:", response.status);

    if (!response.ok) {
      let errorMsg = "Failed to get response from medical chatbot";
      try {
        const error = await response.json();
        errorMsg = error.detail || error.message || errorMsg;
      } catch (e) {
        // If response is not JSON, use status text
        errorMsg = response.statusText || errorMsg;
      }
      console.error("❌ API Error:", errorMsg);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    console.log("✅ Success! Response:", data);
    return data;
  } catch (error) {
    console.error("🔥 Caught error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error or server unavailable");
  }
}

/**
 * Health check for the backend API
 */
export async function checkHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend is not available");
  }

  return response.json();
}
