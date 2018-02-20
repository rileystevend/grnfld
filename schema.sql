DROP TABLE IF EXISTS username;
		
CREATE TABLE username (
  user_id serial PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp
);

-- ---
-- Table 'post'
-- 
-- ---

DROP TABLE IF EXISTS post;
		
CREATE TABLE post (
  post_id serial PRIMARY KEY,
  user_id INTEGER REFERENCES username (user_id) NOT NULL,
  title VARCHAR(25) NOT NULL,
  code VARCHAR DEFAULT NULL,
  summary VARCHAR DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT NULL,
  anonymous boolean  DEFAULT FALSE,
  closed boolean DEFAULT FALSE,
  solution INTEGER DEFAULT NULL
);

-- ---
-- Table 'comment'
-- 
-- ---

DROP TABLE IF EXISTS comment;
		
CREATE TABLE comment (
  comment_id serial PRIMARY KEY,
  user_id INTEGER REFERENCES username (user_id) NOT NULL,
  post_id INTEGER REFERENCES post (post_id) NOT NULL,
  message VARCHAR,
  votes INTEGER,
  solution boolean DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp
);
