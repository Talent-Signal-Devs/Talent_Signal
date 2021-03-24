
# Prime Digital Academy - Group Project - Talent Signal
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Description
The capstone project of [Jordan Ashbacher](https://github.com/jordan-ashbacher), [Mark Koerner](https://github.com/mnpkoerner), [Josh Vedane](https://github.com/Joshua-Vedane), and [Simeon Willard](https://github.com/simeonwillard) as part of [Prime Digital Academy](http://primeacademy.io).

This code creates a unique buisiness solution for [Talent Signal](https://talentsignal.io/), a company that manages ISAs between job coaches and their clients.
Their needs required us to build a platform that would parse and organize incoming CSVs from Leif, manage coaches and their clients, provide clear reporting, and create indexes for information in other software.

The code is geared specificly to parse CSVs from Leif, the company that creates and enforces ISAs. Each month, the CSV contains the entire history of deferred payments made to Talent Signal from their clients. As time goes on, the CSV increases in size and complexity. By using Papaparse and a postgreSQL query, our code is able to add new lines from the csv to the database and update any information that changes. The application then takes that data and uses it to calculate payments owed to job coaches.

The application stores all records and allows both the admins and coaches to view relevant data dynamically in several different ways.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Built With
* NodeJS
* Postgres/Postico
* React
* Redux
* Express
* Passport
* Papaparse
* Material UI
* Twilio
* ChartJS

## Screenshots
Admin - Dashboard
![Admin Dashboard](/public/screenshots/admindash.png)
Admin - Adding a New User
![Admin Add User](/public/screenshots/adminadd.png)
Admin - List of Active Coaches
![Admin Coaches](/public/screenshots/admincoach.png)
Admin - Making Payments After Uploading a CSV
![Admin Payouts](/public/screenshots/adminpayout.png)
Admin - Confirming Payments
![Admin Confirm](/public/screenshots/adminconf.png)
Admin - Payment History
![Admin History](/public/screenshots/adminhistory.png)
Coach - Dashboard
![Coach Dashboard](/public/screenshots/coachdash.png)
Coach - Client List
![Coach Dashboard](/public/screenshots/coachclient.png)
Coach - Payout History
![Coach Dashboard](/public/screenshots/coachpayout.png)

## Create database and table

Create a new database called `talent_signal` and copy the SQL queries from the `database.sql` file to set up the correct schema.

If you would like to name your database something else, you will need to change `talent_signal` to the name of your new database name in `server/modules/pool.js`


## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project. The project uses Sendgrid and Twilio, you'll need your own unique IDs and tokens in the `.env` file.
  ```
    SERVER_SESSION_SECRET=YOURUNIQUEEALPHANUMERICKEY123456789
    SENDGRID_API_KEY=YOURUNIQUEKEY
    TWILIO_ACCOUNT_SID=YOURUNIQUEKEY
    TWILIO_AUTH_TOKEN=YOURUNIQUEKEY
  ```

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

### Special Note on the Database and Creating an Admin

For development (before deployment), you'll need to manually create an admin in your database client. Our client wanted control to add new users to the system, that priviledge is currently wrapped in an authorized route. You'll need to move the function of the AdminAddUser component outside of a protected route and add use it to add a new coach. Once you complete the Twilio authorization process, go into your database client and change the value in "users".clearance from 0 to 1. This alters the routing and reveals admin priviledges. Now, you can move the function of AdminAddUser back inside of it's protected route.

## Usage
This application has a very specific business use for Talent Signal. The usage will reflect their workflow. A note on all the tables in the application: We implemented Material UI's DataGrid, which gives all tables sort, search, and filter functionality.

### Admin
* After logging in, the Admin can take several actions on viewing their dashboard.
1. Using the "Add New Coach/Client" button at the top of the page OR using the "Add User" option from the side nav will take the Admin to the same destination
  * There, select what kind of user is being added (coach or client), and fill in the relevant fields.
  * When a client is added, their coach must already be in the system and they must already have signed an ISA with Talent Signal, their unique contract ID is a keystone of the software and connects clients to their payments
    * The data inputed in this section can be edited when the admin navigates to either the coach or client list from the side navigation bar
    * Once viewing the coach or client list, the admin can click on a user they want to edit.
    * The admin will be taken to a details view of the coach/client where they also have the option to edit information
2. The admin is also able to upload and parse CSVs from Leif. Navigate to the page with either the "Manage Payouts" button on top of the homepage or with the "payouts" tab on the side navigation.
  1. To upload a new CSV, click the "upload a new csv button," find the file on your local machine, and click the upload button on the page. The CSV will be automatically parsed and the admin will be taken to the next page where they can "pay" their coaches.
  1. Talent Signal uses Melio to pay the coaches, so the "pay" button will generate a unique confirmation number that can be pasted into Melio. It also marks the payments as complete in the database, which allows the coaches to view their payments in their dashboard.
    * NOTE: the "pay" button does NOT send payments with Melio; it is NOT integrated with their platform. The admin will need to run Melio on a separate window and manually disperse payments to the coaches.
  1. To view the total history of payments made to coaches, the admin can use the "view payout history" button on top of the page.
    * Once in this view, the admin can view all the clients that comprise a payment by clicking on it

### Coach
* The coach view is read only and the primary focus is on reporting. Talent Signal manages the accounting and logistics, allowing the job coach to focus on working directly with their clients. The application is a tool that allows job coaches to quickly access their payment history with Talent Signal.

1. After logging in, the coach can view their dashboard, which shows them their recent payments in a DataGrid along with two charts that vizualize that data
1. By clicking the "client" button in the left navigation bar, they can view a complete list of their clients (searchable and sortable)
  * Clicking on any client in the list will zoom and and show a more detailed look at that client's payment history and their contact information
1. The coach can also click the "payments" button to navigate to a view that allows them to select a specific payment and view it's details.





### Acknowledgements
Huge thanks to everyone at [Prime Digital Academy](http://primeacademy.io)for teaching us the skills we needed to build something like this. Huge thanks especially to [Dane Smith](https://github.com/drhowser), [Kris Szafranski](https://github.com/kdszafranski), and [Edan Schwartz](https://github.com/eschwartz).


We're [Jordan Ashbacher](https://github.com/jordan-ashbacher), [Mark Koerner](https://github.com/mnpkoerner), [Josh Vedane](https://github.com/Joshua-Vedane), and [Simeon Willard](https://github.com/simeonwillard) as part of [Prime Digital Academy](http://primeacademy.io). This was our capstone project and we're proud to send it out into the world.
