-- CREATE DATABASE "talent_signal"


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"clearance" int  DEFAULT '0',
	"first_name" varchar(255) ,
	"last_name" varchar(255) ,
	"email" varchar(255) ,
	"phone" int ,
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
	"due_date" TEXT NOT NULL,
	"scheduled_date" TEXT NOT NULL,
	"amount" TEXT NOT NULL,
	"payment_status" TEXT NOT NULL,
	"pending_date" TEXT NOT NULL,
	"complete_date" TEXT NOT NULL,
	"contract_id" TEXT NOT NULL,
	"payment_fee" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,

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


