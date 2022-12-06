/* Drop Triggers */
DROP TRIGGER IF EXISTS dkp_insert_trigger;

/* Drop Tables */
DROP TABLE IF EXISTS disbursements;
DROP TABLE IF EXISTS expedition_roster;
DROP TABLE IF EXISTS acquisitions;
DROP TABLE IF EXISTS adventurers;
DROP TABLE IF EXISTS expeditions;

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

/*
	Begin Table Definitions
*/

CREATE TABLE adventurers (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    job VARCHAR(20) NOT NULL,
    guild_rank VARCHAR(255) NOT NULL,
    dkp INT NOT NULL,
    CONSTRAINT PK_adv_id PRIMARY KEY (id)
);

CREATE TABLE expeditions (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT PK_exp_id PRIMARY KEY (id)
);

CREATE TABLE expedition_roster (
	id INT(11) NOT NULL AUTO_INCREMENT,
    exp_id INT(11) NOT NULL,
    adv_id INT(11) NOT NULL,
    CONSTRAINT PK_rost_id PRIMARY KEY (id),
    CONSTRAINT FK_rost_exp_id FOREIGN KEY (exp_id) 
		REFERENCES expeditions(id) ON DELETE CASCADE,
    CONSTRAINT FK_rost_adv_id FOREIGN KEY (adv_id) 
		REFERENCES adventurers(id) ON DELETE CASCADE
);

CREATE TABLE acquisitions (
	id INT(11) NOT NULL AUTO_INCREMENT,
    exp_id INT(11),
    adv_id INT(11),
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    sold BOOL DEFAULT 0,
    price INT(11),
    CONSTRAINT PK_acq_id PRIMARY KEY (id),
    CONSTRAINT FK_acq_exp_id FOREIGN KEY (exp_id) 
		REFERENCES expeditions(id) ON DELETE CASCADE,
    CONSTRAINT FK_acq_adv_id FOREIGN KEY (adv_id) 
		REFERENCES adventurers(id) ON DELETE CASCADE
);

CREATE TABLE disbursements (
	id INT(11) NOT NULL AUTO_INCREMENT,
    roster_id INT(11) NOT NULL,
    date DATE NOT NULL,
    quantity INT(11) NOT NULL,
    CONSTRAINT PK_dkp_id PRIMARY KEY (id),
    CONSTRAINT FK_dkp_rost_id FOREIGN KEY (roster_id) 
		REFERENCES expedition_roster(id) ON DELETE CASCADE
);

/*
	End of Table Definitions
*/


/* 
	Start of Stored Procedures
*/

/*
	End of Stored Procedures
*/

/*
	Begin Sample Data
*/

INSERT INTO adventurers (name, job, guild_rank, dkp) VALUES
	("Jeff", "Fighter", "Officer", 1000),
    ("Otto", "Mage", "Officer", 500),
    ("Liz", "Healer", "Member", 250),
    ("Michelle", "Mage", "Recruit", 0),
    ("Dave", "Rogue", "Leader", 2000);

INSERT INTO expeditions (name, date) VALUES 
	("Spire of the Bleakrock, Upper", "2022-10-17"),
	("Spire of the Bleakrock, Lower", "2022-10-18"), 
	("Moonwell Valley", "2022-07-22");

INSERT INTO expedition_roster (exp_id, adv_id) VALUES 
	((SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Upper"),
		(SELECT id FROM adventurers WHERE name = "Jeff")),
	((SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Upper"),
		(SELECT id FROM adventurers WHERE name = "Dave")),
	((SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Upper"),
		(SELECT id FROM adventurers WHERE name = "Otto")),
	((SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Upper"),
		(SELECT id FROM adventurers WHERE name = "Liz")),
	((SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Lower"),
		(SELECT id FROM adventurers WHERE name = "Dave")),
	((SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Lower"),
		(SELECT id FROM adventurers WHERE name = "Jeff")),
	((SELECT id FROM expeditions WHERE name = "Moonwell Valley"),
		(SELECT id FROM adventurers WHERE name = "Michelle")),
	((SELECT id FROM expeditions WHERE name = "Moonwell Valley"),
		(SELECT id FROM adventurers WHERE name = "Dave"));

INSERT INTO acquisitions (exp_id, adv_id, date, name) VALUES
    ((SELECT id FROM expeditions WHERE date = "2022-10-17"), NULL, "2022-10-17", "Sword of Upper Bleakrock"),
    ((SELECT id FROM expeditions WHERE date = "2022-10-17"), NULL, "2022-10-17", "Wand of Upper Bleakrock"),
    ((SELECT id FROM expeditions WHERE date = "2022-10-18"), NULL, "2022-10-18", "Solid Bleakrock Tunic"),
    ((SELECT id FROM expeditions WHERE date = "2022-07-22"), NULL, "2022-07-22", "Robe of the Valley");

INSERT INTO disbursements (roster_id, date, quantity) VALUES 
	(
		(SELECT id FROM expedition_roster WHERE 
			((adv_id = (SELECT id FROM adventurers WHERE name = "Jeff"))) AND 
            ((exp_id = (SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Lower")))),
		"2022-10-17", 50
    ),
	(
		(SELECT id FROM expedition_roster WHERE 
			((adv_id = (SELECT id FROM adventurers WHERE name = "Dave"))) AND 
            ((exp_id = (SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Lower")))),
		"2022-10-17", 5000
    ),
	(
		(SELECT id FROM expedition_roster WHERE 
			((adv_id = (SELECT id FROM adventurers WHERE name = "Liz"))) AND 
            ((exp_id = (SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Upper")))),
		"2022-10-17", 5
    ),
	(
		(SELECT id  FROM expedition_roster WHERE 
			((adv_id = (SELECT id FROM adventurers WHERE name = "Michelle"))) AND 
            ((exp_id = (SELECT id FROM expeditions WHERE name = "Moonwell Valley")))),
		"2022-07-22", 50
    ),
	(
		(SELECT id FROM expedition_roster WHERE 
			((adv_id = (SELECT id FROM adventurers WHERE name = "Otto"))) AND 
            ((exp_id = (SELECT id FROM expeditions WHERE name = "Spire of the Bleakrock, Upper")))),
		"2022-10-17", 100
    );

/*
	End of Sample Data
*/


/* 
	Start of Triggers
*/

CREATE TRIGGER dkp_insert_trigger AFTER INSERT ON disbursements
	FOR EACH ROW UPDATE adventurers SET dkp = dkp + NEW.quantity WHERE id = 
        ((SELECT adv_id FROM expedition_roster WHERE id = NEW.roster_id));

CREATE TRIGGER dkp_insert_delete AFTER DELETE ON disbursements
	FOR EACH ROW UPDATE adventurers SET dkp = dkp - OLD.quantity WHERE id = 
        ((SELECT adv_id FROM expedition_roster WHERE id = OLD.roster_id));


CREATE TRIGGER dkp_insert_update AFTER UPDATE ON disbursements
	FOR EACH ROW UPDATE adventurers SET dkp = dkp - OLD.quantity + NEW.quantity WHERE id = 
        ((SELECT adv_id FROM expedition_roster WHERE id = NEW.roster_id));


/* 
	End of Triggers
*/


SET FOREIGN_KEY_CHECKS=1;
COMMIT;