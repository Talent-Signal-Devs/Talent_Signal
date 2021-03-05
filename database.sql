CREATE DATABASE "talent-signal"


CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"clearance" int NOT NULL DEFAULT '0',
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" int NOT NULL,
	"is_approved" BOOLEAN NOT NULL DEFAULT 'False',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "payments" (
	"id" serial NOT NULL,
	"payment_id" TEXT NOT NULL,
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





ALTER TABLE "client" ADD CONSTRAINT "client_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "payouts" ADD CONSTRAINT "payouts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
