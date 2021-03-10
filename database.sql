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
	"confirmation_number" TEXT,
	"payout_date" TEXT,

	CONSTRAINT "payments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "client" (
	"id" serial NOT NULL,
	"status" varchar(255) NOT NULL,
	"contract_id" varchar(255) NOT NULL,
	"user_id" Int,
	"first_name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"phone" TEXT NOT NULL,
	"end_date" TEXT,
	CONSTRAINT "client_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "client" ADD CONSTRAINT "client_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

--Remove NOT NULL contraint from both the USERS and CLIENT tables

INSERT INTO "users" ("password", "first_name", "last_name", "email", "phone", "start_date", "business_name", "program_id")
VALUES ('password', 'Prince', 'Rogers Nelson', 'prince@npg.com', '7779311', 'ISO timestamp', 'NPG', '1')
('password', 'Morris', 'Day', 'morris@time.com', '7779311', 'ISO timestamp', 'The Time', '1');

INSERT INTO "client" ("status", "contract_id", "first_name", "last_name", "email", "phone", "end_date")
VALUES
('coaching', 'drfinkcontract1234', 'Doctor', 'Fink', 'drfink@npg.com', '11111111', 'END?'),
('coaching', 'wendymalvoincontract09', 'Wendy', 'Malvoin', 'wendy@npg.com', '2222222', 'END?'),
('coaching', 'lisacolemancontract45678', 'Lisa', 'Coleman', 'lisa@npg.com', '3333333', 'END?'),
('coaching', 'jimmyjamharriscontract4567', 'Jimmy Jam', 'Harris', 'jj@thetime.com', '4444444', 'END?'),
('coaching', 'terrylewiscontract0987', 'Terry', 'Lewis', 'terry@thetime.com', '5555555', 'END?'),
('coaching', 'jeromebentoncontract7779311', 'Jerome', 'Benton', 'jerome@thetime.com', '6666666', 'END?')

--After running both insert statements, manually insert the "users".id value into the "client".user_id
--Where the client matches the coach. Prince gets Dr. Fink, Wendy, and Lisa. Morris gets Jimmy Jam, Terry, and Jerome



-- OLD DB STRUCTURE (has payouts table)


CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255),
	"clearance" int NOT NULL DEFAULT '0',
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" int NOT NULL,
	"is_approved" BOOLEAN NOT NULL DEFAULT 'False',
	"start_date" TEXT NOT NULL,
	"business_name" TEXT NOT NULL,
	"program_id" TEXT NOT NULL,
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
	"amount" TEXT NOT NULL,
	"payment_status" TEXT NOT NULL,
	"pending_date" TEXT NOT NULL,
	"complete_date" TEXT NOT NULL,
	"contract_id" TEXT NOT NULL,
	"payment_fee" TEXT NOT NULL,
	CONSTRAINT "payments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "client" (
	"id" serial NOT NULL,
	"status" varchar(255) NOT NULL,
	"contract_id" varchar(255) NOT NULL,
	"user_id" int NOT NULL,
	"first_name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"phone" TEXT NOT NULL,
	"end_date" TEXT NOT NULL,
	CONSTRAINT "client_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "payouts" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"amount" TEXT NOT NULL,
	"date" TEXT NOT NULL,
	"is_paid" BOOLEAN NOT NULL DEFAULT 'True',
	"confirmation_number" TEXT NOT NULL,
	CONSTRAINT "payouts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "client" ADD CONSTRAINT "client_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "payouts" ADD CONSTRAINT "payouts_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");


DROP TABLE "client";
DROP TABLE "payments";
DROP TABLE "payouts";
DROP TABLE "user";
