
// Utility to safely handle Supabase row data and avoid type recursion issues
export function safelyExtractRowData(data: unknown): Record<string, any> {
  return data as Record<string, any>;
}
