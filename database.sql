-- CREATE DATABASE "talent_signal"


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"password" VARCHAR(255),
	"clearance" Int  DEFAULT '0',
	"first_name" VARCHAR(255) ,
	"last_name" VARCHAR(255) ,
	"email" VARCHAR(255) UNIQUE,
	"phone" VARCHAR(11) ,
	"is_approved" BOOLEAN  DEFAULT 'False',
	"start_date" TEXT ,
	"business_name" TEXT ,
	"program_id" TEXT ,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "payments" (
	"id" serial NOT NULL,
	"payment_id" TEXT NOT NULL UNIQUE,
	"product_id" TEXT NOT NULL,
	"due_date" TEXT NOT NULL,
	"scheduled_date" TEXT NOT NULL,
	"amount" DOUBLE PRECISION NOT NULL,
	"payment_status" TEXT NOT NULL,
	"pending_date" TEXT NOT NULL,
	"complete_date" TEXT NOT NULL,
	"contract_id" TEXT NOT NULL,
	"payment_fee" TEXT NOT NULL,
	"is_paid" BOOLEAN NOT NULL DEFAULT 'False',
	"confirmation_number" BIGINT NOT NULL DEFAULT 0,
	"payout_date" TEXT,

	CONSTRAINT "payments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "client" (
	"id" serial NOT NULL,
	"contract_status" varchar(255),
	"contract_id" varchar(255) NOT NULL,
	"user_id" Int,
	"first_name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"phone" TEXT,
	"end_date" TEXT,
	"coaching_status" varchar(255) NOT NULL,
	CONSTRAINT "client_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "client" ADD CONSTRAINT "client_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

--A note on inserting the following dummy data into the system (if you want to):
--Much of the system is contained behind different levels of user auth. Because of this, you have two options in development.
--Option one: is to move the 'Add User' component outside of a password auth, and (after you've set up your .env) add these
--three coaches to the system via the form. Then, add their clients with the form. It's important that the client's contract
--ID matches exactly their contract ID from the placeholder CSV data/the below SQL queries. You'll also have to have access to
--email accounts for each of the coaches you add to the system in this fashion. You do not need access to the client's email accounts

--Option two is a little easier. Since our user auth uses encryption, you can access their passwords with the database client.
--After you create an admin (after you move the compoent outside protected routes temporarily), you can copy and paste the
--admin's hashed password into the coaches' password fields.
--After running both insert statements, manually insert the "users".id value into the "client".user_id
--Where the client matches the coach.
--Prince gets Dr. Fink, Wendy, and Lisa. Morris gets Jimmy Jam, Terry, and Jerome. Bob Mould gets Paul, Chris, Tommy and Bob

INSERT INTO "users" ("password", "first_name", "last_name", "email", "phone", "start_date", "business_name", "program_id", "is_approved")
VALUES
('password', 'Prince', 'Rogers Nelson', 'prince@npg.com', '7779311', '2021-03-24T21:24:18.817Z', 'NPG', '1', 'true'),
('password', 'Morris', 'Day', 'morris@time.com', '7779311', '2021-03-24T21:24:18.817Z', 'The Time', '1', 'true'),
('password', 'Bob', 'Mould', 'bob@huskerdont.com', '1111111', '2021-03-24T21:24:18.817Z', 'Du the Du', '1', 'true');

INSERT INTO "client" ("coaching_status", "contract_id", "first_name", "last_name", "email", "phone", "end_date")
VALUES
('coaching', 'drfinkcontract1234', 'Doctor', 'Fink', 'drfink@npg.com', '11111111', 'TBD'),
('coaching', 'wendymalvoincontract09', 'Wendy', 'Malvoin', 'wendy@npg.com', '2222222', 'TBD'),
('coaching', 'lisacolemancontract45678', 'Lisa', 'Coleman', 'lisa@npg.com', '3333333', 'TBD'),
('coaching', 'jimmyjamharriscontract4567', 'Jimmy Jam', 'Harris', 'jj@thetime.com', '4444444', 'TBD'),
('coaching', 'terrylewiscontract0987', 'Terry', 'Lewis', 'terry@thetime.com', '5555555', 'TBD'),
('coaching', 'jeromebentoncontract7779311', 'Jerome', 'Benton', 'jerome@thetime.com', '6666666', 'TBD')
('coaching', 'tommycontract1234', 'Tommy', 'Stinson', 'tommy@themats.com', '7777777', 'TBD')
('coaching', 'chriscontract1234', 'Chris', 'Mars', 'chris@themats.com', '8888888', 'TBD')
('coaching', 'bobcontract1234', 'Bob', 'Stinson', 'bob@themats.com', '9999999', 'TBD')
('coaching', 'paulcontract1234', 'Paul', 'Westerberg', 'paul@themats.com', '1010101', 'TBD')




-- If you need to delete anything, your drops:
DROP TABLE "client";
DROP TABLE "payments";
DROP TABLE "user";
