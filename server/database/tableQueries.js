export const tables = `
CREATE TABLE
            users(
                id SERIAL PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                firstName TEXT NOT NULL,
                lastName TEXT,
                password TEXT NOT NULL,
                phoneNumber TEXT NOT NULL,
                address TEXT NOT NULL,
                birthdate TEXT NOT NULL,
                expertise TEXT NOT NULL,
                occupation TEXT NOT NULL,
                bio TEXT NOT NULL,
                role TEXT NOT NULL,
                isAdmin BOOLEAN DEFAULT false);
CREATE TABLE
            sessions(
                id SERIAL PRIMARY KEY,
                mentorId TEXT NOT NULL,
                menteeId TEXT NOT NULL,
                questions TEXT,
                menteeEmail TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                score TEXT DEFAULT 'no review yet',
                menteeFullname TEXT DEFAULT '',
                remark TEXT DEFAULT '');`;
