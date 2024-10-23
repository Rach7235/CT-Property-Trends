# CT-Property-Trends
This project was created for CIS 4301 (Information and Database Management Systems I) at UF Online
# Description
The CT Property Trends application allows users to gain deeper insight on real estate trends in Connecticut over the past 15 years by exploring detailed property sales data from within the state. 

# Purpose 
* Assist homeowners and sellers on determining the best time to sell their home is and what price according to market value is fair when making an offer to buy a house
* Assist realtors in being able to  analyze past sales amount trends to determine the best value to price a home that would attract buyers and also sell for a reasonable amount
* Assist investors in making  better informed decisions about where to buy and sell properties for investment purposes by analyzing the historical trends in property value and sales volume based on location
* Assist apparaisers in determining accurate home valuations that reflect the current market prices by analyzing past real estate market trends

# How It Works
Users can specify the information they’re looking for by filtering by town, specific year and month (or a range of years), sales amounts, sales ratios, and different property types from a submission form

Then, users will visualize the data through two primary graphical representations: an interactive map and a comprehensive trend graph.

# Project Startup Instructions
First, clone the repository

## Frontend
1. cd client
2. npm install
3. npm start 
- The frontend runs on localhost:3000 by default

## Backend
1. cd server 
2. npm init
3. nodemon index.js
- The backend runs on port 2000 by default

## Database
The database used for this project is Oracle
- A UF VPN must be connected for database use
- This database runs on host oracle.cise.ufl.edu, port 1521, and service orcl

### Tables
All insertion commands for each table can be found in the database directory

CREATE TABLE Address (

ID INTEGER NOT NULL PRIMARY KEY,

Town VARCHAR2(255) NOT NULL,

Address_Lines VARCHAR2(255)

);


CREATE TABLE Sales_Info (

Serial_Number INTEGER NOT NULL PRIMARY KEY,

Sale_Date DATE NOT NULL,

Sales_Amount INTEGER NOT NULL,

Assessed_Value INTEGER NOT NULL,

Sales_Ratio NUMBER(5, 4) NOT NULL,

Address_ID INTEGER NOT NULL,

Residential_Type_ID INTEGER NOT NULL,

CONSTRAINT fk_address FOREIGN KEY (Address_ID) REFERENCES Address(ID),

CONSTRAINT fk_residential_type FOREIGN KEY (Residential_Type_ID) REFERENCES Residential_Type(ID)

);


CREATE TABLE Residential_Type (

ID INTEGER NOT NULL PRIMARY KEY,

Type_Name VARCHAR2(255) NOT NULL

);

