-- Users Table
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    "password" TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    verification_code TEXT,
    verified BOOLEAN DEFAULT FALSE,
    role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER'))
);

-- Campaigns
CREATE TABLE IF NOT EXISTS campaign (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    "description" TEXT NOT NULL,
    dm_id INTEGER NOT NULL,
    FOREIGN KEY (dm_id) REFERENCES "user"(id)
);

-- Campaign Players (join table)
CREATE TABLE IF NOT EXISTS campaign_players (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaign(id),
    FOREIGN KEY (player_id) REFERENCES "user"(id)
);

-- Campaign Character Sheets (join table)
CREATE TABLE IF NOT EXISTS campaign_charactersheets (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL,
    charactersheet_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaign(id),
    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (player_id) REFERENCES "user"(id)
);

-- Aptitudes
CREATE TABLE IF NOT EXISTS aptitude (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- Skills
CREATE TABLE IF NOT EXISTS skill (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    main_aptitude_id INTEGER NOT NULL,
    secondary_aptitude_id INTEGER NOT NULL,

    FOREIGN KEY (main_aptitude_id) REFERENCES aptitude(id),
    FOREIGN KEY (secondary_aptitude_id) REFERENCES aptitude(id)
);

-- Weapon Class
CREATE TABLE IF NOT EXISTS weapon_class (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- Weapon Qualities
CREATE TABLE IF NOT EXISTS weapon_quality (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- Availability
CREATE TABLE IF NOT EXISTS availability (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- Weapon
CREATE TABLE IF NOT EXISTS weapon (
    id SERIAL PRIMARY KEY,
    weapon_class_id INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    category TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    hands TEXT,
    rof TEXT NOT NULL,
    damage TEXT NOT NULL,
    pen INTEGER NOT NULL,
    clip INTEGER,
    reload INTEGER,
    wt INTEGER NOT NULL,
    availability_id INTEGER NOT NULL,
    projectile_id INTEGER,
    FOREIGN KEY (weapon_class_id) REFERENCES weapon_class(id),
    FOREIGN KEY (availability_id) REFERENCES availability(id),
    FOREIGN KEY (projectile_id) REFERENCES weapon(id)
);

-- Weapon Traits
CREATE TABLE IF NOT EXISTS weapon_trait (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- Weapon - Weapon Traits join
CREATE TABLE IF NOT EXISTS weapon_weapon_traits (
    id SERIAL PRIMARY KEY,
    weapon_id INTEGER NOT NULL,
    weapon_trait_id INTEGER NOT NULL,
    FOREIGN KEY (weapon_id) REFERENCES weapon(id),
    FOREIGN KEY (weapon_trait_id) REFERENCES weapon_trait(id)
);

-- Weapon Upgrade
CREATE TABLE IF NOT EXISTS weapon_upgrade (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    weapon_id INTEGER,
    range_modifier INTEGER,
    rof_modifier TEXT,
    damage_modifier TEXT,
    pen_modifier INTEGER,
    clip_modifier INTEGER,
    reload_modifier INTEGER,
    weapon_quality_modifier_id INTEGER,
    wt_modifier INTEGER,
    FOREIGN KEY (weapon_id) REFERENCES weapon(id),
    FOREIGN KEY (weapon_quality_modifier_id) REFERENCES weapon_quality(id)
);

-- Item Category
CREATE TABLE IF NOT EXISTS item_category (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- Item
CREATE TABLE IF NOT EXISTS item (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES item_category(id)
);

-- Craftsmanship
CREATE TABLE IF NOT EXISTS craftsmanship (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    hit_modifier INTEGER,
    damage_modifier INTEGER,
    wt_modifier INTEGER,
    ap_modifier INTEGER,
    category TEXT NOT NULL CHECK (category IN ('melee', 'ranged', 'armor'))
);

-- Item Quality - Craftsmanship join
CREATE TABLE IF NOT EXISTS item_quality_craftsmanship (
    id SERIAL PRIMARY KEY,
    weapon_quality_id INTEGER NOT NULL,
    craftsmanship_id INTEGER NOT NULL,
    FOREIGN KEY (weapon_quality_id) REFERENCES weapon_quality(id),
    FOREIGN KEY (craftsmanship_id) REFERENCES craftsmanship(id)
);

-- Armor
CREATE TABLE IF NOT EXISTS armor (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    head_ap INTEGER NOT NULL,
    body_ap INTEGER NOT NULL,
    right_arm_ap INTEGER NOT NULL,
    left_arm_ap INTEGER NOT NULL,
    right_leg_ap INTEGER NOT NULL,
    left_leg_ap INTEGER NOT NULL,
    wt INTEGER NOT NULL,
    availability_id INTEGER NOT NULL,
    FOREIGN KEY (availability_id) REFERENCES availability(id)
);

-- Force Field
CREATE TABLE IF NOT EXISTS force_field (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    protection_rating INTEGER NOT NULL,
    wt INTEGER NOT NULL,
    availability_id INTEGER NOT NULL,
    recharge_speed INTEGER NOT NULL,
    class_id INTEGER,

    FOREIGN KEY (availability_id) REFERENCES availability(id),
    FOREIGN KEY (class_id) REFERENCES class(id)
);

-- Characteristic
CREATE TABLE IF NOT EXISTS characteristic (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- Race
CREATE TABLE IF NOT EXISTS race (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    trait TEXT,
    size_id INTEGER NOT NULL,
    wounds INTEGER NOT NULL,
    base_statline_id INTEGER,
    max_statline_id INTEGER,

    FOREIGN KEY (size_id) REFERENCES size(id),
    FOREIGN KEY (base_statline_id) REFERENCES statline_race(id),
    FOREIGN KEY (max_statline_id) REFERENCES statline_race(id)
);

-- Size
CREATE TABLE IF NOT EXISTS size (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    score INTEGER NOT NULL
);

-- Statline for Race
CREATE TABLE IF NOT EXISTS statline_race (
    id SERIAL PRIMARY KEY,
    race_id INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    weapon_skill INTEGER NOT NULL,
    ballistic_skill INTEGER NOT NULL,
    strength INTEGER NOT NULL,
    toughness INTEGER NOT NULL,
    agility INTEGER NOT NULL,
    intelligence INTEGER NOT NULL,
    perception INTEGER NOT NULL,
    willpower INTEGER NOT NULL,
    fellowship INTEGER NOT NULL,
    FOREIGN KEY (race_id) REFERENCES race(id)
);

-- Talent
CREATE TABLE IF NOT EXISTS talent (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Half Talent', 'Full Talent', 'Class Feature Only', 'Expert Talent')),
    prerequisite_talent_id INTEGER,
    constraint_aptitude_id INTEGER,
    required_race_id INTEGER,
    lineage_id INTEGER,
    asi BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (prerequisite_talent_id) REFERENCES talent(id),
    FOREIGN KEY (constraint_aptitude_id) REFERENCES aptitude(id),
    FOREIGN KEY (required_race_id) REFERENCES race(id),
    FOREIGN KEY (lineage_id) REFERENCES lineage(id)
);

-- Talent - Aptitudes join
CREATE TABLE IF NOT EXISTS talent_aptitudes (
    id SERIAL PRIMARY KEY,
    talent_id INTEGER NOT NULL,
    aptitude_id INTEGER NOT NULL,
    FOREIGN KEY (talent_id) REFERENCES talent(id),
    FOREIGN KEY (aptitude_id) REFERENCES aptitude(id)
);

CREATE TABLE IF NOT EXISTS trait (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    max_level INTEGER NOT NULL,
    race_id INTEGER NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('nothing', 'disorder', 'malliancy', 'malice', 'blessing')),

    FOREIGN KEY (race_id) REFERENCES races(id)
);

-- Class
CREATE TABLE IF NOT EXISTS class (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES class(id)
);

-- Class Traits
CREATE TABLE IF NOT EXISTS class_traits (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    trait_id INTEGER NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (trait_id) REFERENCES trait(id)
);

-- Class Aptitudes
CREATE TABLE IF NOT EXISTS class_aptitudes (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    aptitude_id INTEGER NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (aptitude_id) REFERENCES aptitude(id)
);

-- Class Bonuses
CREATE TABLE IF NOT EXISTS class_bonuses (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    bonus INTEGER NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);

-- Class Weapon Training
CREATE TABLE IF NOT EXISTS class_weapon_training (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    talent_id INTEGER NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (talent_id) REFERENCES talent(id)
);

-- Class Talents
CREATE TABLE IF NOT EXISTS class_talents (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    talent_id INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (talent_id) REFERENCES talent(id)
);

-- Class Multiclassing Requirements
CREATE TABLE IF NOT EXISTS class_multiclassing_requirement (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    required_bonus INTEGER NOT NULL,

    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);

-- Character Sheet
CREATE TABLE IF NOT EXISTS charactersheet (
    id SERIAL PRIMARY KEY,
    "level" INTEGER NOT NULL DEFAULT 1,
    player_id INTEGER NOT NULL,
    campaign_id INTEGER NOT NULL,
    damage INTEGER DEFAULT 0,
    dm_shared BOOLEAN DEFAULT FALSE,
    fate_points INTEGER DEFAULT 0,
    fortitude INTEGER DEFAULT 0,
    insanity INTEGER DEFAULT 0,
    corruption INTEGER DEFAULT 0,
    sanctification INTEGER DEFAULT 0,
    primary_slots INTEGER DEFAULT 0,
    large_slots INTEGER DEFAULT 0,
    small_slots INTEGER DEFAULT 0,

    FOREIGN KEY (player_id) REFERENCES "user"(id),
    FOREIGN KEY (campaign_id) REFERENCES campaign(id)
);

-- Character Weapon
CREATE TABLE IF NOT EXISTS character_weapon (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    weapon_id INTEGER NOT NULL,
    craftsmanship_id INTEGER,
    hands INTEGER,
    bullets INTEGER,
    note TEXT,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (weapon_id) REFERENCES weapon(id),
    FOREIGN KEY (craftsmanship_id) REFERENCES craftsmanship(id)
);

-- Character Weapon Upgrades
CREATE TABLE IF NOT EXISTS character_weapon_weaponupgrades (
    id SERIAL PRIMARY KEY,
    character_weapon_id INTEGER NOT NULL,
    weapon_upgrade_id INTEGER NOT NULL,
    FOREIGN KEY (character_weapon_id) REFERENCES character_weapon(id),
    FOREIGN KEY (weapon_upgrade_id) REFERENCES weapon_upgrade(id)
);

-- Character Classes
CREATE TABLE IF NOT EXISTS character_classes (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (class_id) REFERENCES class(id)
);

-- Character Aptitudes
CREATE TABLE IF NOT EXISTS character_aptitudes (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    aptitude_id INTEGER NOT NULL,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (aptitude_id) REFERENCES aptitude(id)
);

-- Character Items
CREATE TABLE IF NOT EXISTS character_items (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    slot_type TEXT,
    slot_amount INTEGER DEFAULT 1,
    amount INTEGER DEFAULT 1,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (item_id) REFERENCES item(id)
);

-- Character Skills
CREATE TABLE IF NOT EXISTS character_skills (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    training_level INTEGER DEFAULT 0,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (skill_id) REFERENCES skill(id)
);

-- Character Characteristics
CREATE TABLE IF NOT EXISTS character_characteristics (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    stat_amount INTEGER DEFAULT 0,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);

-- Character Talents
CREATE TABLE IF NOT EXISTS character_talents (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    talent_id INTEGER NOT NULL,
    characteristic_id INTEGER,
    bonus INTEGER DEFAULT 0,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (talent_id) REFERENCES talent(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);

-- Character Traits
CREATE TABLE IF NOT EXISTS character_traits (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    trait_id INTEGER NOT NULL,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (trait_id) REFERENCES trait(id)
);

-- Character Armor
CREATE TABLE IF NOT EXISTS character_armor (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    armor_id INTEGER NOT NULL,
    craftsmanship_id INTEGER,

    FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    FOREIGN KEY (armor_id) REFERENCES armor(id),
    FOREIGN KEY (craftsmanship_id) REFERENCES craftsmanship(id)
);
