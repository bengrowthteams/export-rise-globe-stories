-- Update sector name from 'Textile' to 'Textiles' in Country Data table
UPDATE public."Country Data"
SET "Sector" = 'Textiles'
WHERE "Sector" = 'Textile';