-- Spell out FDI in all three summary columns
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE(REPLACE(REPLACE("Public Sector - One Bullet Summary", ' FDI ', ' Foreign Direct Investment (FDI) '), ' FDI,', ' Foreign Direct Investment (FDI),'), ' FDI.', ' Foreign Direct Investment (FDI).')
WHERE "Public Sector - One Bullet Summary" LIKE '% FDI %' OR "Public Sector - One Bullet Summary" LIKE '% FDI,%' OR "Public Sector - One Bullet Summary" LIKE '% FDI.%';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE(REPLACE(REPLACE("Private Sector - One Bullet Summary", ' FDI ', ' Foreign Direct Investment (FDI) '), ' FDI,', ' Foreign Direct Investment (FDI),'), ' FDI.', ' Foreign Direct Investment (FDI).')
WHERE "Private Sector - One Bullet Summary" LIKE '% FDI %' OR "Private Sector - One Bullet Summary" LIKE '% FDI,%' OR "Private Sector - One Bullet Summary" LIKE '% FDI.%';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE(REPLACE(REPLACE("External Factors - One Bullet Summary", ' FDI ', ' Foreign Direct Investment (FDI) '), ' FDI,', ' Foreign Direct Investment (FDI),'), ' FDI.', ' Foreign Direct Investment (FDI).')
WHERE "External Factors - One Bullet Summary" LIKE '% FDI %' OR "External Factors - One Bullet Summary" LIKE '% FDI,%' OR "External Factors - One Bullet Summary" LIKE '% FDI.%';

-- Spell out EU
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' EU ', ' European Union (EU) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% EU %';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' EU ', ' European Union (EU) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% EU %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE(REPLACE("External Factors - One Bullet Summary", ' EU ', ' European Union (EU) '), 'EU''s ', 'European Union''s (EU) ')
WHERE "External Factors - One Bullet Summary" LIKE '% EU %' OR "External Factors - One Bullet Summary" LIKE 'EU''s %';

-- Spell out RMG
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' RMG ', ' Ready-Made Garment (RMG) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% RMG %';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' RMG ', ' Ready-Made Garment (RMG) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% RMG %';

-- Spell out SOEs and SOE
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE(REPLACE("Public Sector - One Bullet Summary", ' SOEs ', ' State-Owned Enterprises (SOEs) '), ' SOE ', ' State-Owned Enterprise (SOE) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% SOEs %' OR "Public Sector - One Bullet Summary" LIKE '% SOE %';

-- Spell out R&D
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' R&D ', ' Research and Development (R&D) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% R&D %';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' R&D ', ' Research and Development (R&D) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% R&D %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' R&D ', ' Research and Development (R&D) ')
WHERE "External Factors - One Bullet Summary" LIKE '% R&D %';

-- Spell out SMEs and SME
UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE(REPLACE("Private Sector - One Bullet Summary", ' SMEs ', ' Small and Medium Enterprises (SMEs) '), ' SME ', ' Small and Medium Enterprise (SME) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% SMEs %' OR "Private Sector - One Bullet Summary" LIKE '% SME %';

-- Spell out CAP
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' CAP ', ' Common Agricultural Policy (CAP) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% CAP %';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' CAP ', ' Common Agricultural Policy (CAP) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% CAP %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' CAP ', ' Common Agricultural Policy (CAP) ')
WHERE "External Factors - One Bullet Summary" LIKE '% CAP %';

-- Spell out SEZ
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' SEZ ', ' Special Economic Zone (SEZ) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% SEZ %';

UPDATE "Country Data"
SET "Private Sector - One Bullet Summary" = REPLACE("Private Sector - One Bullet Summary", ' SEZ ', ' Special Economic Zone (SEZ) ')
WHERE "Private Sector - One Bullet Summary" LIKE '% SEZ %';

UPDATE "Country Data"
SET "External Factors - One Bullet Summary" = REPLACE("External Factors - One Bullet Summary", ' SEZ ', ' Special Economic Zone (SEZ) ')
WHERE "External Factors - One Bullet Summary" LIKE '% SEZ %';

-- Spell out FTZ
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' FTZ ', ' Free Trade Zone (FTZ) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% FTZ %';

-- Spell out specific organization acronyms
UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' CDC ', ' Council for Development of Cambodia (CDC) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% CDC %';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' MTDC', ' Myanmar Trade Development Committee (MTDC)')
WHERE "Public Sector - One Bullet Summary" LIKE '% MTDC%';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' SBW ', ' Special Bonded Warehouse (SBW) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% SBW %';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' BSMEPA ', ' Bulgarian Small and Medium Enterprises Promotion Agency (BSMEPA) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% BSMEPA %';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' MINEC ', ' Ministry of Economy (MINEC) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% MINEC %';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' QIZ ', ' Qualifying Industrial Zone (QIZ) ')
WHERE "Public Sector - One Bullet Summary" LIKE '% QIZ %';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' MARD', ' Ministry of Agriculture and Rural Development (MARD)')
WHERE "Public Sector - One Bullet Summary" LIKE '% MARD%';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' DCFTA', ' Deep and Comprehensive Free Trade Area (DCFTA)')
WHERE "Public Sector - One Bullet Summary" LIKE '% DCFTA%';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", ' MAPFU', ' Ministry of Agrarian Policy and Food of Ukraine (MAPFU)')
WHERE "Public Sector - One Bullet Summary" LIKE '% MAPFU%';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", 'MRiRW ', 'Ministry of Agriculture and Rural Development (MRiRW) ')
WHERE "Public Sector - One Bullet Summary" LIKE '%MRiRW %';

UPDATE "Country Data"
SET "Public Sector - One Bullet Summary" = REPLACE("Public Sector - One Bullet Summary", 'SEDE,', 'Secretaría de Estado en los Despachos de Desarrollo Económico (SEDE),')
WHERE "Public Sector - One Bullet Summary" LIKE '%SEDE,%';