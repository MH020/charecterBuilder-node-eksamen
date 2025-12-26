CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    "password" TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    verification_code TEXT,
    verified BOOLEAN DEFAULT FALSE,
    role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER','OWNER'))
);

CREATE TABLE IF NOT EXISTS aptitude (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristic (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "size" (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    score INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS statline_race (
    id SERIAL PRIMARY KEY,
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
    is_custom BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS race (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    size_id INTEGER NOT NULL,
    wounds INTEGER NOT NULL,
    base_statline_id INTEGER,
    max_statline_id INTEGER,
    is_custom BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_r_size_id FOREIGN KEY (size_id) REFERENCES "size"(id),
    CONSTRAINT fk_r_base_statline_id FOREIGN KEY (base_statline_id) REFERENCES statline_race(id),
    CONSTRAINT fk_r_max_statline_id FOREIGN KEY (max_statline_id) REFERENCES statline_race(id)
);

CREATE TABLE IF NOT EXISTS lineage (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    defining_features TEXT,
    required_race_id INT,
    is_custom BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_l_required_race_id FOREIGN KEY (required_race_id) REFERENCES race(id)
);

CREATE TABLE IF NOT EXISTS talent (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL CHECK (type IN ('Half Talent', 'Full Talent', 'Class Feature Only', 'Expert Talent')),
    prerequisite_talent_id INTEGER,
    required_race_id INTEGER,
    lineage_id INTEGER, 
    asi BOOLEAN DEFAULT FALSE,
    is_custom BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_t_prerequisite_talent_id FOREIGN KEY (prerequisite_talent_id) REFERENCES talent(id),
    CONSTRAINT fk_t_required_race_id FOREIGN KEY (required_race_id) REFERENCES race(id),
    CONSTRAINT fk_t_lineage_id FOREIGN KEY (lineage_id) REFERENCES lineage(id)
);

CREATE TABLE IF NOT EXISTS talent_aptitude (
    talent_id INT NOT NULL,
    aptitude_id INT NOT NULL,
    PRIMARY KEY (talent_id, aptitude_id),
    CONSTRAINT fk_ta_talent_id FOREIGN KEY (talent_id) REFERENCES talent(id),
    CONSTRAINT fk_ta_aptitude FOREIGN KEY (aptitude_id) REFERENCES aptitude(id)
);



CREATE TABLE IF NOT EXISTS lineage_characteristic_bonus (
    lineage_id INT NOT NULL,
    characteristic_id INT NOT NULL,
    bonus INT NOT NULL DEFAULT 0,
    is_custom BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (lineage_id, characteristic_id),
    CONSTRAINT fk_lcb_lineage_id FOREIGN KEY (lineage_id) REFERENCES lineage(id),
    CONSTRAINT fk_lcb_characteristic_id FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);


CREATE TABLE IF NOT EXISTS lineage_aptitude (
    lineage_id INT NOT NULL,
    aptitude_id INT NOT NULL,
    PRIMARY KEY (lineage_id, aptitude_id),
    CONSTRAINT fk_la_lineage_id FOREIGN KEY (lineage_id) REFERENCES lineage(id),
    CONSTRAINT fk_la_aptitude FOREIGN KEY (aptitude_id) REFERENCES aptitude(id)
);


CREATE TABLE IF NOT EXISTS trait (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    has_input BOOLEAN DEFAULT FALSE,
    race_id INTEGER,
    is_custom BOOLEAN DEFAULT FALSE,
    category TEXT NOT NULL CHECK (category IN ('nothing','disorder','malignancy','malice','blessing')),
    CONSTRAINT fk_t_race_id FOREIGN KEY (race_id) REFERENCES race(id)
);

CREATE TABLE IF NOT EXISTS "power" (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    ascendant TEXT,
    duration TEXT,
    actions INTEGER,
    concentration BOOLEAN, 
    dc INTEGER,
    "range" TEXT, 
    shape TEXT
);

CREATE TABLE IF NOT EXISTS prerequisite_powers (
    id SERIAL PRIMARY KEY,
    power_id INTEGER NOT NULL,
    prerequisite_Powers_id INTEGER NOT NULL,
    CONSTRAINT fk_pp_power_id FOREIGN KEY (power_id) REFERENCES "power"(id),
    CONSTRAINT fk_pp_prerequisite_Powers_id FOREIGN KEY (prerequisite_Powers_id) REFERENCES "power"(id)
);

CREATE TABLE IF NOT EXISTS class (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    parent_id INTEGER,
    CONSTRAINT fk_c_parent_id FOREIGN KEY (parent_id) REFERENCES class(id)
);

CREATE TABLE IF NOT EXISTS class_powers (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    power_id INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT fk_cp_class_id FOREIGN KEY (class_id) REFERENCES class(id),
    CONSTRAINT fk_cp_power_id FOREIGN KEY (power_id) REFERENCES "power"(id)
);

CREATE TABLE IF NOT EXISTS class_powers_known (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    powers_known INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT fk_cp_class_id FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE IF NOT EXISTS class_traits (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    trait_id INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT fk_ct_class_id FOREIGN KEY (class_id) REFERENCES class(id),
    CONSTRAINT fk_ct_trait_id FOREIGN KEY (trait_id) REFERENCES trait(id)
);

CREATE TABLE IF NOT EXISTS class_aptitudes (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    aptitude_id INTEGER NOT NULL,
    CONSTRAINT fk_ca_class_id FOREIGN KEY (class_id) REFERENCES class(id),
    CONSTRAINT fk_ca_aptitude_id FOREIGN KEY (aptitude_id) REFERENCES aptitude(id)
);

CREATE TABLE IF NOT EXISTS class_bonuses (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    bonus INTEGER NOT NULL,
    CONSTRAINT fk_cb_class_id FOREIGN KEY (class_id) REFERENCES class(id),
    CONSTRAINT fk_cb_characteristic_id FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);

CREATE TABLE IF NOT EXISTS class_weapon_training (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    talent_id INTEGER NOT NULL,
    CONSTRAINT fk_cwt_class_id FOREIGN KEY (class_id) REFERENCES class(id),
    CONSTRAINT fk_cwt_talent_id FOREIGN KEY (talent_id) REFERENCES talent(id)
);



CREATE TABLE IF NOT EXISTS class_talents (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    talent_id INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT fk_ct2_class_id FOREIGN KEY (class_id) REFERENCES class(id),
    CONSTRAINT fk_ct2_talent_id FOREIGN KEY (talent_id) REFERENCES talent(id)
);

CREATE TABLE IF NOT EXISTS class_multiclassing_requirement (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    required_bonus INTEGER NOT NULL,
    CONSTRAINT fk_cmr_class_id FOREIGN KEY (class_id) REFERENCES class(id),
    CONSTRAINT fk_cmr_characteristic_id FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);


CREATE TABLE IF NOT EXISTS "availability" (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS weapon_class (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS class_weapon_class (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    weapon_class_id INTEGER NOT NULL,
    CONSTRAINT fk_cwc_class_id FOREIGN KEY (class_id) REFERENCES class(id),
    CONSTRAINT fk_cwc_weapon_class_id FOREIGN KEY (weapon_class_id) REFERENCES weapon_class(id)
);


CREATE TABLE IF NOT EXISTS weapon_quality (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS item_quality (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    category_type TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS weapon (
    id SERIAL PRIMARY KEY,
    "type" TEXT NOT NULL,
    category_id INTEGER NOT NULL,
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
    is_custom BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_i_category_id FOREIGN KEY (category_id) REFERENCES category(id),
    CONSTRAINT fk_w_availability_id FOREIGN KEY (availability_id) REFERENCES availability(id),
    CONSTRAINT fk_w_projectile_id FOREIGN KEY (projectile_id) REFERENCES weapon(id)
);

CREATE TABLE IF NOT EXISTS weapon_weapon_class(
    weapon_class_id INTEGER NOT NULL,
    weapon_id INTEGER NOT NULL, 
    CONSTRAINT fk_wwc_weapon_class_id FOREIGN KEY (weapon_class_id) REFERENCES weapon_class(id),
    CONSTRAINT fk_wwc_weapon_id FOREIGN KEY (weapon_id) REFERENCES weapon(id)
);

CREATE TABLE IF NOT EXISTS weapon_trait (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    is_custom BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS weapon_weapon_traits (
    id SERIAL PRIMARY KEY,
    weapon_id INTEGER NOT NULL,
    weapon_trait_id INTEGER NOT NULL,
    CONSTRAINT fk_wwt_weapon_id FOREIGN KEY (weapon_id) REFERENCES weapon(id),
    CONSTRAINT fk_wwt_weapon_trait_id FOREIGN KEY (weapon_trait_id) REFERENCES weapon_trait(id)
);

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
    CONSTRAINT fk_wu_weapon_id FOREIGN KEY (weapon_id) REFERENCES weapon(id),
    CONSTRAINT fk_wu_weapon_quality_modifier_id FOREIGN KEY (weapon_quality_modifier_id) REFERENCES weapon_quality(id)
);

CREATE TABLE IF NOT EXISTS item (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    availability_id INTEGER NOT NULL,
    is_custom BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_i_category_id FOREIGN KEY (category_id) REFERENCES category(id),
    CONSTRAINT fk_i_availability_id FOREIGN KEY (availability_id) REFERENCES availability(id)
);

CREATE TABLE IF NOT EXISTS class_items (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    CONSTRAINT fk_ci_item_id FOREIGN KEY (item_id) REFERENCES item(id),
    CONSTRAINT fk_ci_class_id FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE IF NOT EXISTS craftsmanship (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    hit_modifier INTEGER,
    damage_modifier INTEGER,
    wt_modifier INTEGER,
    ap_modifier INTEGER,
    category TEXT NOT NULL CHECK (category IN ('melee','ranged','armor'))
);

CREATE TABLE IF NOT EXISTS item_quality_craftsmanship (
    id SERIAL PRIMARY KEY,
    weapon_quality_id INTEGER NOT NULL,
    craftsmanship_id INTEGER NOT NULL,
    CONSTRAINT fk_iqc_weapon_quality_id FOREIGN KEY (weapon_quality_id) REFERENCES weapon_quality(id),
    CONSTRAINT fk_iqc_craftsmanship_id FOREIGN KEY (craftsmanship_id) REFERENCES craftsmanship(id)
);

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
    is_custom BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_a_availability_id FOREIGN KEY (availability_id) REFERENCES availability(id)
);

CREATE TABLE IF NOT EXISTS campaign (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    "description" TEXT NOT NULL,
    dm_id INTEGER NOT NULL,
    CONSTRAINT fk_c_dm_id FOREIGN KEY (dm_id) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS campaign_players (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    CONSTRAINT fk_cp_campaign_id FOREIGN KEY (campaign_id) REFERENCES campaign(id),
    CONSTRAINT fk_cp_player_id FOREIGN KEY (player_id) REFERENCES "user"(id)
);


CREATE TABLE IF NOT EXISTS skill (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    main_aptitude_id INTEGER NOT NULL,
    secondary_aptitude_id INTEGER NOT NULL,
    is_custom BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_s_main_aptitude_id FOREIGN KEY (main_aptitude_id) REFERENCES aptitude(id),
    CONSTRAINT fk_s_secondary_aptitude_id FOREIGN KEY (secondary_aptitude_id) REFERENCES aptitude(id)
);

CREATE TABLE IF NOT EXISTS force_field (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    protection_rating INTEGER NOT NULL,
    wt INTEGER NOT NULL,
    availability_id INTEGER NOT NULL,
    recharge_speed INTEGER NOT NULL,
    is_custom BOOLEAN DEFAULT FALSE,
    class_id INTEGER,
    CONSTRAINT fk_ff_availability_id FOREIGN KEY (availability_id) REFERENCES availability(id),
    CONSTRAINT fk_ff_class_id FOREIGN KEY (class_id) REFERENCES class(id)
);
--- add private or not private 
CREATE TABLE IF NOT EXISTS charactersheet (
    id SERIAL PRIMARY KEY,
    "level" INTEGER NOT NULL DEFAULT 1,
    race_id INTEGER NOT NULL,
    lineage_id INTEGER NOT NULL,
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
    updated DATE NOT NULL,
    CONSTRAINT fk_c_player_id FOREIGN KEY (player_id) REFERENCES "user"(id),
    CONSTRAINT fk_c_campaign_id FOREIGN KEY (campaign_id) REFERENCES campaign(id),
    CONSTRAINT fk_c_race_id FOREIGN KEY (race_id) REFERENCES race(id),
    CONSTRAINT fk_c_lineage_id FOREIGN KEY (lineage_id) REFERENCES lineage(id)
);

CREATE TABLE IF NOT EXISTS campaign_charactersheets (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL,
    charactersheet_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    CONSTRAINT fk_cc_campaign_id FOREIGN KEY (campaign_id) REFERENCES campaign(id),
    CONSTRAINT fk_cc_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_cc_player_id FOREIGN KEY (player_id) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS character_weapon (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    weapon_id INTEGER NOT NULL,
    craftsmanship_id INTEGER,
    hands INTEGER,
    bullets INTEGER,
    note TEXT,
    CONSTRAINT fk_cw_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_cw_weapon_id FOREIGN KEY (weapon_id) REFERENCES weapon(id),
    CONSTRAINT fk_cw_craftsmanship_id FOREIGN KEY (craftsmanship_id) REFERENCES craftsmanship(id)
);

CREATE TABLE IF NOT EXISTS character_weapon_weaponupgrades (
    id SERIAL PRIMARY KEY,
    character_weapon_id INTEGER NOT NULL,
    weapon_upgrade_id INTEGER NOT NULL,
    CONSTRAINT fk_cww_character_weapon_id FOREIGN KEY (character_weapon_id) REFERENCES character_weapon(id),
    CONSTRAINT fk_cww_weapon_upgrade_id FOREIGN KEY (weapon_upgrade_id) REFERENCES weapon_upgrade(id)
);

CREATE TABLE IF NOT EXISTS character_classes (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT fk_cc2_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_cc2_class_id FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE IF NOT EXISTS character_aptitudes (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    aptitude_id INTEGER NOT NULL,
    CONSTRAINT fk_ca2_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_ca2_aptitude_id FOREIGN KEY (aptitude_id) REFERENCES aptitude(id)
);

CREATE TABLE IF NOT EXISTS character_items (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    slot_type TEXT,
    slot_amount INTEGER DEFAULT 1,
    amount INTEGER DEFAULT 1,
    CONSTRAINT fk_ci_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_ci_item_id FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE IF NOT EXISTS character_skills (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    training_level INTEGER DEFAULT 0,
    CONSTRAINT fk_cs_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_cs_skill_id FOREIGN KEY (skill_id) REFERENCES skill(id)
);

CREATE TABLE IF NOT EXISTS character_characteristics (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    stat_amount INTEGER DEFAULT 0,
    CONSTRAINT fk_cc3_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_cc3_characteristic_id FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);

CREATE TABLE IF NOT EXISTS character_talents (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    talent_id INTEGER NOT NULL,
    characteristic_id INTEGER,
    bonus INTEGER DEFAULT 0,
    CONSTRAINT fk_cta_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_cta_talent_id FOREIGN KEY (talent_id) REFERENCES talent(id),
    CONSTRAINT fk_cta_characteristic_id FOREIGN KEY (characteristic_id) REFERENCES characteristic(id)
);

CREATE TABLE IF NOT EXISTS character_traits (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    trait_id INTEGER NOT NULL,
    CONSTRAINT fk_ctr_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_ctr_trait_id FOREIGN KEY (trait_id) REFERENCES trait(id)
);

CREATE TABLE IF NOT EXISTS character_armor (
    id SERIAL PRIMARY KEY,
    charactersheet_id INTEGER NOT NULL,
    armor_id INTEGER NOT NULL,
    craftsmanship_id INTEGER,
    CONSTRAINT fk_ca_charactersheet_id FOREIGN KEY (charactersheet_id) REFERENCES charactersheet(id),
    CONSTRAINT fk_ca_armor_id FOREIGN KEY (armor_id) REFERENCES armor(id),
    CONSTRAINT fk_ca_craftsmanship_id FOREIGN KEY (craftsmanship_id) REFERENCES craftsmanship(id)
);
