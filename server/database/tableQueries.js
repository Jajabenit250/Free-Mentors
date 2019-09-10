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
                isAdmin BOOLEAN);`;
