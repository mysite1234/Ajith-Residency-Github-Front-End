const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Generic API function
 */
export async function apiRequest(
  endpoint,
  {
    method = "GET",
    body,
    headers = {},
    token,
  } = {}
) {
  // ✅ FRONTEND-ONLY SAFETY
  if (!BASE_URL) {
    console.warn("API disabled: NEXT_PUBLIC_API_BASE_URL not set");
    return null; // or throw controlled error
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
}
