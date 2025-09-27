// Helper functions to handle traditional REST response format

// Use the Fetch API Response type that's available in Node.js 18+
interface FetchResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json(): Promise<unknown>;
}

interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  nextAction?: string;
}

export async function handleApiResponse(response: FetchResponse): Promise<unknown> {
  const responseData = await response.json();

  // Handle traditional REST format
  if (!response.ok) {
    // Error response
    const errorData = responseData as ErrorResponse;
    let fullMessage = errorData.message || errorData.error || 'Unknown error';

    // Append nextAction if available
    if (errorData.nextAction) {
      fullMessage += `. ${errorData.nextAction}`;
    }

    throw new Error(fullMessage);
  }

  // Success response - data returned directly
  return responseData;
}

export function formatSuccessMessage(operation: string, data: unknown): string {
  // If data contains a message, use it
  if (data && typeof data === 'object' && data !== null && 'message' in data) {
    const dataWithMessage = data as { message: string };
    return `${dataWithMessage.message}\n${JSON.stringify(data, null, 2)}`;
  }

  // Otherwise, create a generic success message
  return `${operation} completed successfully:\n${JSON.stringify(data, null, 2)}`;
}
