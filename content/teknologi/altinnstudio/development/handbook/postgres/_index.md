---
title: PostgreSQL
description: Setting up PostgreSQL for local development
tags: [development]
weight: 100
---

{{% panel %}}
**NOTE:** Work in progress.
{{% /panel %}}

## Install PostgreSQL and pgAdmin4

Follow the instructions on https://www.postgresql.org/download/

## Set up database

Open pgAdmin 4.
We will be working on the PostgreSQL 13 server.

1. Right click on _Databases_ and select _Create_.
![Create new database](images/setup-1.PNG "Create new database")

2. Fill inn database name `eventsdb` and click _Save_.
![Configure new database](images/setup-2.PNG "Configure new database")

3. You should now be able to see a new database in the list. If you don't - right click the server and select _REFRESH_.
![Confirm new database](images/setup-3.PNG "Confirm new database")

## Set up users

1. Right click on _Login/Group Roles_ , select _Create_ and _Login/Group Roles_.
![Step 1](images/setup-user-1.PNG "Step 1")

2. In the _General_ tab fill out the username `platform_events_admin`
![Step 2](images/setup-user-2.PNG "Step 2")

3. Navigate to the _Definition_ tab and insert password: `Password`
![Step 3](images/setup-user-3.PNG "Step 3")

4. Navigate to the _Priviliges_ tab and enable _Can login_
![Step 4](images/setup-user-4.PNG "Step 4")

5. Navigate to the _Membership_ tab and include `postgres` as a role and click _Save
![Step 5](images/setup-user-5.PNG "Step 5")

6. Confirm that the user has been created in the side bar.
If you cannot see the user, try refreshing the _Login/Group Roles_ section.
![Step 6](images/setup-user-6.PNG "Step 6")
