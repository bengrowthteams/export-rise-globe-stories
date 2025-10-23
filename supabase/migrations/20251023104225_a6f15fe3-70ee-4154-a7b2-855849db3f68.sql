-- Spell out Private Sector acronyms
UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' GTI ', ' Garment Technology International (GTI) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% GTI %';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' MENA ', ' Middle East and North Africa (MENA) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% MENA %';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' UAE ', ' United Arab Emirates (UAE) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% UAE %';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' JICA ', ' Japan International Cooperation Agency (JICA) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% JICA %';

-- Spell out External Factors acronyms
UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' CBTPA ', ' Caribbean Basin Trade Partnership Act (CBTPA) ')
WHERE "External Factors - One Bullet Summary" LIKE '% CBTPA %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", 'CBTPA (', 'Caribbean Basin Trade Partnership Act (CBTPA) (')
WHERE "External Factors - One Bullet Summary" LIKE 'CBTPA (%';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' CAFTA-DR', ' Central America Free Trade Agreement-Dominican Republic (CAFTA-DR)')
WHERE "External Factors - One Bullet Summary" LIKE '% CAFTA-DR%';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", 'DR-CAFTA', 'Dominican Republic-Central America Free Trade Agreement (DR-CAFTA)')
WHERE "External Factors - One Bullet Summary" LIKE '%DR-CAFTA%';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' IFC/', ' International Finance Corporation (IFC)/')
WHERE "External Factors - One Bullet Summary" LIKE '% IFC/%';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", '/DEG ', '/Deutsche Investitions- und Entwicklungsgesellschaft (DEG) ')
WHERE "External Factors - One Bullet Summary" LIKE '%/DEG %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' JICA ', ' Japan International Cooperation Agency (JICA) ')
WHERE "External Factors - One Bullet Summary" LIKE '% JICA %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' QIZ ', ' Qualifying Industrial Zone (QIZ) ')
WHERE "External Factors - One Bullet Summary" LIKE '% QIZ %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' MENA ', ' Middle East and North Africa (MENA) ')
WHERE "External Factors - One Bullet Summary" LIKE '% MENA %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' UAE ', ' United Arab Emirates (UAE) ')
WHERE "External Factors - One Bullet Summary" LIKE '% UAE %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE(REPLACE("External Factors - One Bullet Summary", ' IMF', ' International Monetary Fund (IMF)'), ' IMF-', ' International Monetary Fund (IMF)-')
WHERE "External Factors - One Bullet Summary" LIKE '% IMF%';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE(REPLACE("External Factors - One Bullet Summary", ' GSP', ' Generalized Scheme of Preferences (GSP)'), ' GSP,', ' Generalized Scheme of Preferences (GSP),')
WHERE "External Factors - One Bullet Summary" LIKE '% GSP%';