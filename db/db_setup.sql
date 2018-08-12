-- Go in PostGres and initiate sql file

DROP DATABASE IF EXISTS secret_voice;
DROP USER IF EXISTS secret_user;

CREATE USER secret_user WITH PASSWORD 'password';
-- Dont log in with secret_user
CREATE DATABASE secret_voice WITH OWNER secret_user;

\c secret_voice secret_user