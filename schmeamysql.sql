DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  user_id INT NOT NULL,
  username VARCHAR(25) NOT NULL,
  password varchar(30) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id)
);

-- ---
-- Table 'post'
--
-- ---

CREATE TABLE posts
(
  post_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  code VARCHAR(8000) DEFAULT NULL,
  summary VARCHAR(8000) DEFAULT NULL,
  anon BOOLEAN DEFAULT FALSE,
  closed BOOLEAN DEFAULT FALSE,
  solution_id INT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
  -- FOREIGN KEY (solution_id) REFERENCES comments (comment_id) THIS NEEDS TO BE ADDED IN AFTERWARDS
);

-- ---
-- Table 'comment'
--
-- ---

CREATE TABLE comments
(
  comment_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  message VARCHAR(8000),
  votes INTEGER DEFAULT 0,
  solution boolean DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (comment_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (post_id) REFERENCES posts (post_id)
);


-- ---
-- Test Data
--
-- ---

insert into users
  (user_id, username, password)
VALUES
  (11111111, 'Rambo', 'password'),
  (22222222, 'Gepeto', 'password'),
  (33333333, 'Zanbato', 'password'),
  (44444444, 'Colonel', 'password'),
  (55555555, 'Hipster', 'password');

insert into posts
  (user_id, title, code, summary, solution_id)
VALUES
  (11111111, 'Get to the Choppa', 'aslkdjfleaf', 'Get to the choppa or die', 123456),
  (22222222, 'He is a real boy', 'hello world', 'Turn puppet into real boy', null),
  (33333333, 'A really big sword', 'chop chop its all in the mind', 'the ultimate onion chopper', null),
  (44444444, 'How do you pronounce my name?', 'some military guy', 'Did not know how to say this till I was 25', null),
  (55555555, 'I hate everything', 'Your music sucks', 'Going to drink some IPAs', 234567);

insert into comments
  (user_id, post_id, message, votes)
VALUES
  (11111111, 1, 'Guns Blazing', 5),
  (22222222, 1, 'Think of the children!', 2),
  (33333333, 1, 'sword = shield', 525),
  (11111111, 1, 'Pulls out rocket launcher', 15),
  (55555555, 1, 'I used those before they were cool', 0);
<<<<<<< HEAD
  
=======
>>>>>>> 0003110611cef6157e0a686adf63c0311d2626e1
