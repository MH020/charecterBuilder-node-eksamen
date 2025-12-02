CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    verification_code TEXT,
    verified INTEGER DEFAULT 0,
    role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER'))
);
