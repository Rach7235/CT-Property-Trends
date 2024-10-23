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
    