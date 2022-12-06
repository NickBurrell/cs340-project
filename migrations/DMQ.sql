-- Adventurers =================================================

-- Create Adventurer
INSERT INTO adventurers (name, job, guild_rank, dkp) VALUE(:name, :job, :guild_rank, :dkp);

-- Get All Adventurers
SELECT * FROM adventurers;

-- Get Adventurer by ID
SELECT * FROM adventurers WHERE id = :id;

-- Update Adventurer by ID
UPDATE adventurers SET name = :name, job = :job, guild_rank =:guild_rank, dkp= :dkp WHERE id = :id;

-- Delete Adventurer by ID
DELETE FROM  adventurers where id = :id;

-- Expeditions =================================================


-- Create Expedition
INSERT INTO expeditions (name, date) VALUE(:name, :date);

-- Get All Expeditions
SELECT * FROM expeditions;

-- Get Expedition by ID
SELECT * FROM expeditions WHERE id = :id;

-- Update Expedition by ID
UPDATE expeditions SET name = :name, date = :date WHERE id = :id;

-- Delete Expedition by ID
DELETE FROM  expeditions where id = :id;

-- Expedition Rosters ==========================================

-- Create Expedition Rosters

-- Get All Expedition Rosters
SELECT expedition_roster.id, expedition_roster.exp_id, expedition_roster.adv_id,
        expeditions.name AS exp_name, adventurers.name AS adv_name FROM expedition_roster
        LEFT JOIN expeditions ON expedition_roster.exp_id = expeditions.id
        LEFT JOIN adventurers ON expedition_roster.adv_id = adventurers.id
        ORDER BY expedition_roster.id ASC;

-- Get Expedition Rosters by ID
SELECT expedition_roster.id, expedition_roster.exp_id, expedition_roster.adv_id,
        expeditions.name AS exp_name, adventurers.name AS adv_name FROM expedition_roster
        LEFT JOIN expeditions ON expedition_roster.exp_id = expeditions.id
        LEFT JOIN adventurers ON expedition_roster.adv_id = adventurers.id
        WHERE expedition_roster.id = :id;

-- Update Expedition Rosters
UPDATE expedition_roster SET exp_id = :exp_id, adv_id = :adv_id WHERE id = :id;

-- Delete Expedition Rosters
DELETE FROM expedition_roster WHERE id = :id;

-- Acquisitions ================================================

-- Create Acquisition

-- Get All Acquisitions
SELECT acquisitions.id, acquisitions.name, acquisitions.date, acquisitions.exp_id,
        acquisitions.adv_id, acquisitions.price, expeditions.name AS exp_name, adventurers.name AS adv_name FROM acquisitions
        LEFT JOIN expeditions ON acquisitions.exp_id = expeditions.id
        LEFT JOIN adventurers ON acquisitions.adv_id = adventurers.id
        ORDER BY acquisitions.id;
-- Get Acquisition by ID
SELECT acquisitions.id, acquisitions.name, acquisitions.date, acquisitions.exp_id,
        acquisitions.adv_id, acquisitions.price, expeditions.name AS exp_name, adventurers.name AS adv_name FROM acquisitions
        LEFT JOIN expeditions ON acquisitions.exp_id = expeditions.id
        LEFT JOIN adventurers ON acquisitions.adv_id = adventurers.id
        WHERE acquisitions.id = :id;

-- Update Acquisition
UPDATE acquisitions SET exp_id = :exp_id, adv_id = :adv_id, name = :name, date = :date, sold = :sold, price = :price WHERE id = :id;

-- Delete Acquisition
DELETE FROM acquisitions WHERE id = :id;

-- Disbursements =================================================

-- Create Expedition
INSERT INTO disbursements (roster_id, date, quantity) VALUE(:roster_id, :date, :quantity);

-- Get All Expeditions
SELECT disbursements.id, disbursements.roster_id, disbursements.date, disbursements.quantity,
        expedition.name AS exp_name, adventurers.name AS adb_name FROM disbursements LEFT JOIN
        expedition_roster ON disbursements.roster_id = expedition_roster.id LEFT JOIN
        expeditions ON expedition_roster.exp_id = expeditions.id LEFT JOIN
        adventurers ON expedition_roster.adv_id = adventurers.id ORDER BY disbursements.id;

-- Get Expedition by ID
SELECT disbursements.id, disbursements.roster_id, disbursements.date, disbursements.quantity,
        expedition.name AS exp_name, adventurers.name AS adb_name FROM disbursements LEFT JOIN
        expedition_roster ON disbursements.roster_id = expedition_roster.id LEFT JOIN
        expeditions ON expedition_roster.exp_id = expeditions.id LEFT JOIN
        adventurers ON expedition_roster.adv_id = adventurers.id WHERE disbursement.id = :id;

-- Update Expedition by ID
UPDATE disbursements SET roster_id = :roster_id, date = :date, quantity =: quantity WHERE id = :id;

-- Delete Expedition by ID
DELETE FROM  disbursements WHERE id = :id;
