CREATE SCHEMA IF NOT EXISTS importer;

CREATE TABLE IF NOT EXISTS importer.competition (
    id INT PRIMARY KEY,
    name TEXT,
    code TEXT,
    type TEXT,
    emblem TEXT
);

CREATE TABLE IF NOT EXISTS importer.team (
    id INT PRIMARY KEY,
    name TEXT,
    short_name TEXT ,
    tla TEXT,
    crest TEXT,
    address TEXT,
    website TEXT,
    founded INT,
    club_colors TEXT,
    venue TEXT
);

CREATE TABLE IF NOT EXISTS importer.competition_team (
    id SERIAL PRIMARY KEY,
    competition_id INT,
    team_id INT,
    CONSTRAINT fk_team
        FOREIGN KEY (team_id)
        REFERENCES importer.team(id),
    CONSTRAINT fk_competition
        FOREIGN KEY (competition_id)
        REFERENCES importer.competition(id)
);

CREATE TABLE IF NOT EXISTS importer.player (
    id INT PRIMARY KEY,
    name TEXT,
    position TEXT,
    date_of_birth TEXT ,
    nationality TEXT,
    team_id INT,
    CONSTRAINT fk_team
        FOREIGN KEY (team_id)
        REFERENCES importer.team(id)
);

CREATE TABLE IF NOT EXISTS importer.coach (
    id INT PRIMARY KEY,
    name TEXT,
    date_of_birth TEXT,
    nationality TEXT,
    team_id INT,
        FOREIGN KEY (team_id)
        REFERENCES importer.team(id)
);


