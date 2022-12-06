
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
