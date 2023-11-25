drop database if exists courses;
create database courses;
use courses;

SET FOREIGN_KEY_CHECKS = 0;

drop table if exists courses;
create table courses (
	id int AUTO_INCREMENT PRIMARY KEY,
    language VARCHAR(50),
    format VARCHAR(50),
    price decimal(5,2) DEFAULT 0,
    description VARCHAR(250)
);

drop table if exists users;
create table users (
	id int unsigned AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL
);

drop table if exists roles;
create table roles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name varchar(45) NOT NULL
);

drop table if exists user_roles;
create table user_roles (
	user_id INT UNSIGNED,  
	role_id INT UNSIGNED,  
	PRIMARY KEY (user_id, role_id),  
	FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,  
	FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE CASCADE
);

drop table if exists user_courses;
create table user_courses (
	user_id INT UNSIGNED,  
	course_id INT, 
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id, course_id),  
	FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
	FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE ON DELETE CASCADE
);

insert into users(id, username, email, password) values
(1, 'admin', 'admin@gmail.com', '$2a$10$IQCdH7V7XxOix5H3w82uQec0mosp/rE0mGYUxNDPQvpd7ldQ7dCQe'),
(2, 'gabriel', 'gabriel@gmail.com', '$2a$10$PIaqs8F5vZDuaM6bRC7S3.KRBbo.mgKReT/QTTR09j8PY6X0uhcXa');


insert into roles(name) VALUES
('ROLE_USER'),
('ROLE_ADMIN');

insert into user_roles(user_id, role_id) values (1, 2), (2, 1);

insert into courses(id, language, format, price, description) values
(1, 'Java', 'in-person', 150, "Learn Full stack with Spring Boot and Angular"),
(2, 'Java', 'online', 100, "Learn Full stack with Spring Boot and React"),
(3, 'Java', 'online', 50, "Master Microservices with Spring Boot and Spring Cloud"),
(4, 'Java', 'in-person', 100, "Deploy Spring Boot Microservices to Cloud with Docker and Kubernetes"),
(5, 'Javascript', 'online', 200, "Learn Full stack with Node.js and Vue.js"),
(6, 'Python', 'online', 100, "Learn Basic Python Programming");

SET FOREIGN_KEY_CHECKS = 1;
