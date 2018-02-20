DROP TABLE IF EXISTS user;
		
CREATE TABLE user (
  id INTEGER AUTO_INCREMENT NOT NULL,
  username VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

-- ---
-- Table 'post'
-- 
-- ---

DROP TABLE IF EXISTS post;
		
CREATE TABLE post (
  id INTEGER AUTO_INCREMENT NOT NULL,
  user_id INTEGER REFERENCES user (id) NOT NULL,
  title VARCHAR(25) NOT NULL,
  code VARCHAR DEFAULT NULL,
  summary VARCHAR DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT NULL,
  anonymous bit  DEFAULT FALSE,
  closed bit DEFAULT FALSE,
  solution INTEGER DEFAULT NULL,
  PRIMARY KEY (id)

);

-- ---
-- Table 'comment'
-- 
-- ---

DROP TABLE IF EXISTS comment;
		
CREATE TABLE comment (
  id INTEGER AUTO_INCREMENT NOT NULL,
  user_id INTEGER REFERENCES user (id) NOT NULL,
  post_id INTEGER REFERENCES post (id) NOT NULL,
  message VARCHAR,
  votes INTEGER,
  solution bit DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);
