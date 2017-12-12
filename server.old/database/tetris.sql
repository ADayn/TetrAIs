CREATE TABLE IF NOT EXISTS users (
    id INT,
    username VARCHAR(25),
    password_hash VARCHAR(255),
    score INT,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS leaderboards (
    rank INT,
    user_id INT,
	leader_name VARCHAR(25),
    score INT,
    PRIMARY KEY(rank),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
#example: when user finishes with a top 10 score they are prompted for a username to go with score

INSERT INTO users VALUES (0,"AL_D", 'pass1_hash',100000);
INSERT INTO users VALUES (1,"JBL", 'pass2_hash',100000);
INSERT INTO leaderboards VALUES (0, 0, 'JBL', 10000);
INSERT INTO leaderboards VALUES (1, 1, 'ALD', 100000);

