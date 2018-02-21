DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS username;

CREATE TABLE username (
--  user_id serial PRIMARY KEY,
  user_id INTEGER PRIMARY KEY NOT NULL,
  username VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp
);

-- ---
-- Table 'post'
--
-- ---

CREATE TABLE post (
  post_id serial PRIMARY KEY,
  user_id INTEGER REFERENCES username (user_id) NOT NULL,
  title VARCHAR(50) NOT NULL,
  code VARCHAR DEFAULT NULL,
  summary VARCHAR DEFAULT NULL,
  anonymous boolean  DEFAULT FALSE,
  closed boolean DEFAULT FALSE,
  solution_id INTEGER DEFAULT NULL, --references comment_id from comment table
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp
);

-- ---
-- Table 'comment'
--
-- ---

CREATE TABLE comment (
  comment_id serial PRIMARY KEY,
  user_id INTEGER REFERENCES username (user_id) NOT NULL,
  post_id INTEGER REFERENCES post (post_id) NOT NULL,
  message VARCHAR,
  votes INTEGER,
  solution boolean DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp
);


-- ---
-- Test Data
--
-- ---

insert into username (user_id, username)
VALUES
    (11111111, 'Rambo'),
    (22222222, 'Gepeto'),
    (33333333, 'Zanbato'),
    (44444444, 'Colonel'),
    (55555555, 'Hipster');

insert into post (user_id, title, code, summary, solution_id)
VALUES
    (11111111, 'Get to the Choppa', 'aslkdjfleaf', 'Get to the choppa or die', 123456),
    (22222222, 'He is a real boy', 'hello world', 'Turn puppet into real boy', null),
    (33333333, 'A really big sword', 'chop chop its all in the mind', 'the ultimate onion chopper', null),
    (44444444, 'How do you pronounce my name?', 'some military guy', 'Did not know how to say this till I was 25', null),
    (55555555, 'I hate everything', 'Your music sucks', 'Going to drink some IPAs', 234567);

insert into comment (user_id, post_id, message, votes)
VALUES
    (11111111, 1, 'Guns Blazing', 5),
    (22222222, 1, 'Think of the children!', 2),
    (33333333, 1, 'sword = shield', 525),
    (11111111, 1, 'Pulls out rocket launcher', 15),
    (55555555, 1, 'I used those before they were cool', 0);