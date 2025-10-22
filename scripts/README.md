# Data Export Scripts

## Overview

This directory contains scripts for exporting data from Supabase to static JSON files for improved performance.

## Export Supabase Data

The `exportSupabaseData.ts` script exports all data from the Supabase 'Country Data' table to `src/data/staticCountryData.json`.

### Prerequisites

1. Make sure you have the `SUPABASE_SERVICE_ROLE_KEY` environment variable set
2. Install dependencies if not already installed

### Running the Export

```bash
# Using tsx (recommended)
npx tsx scripts/exportSupabaseData.ts

# Or using ts-node
npx ts-node scripts/exportSupabaseData.ts
```

### When to Run

Run this script whenever:
- The Supabase data has been updated
- You want to refresh the static data cache
- After major data changes in the database

### What It Does

1. Connects to Supabase using the service role key
2. Fetches all records from the 'Country Data' table
3. Creates a timestamped export with version information
4. Writes to `src/data/staticCountryData.json`
5. The application will automatically use this static data for faster loading

### Output Format

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-01-24T10:00:00Z",
  "rawData": [...]
}
```

### Cache Invalidation

After running the export script:
1. Users will automatically get the new data on their next visit
2. The localStorage cache will be updated with the new version
3. No manual cache clearing needed - the version system handles it automatically
