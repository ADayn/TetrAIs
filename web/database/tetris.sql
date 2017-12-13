CREATE TABLE IF NOT EXISTS users (
    id INT,
    username VARCHAR(25),
    password_hash VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS leaderboards (
    user_id INT,
    leader_name VARCHAR(25),
    score INT
);
