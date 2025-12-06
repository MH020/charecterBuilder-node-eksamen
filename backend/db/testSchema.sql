-- =========================
-- USERS
-- =========================
INSERT INTO "user" (username, "password", email, verification_code, verified, role)
VALUES 
('Alice', 'password123', 'alice@example.com', 'ABC123', TRUE, 'USER'),
('Bob', 'password456', 'bob@example.com', 'XYZ789', FALSE, 'ADMIN');

-- =========================
-- APTITUDE
-- =========================
INSERT INTO aptitude ("name") VALUES ('Strength'), ('Agility');

-- =========================
-- CHARACTERISTIC
-- =========================
INSERT INTO characteristic ("name", "description") VALUES 
('Strength', 'Physical power'), 
('Agility', 'Quickness and flexibility');

-- =========================
-- SIZE
-- =========================
INSERT INTO "size" ("name", score) VALUES ('Small', 1), ('Medium', 2);

-- =========================
-- STATLINE_RACE
-- =========================
INSERT INTO statline_race 
("name", weapon_skill, ballistic_skill, strength, toughness, agility, intelligence, perception, willpower, fellowship)
VALUES ('Human Base', 30, 25, 30, 30, 30, 30, 30, 30, 30);

-- =========================
-- RACE
-- =========================
INSERT INTO race ("name", "description", trait, size_id, wounds, base_statline_id, max_statline_id)
VALUES ('Human', 'Versatile race', 'Adaptable', 2, 10, 1, 1);

-- =========================
-- LINEAGE
-- =========================
INSERT INTO lineage (name, description, defining_features, required_race_id)
VALUES ('Nordic', 'Tall, fair-skinned', 'Blonde hair', 1);

-- =========================
-- TALENT
-- =========================
INSERT INTO talent ("name", "description", type)
VALUES ('Sword Mastery', 'Skilled with swords', 'Full Talent');

-- =========================
-- LINEAGE_CHARACTERISTIC_BONUS
-- =========================
INSERT INTO lineage_characteristic_bonus (lineage_id, characteristic_id, bonus)
VALUES (1, 1, 5);

-- =========================
-- LINEAGE_APTITUDE
-- =========================
INSERT INTO lineage_aptitude (lineage_id, aptitude_id)
VALUES (1, 1);

-- =========================
-- TRAIT
-- =========================
INSERT INTO trait ("name", "description", max_level, race_id, category)
VALUES ('Night Vision', 'See in darkness', 5, 1, 'blessing');

-- =========================
-- CLASS
-- =========================
INSERT INTO class ("name", "description")
VALUES ('Warrior', 'Frontline fighter');

-- =========================
-- CLASS_TRAITS
-- =========================
INSERT INTO class_traits (class_id, trait_id)
VALUES (1, 1);

-- =========================
-- CLASS_APTITUDES
-- =========================
INSERT INTO class_aptitudes (class_id, aptitude_id)
VALUES (1, 1);

-- =========================
-- CLASS_BONUSES
-- =========================
INSERT INTO class_bonuses (class_id, characteristic_id, bonus)
VALUES (1, 1, 5);

-- =========================
-- CLASS_WEAPON_TRAINING
-- =========================
INSERT INTO class_weapon_training (class_id, talent_id)
VALUES (1, 1);

-- =========================
-- CLASS_TALENTS
-- =========================
INSERT INTO class_talents (class_id, talent_id, "level")
VALUES (1, 1, 1);

-- =========================
-- CLASS_MULTICLASSING_REQUIREMENT
-- =========================
INSERT INTO class_multiclassing_requirement (class_id, characteristic_id, required_bonus)
VALUES (1, 1, 10);

-- =========================
-- AVAILABILITY
-- =========================
INSERT INTO availability ("name") VALUES ('Common'), ('Rare');

-- =========================
-- WEAPON_CLASS
-- =========================
INSERT INTO weapon_class ("name", "description") VALUES ('Sword', 'Sharp melee weapon');

-- =========================
-- WEAPON_QUALITY
-- =========================
INSERT INTO weapon_quality ("name", "description") VALUES ('Standard', 'Normal quality');

-- =========================
-- WEAPON
-- =========================
INSERT INTO weapon 
(weapon_class_id, "type", category, "name", "range", hands, rof, damage, pen, clip, reload, wt, availability_id)
VALUES 
(1, 'Melee', 'Close Combat', 'Longsword', 'Melee', 'One', 'N/A', '1d8', 0, NULL, NULL, 3, 1);

-- =========================
-- WEAPON_TRAIT
-- =========================
INSERT INTO weapon_trait ("name", "description") VALUES ('Sharp', 'Cuts better');

-- =========================
-- WEAPON_WEAPON_TRAITS
-- =========================
INSERT INTO weapon_weapon_traits (weapon_id, weapon_trait_id) VALUES (1, 1);

-- =========================
-- WEAPON_UPGRADE
-- =========================
INSERT INTO weapon_upgrade ("name", "description", weapon_id)
VALUES ('Reinforced Blade', 'Stronger blade', 1);

-- =========================
-- ITEM_CATEGORY
-- =========================
INSERT INTO item_category ("name", "description") VALUES ('Potion', 'Consumable');

-- =========================
-- ITEM
-- =========================
INSERT INTO item ("name", "description", category_id) VALUES ('Health Potion', 'Restores HP', 1);

-- =========================
-- CRAFTSMANSHIP
-- =========================
INSERT INTO craftsmanship ("name", category) VALUES ('Masterwork', 'melee');

-- =========================
-- ITEM_QUALITY_CRAFTSMANSHIP
-- =========================
INSERT INTO item_quality_craftsmanship (weapon_quality_id, craftsmanship_id) VALUES (1, 1);

-- =========================
-- ARMOR
-- =========================
INSERT INTO armor ("name", "description", head_ap, body_ap, right_arm_ap, left_arm_ap, right_leg_ap, left_leg_ap, wt, availability_id)
VALUES ('Leather Armor', 'Basic protection', 1,2,1,1,1,1,5,1);

-- =========================
-- CAMPAIGN
-- =========================
INSERT INTO campaign (title, "description", dm_id) VALUES ('Epic Adventure', 'A thrilling quest', 1);

-- =========================
-- CAMPAIGN_PLAYERS
-- =========================
INSERT INTO campaign_players (campaign_id, player_id) VALUES (1, 2);

-- =========================
-- SKILL
-- =========================
INSERT INTO skill ("name", "description", main_aptitude_id, secondary_aptitude_id)
VALUES ('Stealth', 'Move unseen', 2, 1);

-- =========================
-- FORCE_FIELD
-- =========================
INSERT INTO force_field ("name", "description", protection_rating, wt, availability_id, recharge_speed)
VALUES ('Energy Shield', 'Blocks damage', 5, 10, 1, 3);

-- =========================
-- CHARACTERSHEET
-- =========================
INSERT INTO charactersheet (race_id, lineage_id, player_id, campaign_id, updated)
VALUES (1,1,2,1, CURRENT_DATE);

-- =========================
-- CAMPAIGN_CHARACTERSHEETS
-- =========================
INSERT INTO campaign_charactersheets (campaign_id, charactersheet_id, player_id) VALUES (1,1,2);

-- =========================
-- CHARACTER_WEAPON
-- =========================
INSERT INTO character_weapon (charactersheet_id, weapon_id, hands, bullets) VALUES (1,1,1,NULL);

-- =========================
-- CHARACTER_WEAPON_WEAPONUPGRADES
-- =========================
INSERT INTO character_weapon_weaponupgrades (character_weapon_id, weapon_upgrade_id) VALUES (1,1);

-- =========================
-- CHARACTER_CLASSES
-- =========================
INSERT INTO character_classes (charactersheet_id, class_id, "level") VALUES (1,1,1);

-- =========================
-- CHARACTER_APTITUDES
-- =========================
INSERT INTO character_aptitudes (charactersheet_id, aptitude_id) VALUES (1,1);

-- =========================
-- CHARACTER_ITEMS
-- =========================
INSERT INTO character_items (charactersheet_id, item_id, slot_type, amount) VALUES (1,1,'primary',1);

-- =========================
-- CHARACTER_SKILLS
-- =========================
INSERT INTO character_skills (charactersheet_id, skill_id, training_level) VALUES (1,1,1);

-- =========================
-- CHARACTER_CHARACTERISTICS
-- =========================
INSERT INTO character_characteristics (charactersheet_id, characteristic_id, stat_amount) VALUES (1,1,10);

-- =========================
-- CHARACTER_TALENTS
-- =========================
INSERT INTO character_talents (charactersheet_id, talent_id, bonus) VALUES (1,1,2);

-- =========================
-- CHARACTER_TRAITS
-- =========================
INSERT INTO character_traits (charactersheet_id, trait_id) VALUES (1,1);

-- =========================
-- CHARACTER_ARMOR
-- =========================
INSERT INTO character_armor (charactersheet_id, armor_id) VALUES (1,1);
