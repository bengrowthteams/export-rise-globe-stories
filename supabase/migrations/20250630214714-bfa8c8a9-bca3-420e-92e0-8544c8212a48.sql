
-- Enable Row Level Security on the Country Data table
ALTER TABLE public."Country Data" ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read the country data
-- This is appropriate for public economic/export data
CREATE POLICY "Allow public read access to country data" 
  ON public."Country Data" 
  FOR SELECT 
  USING (true);

-- Create a policy that prevents unauthorized writes
-- Only authenticated users with specific permissions could write (if needed later)
CREATE POLICY "Restrict write access to country data" 
  ON public."Country Data" 
  FOR INSERT 
  WITH CHECK (false);

CREATE POLICY "Restrict update access to country data" 
  ON public."Country Data" 
  FOR UPDATE 
  USING (false);

CREATE POLICY "Restrict delete access to country data" 
  ON public."Country Data" 
  FOR DELETE 
  USING (false);
