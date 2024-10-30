//This file handles querying the database and all related helper functions

// Importing constants and db
const ServConst = require('../constants/ServConst');
const db = require('../db');

const getTowns = async () => {

    let connection = await db.startConnection()
    const result = await connection.execute('SELECT distinct Town FROM "M.ENGERT".Address')
    // label, value is the format of the multiselect component
    // will be an array instead of a single value since user can select multiple things
    const towns = result.rows.map(row => ({ label: row[0], value: row[0] }));
    await db.closeConnection();

    return towns;
};

const getResidentialTypes = async () => {

    let connection = await db.startConnection()
    const result = await connection.execute('SELECT Type_Name FROM "M.ENGERT".Residential_Type')
    // label, value is the format of the multiselect component
    // will be an array instead of a single value since user can select multiple things
    const residentialTypes = result.rows.map(row => ({ label: row[0], value: row[0] }));
    await db.closeConnection();

    return residentialTypes;
};

// returns the results of the query specified by the user through the formData
const getQueryResults = async (formData) => {
    let query = await formulateQuery(formData)

    let connection = await db.startConnection()
    // Logging to ensure the query is correct
    console.log('Query:', query);
    const result = await connection.execute(query)

    // Using metaData, get list of column names
    const colNames = result.metaData.map(column => column.name);
    const queryResults = [];
    // Loop through each row and map values to their column name
    for (const row of result.rows) {
        const newRow = {};

        for (let i = 0; i < row.length; i++) {
            newRow[colNames[i]] = row[i];
        }

        // Add newRows (rows with column data) to the results
        queryResults.push(newRow);
    }
    await db.closeConnection();

    return queryResults;
};

// uses formData selected by the user to formulate the requested query
const formulateQuery = async (formData) => {
    let where = await formulateWhereClause(formData);
    let query;

    // depending on the selected query, append relevant Select, From, Group, and Order clauses from ServConst.js
    switch (formData.trendQuery) {
        case 'Avg Sales Amount':
            query = ServConst.asaSelectFrom;
            query += where;
            query += ServConst.asaGroupOrder;
            break;
        case 'Total Sales Volume':
            query = ServConst.tsvSelectFrom;
            query += where;
            query += ServConst.tsvGroupOrder;
            break;
        case 'Avg Sales Ratio':
            query = ServConst.asrSelectFrom;
            query += where;
            query += ServConst.asrGroupOrder;
            break;
        case 'Avg Assessed Value':
            query = ServConst.aavSelectFrom;
            query += where;
            query += ServConst.aavGroupOrder;
            break;
        case 'Total Sales Volume mnth':
            query = ServConst.tsvmSelectFrom;
            query += where;
            query += ServConst.tsvmGroupOrder;
            break;
        default:
            // default should be impossible to reach but is present just in case
            console.warn('Unexpected trendQuery value:', formData.trendQuery);
            break;
    }

    return query;
};

// uses formData selected by the user to formulate the WHERE clause of the query
const formulateWhereClause = async (formData) => {
    // Extracting values from the town and residentialtype maps so they can be used in string join
    const townValues = formData.selectedTown.map(rt => rt.value);
    const residentialTypeValues = formData.selectedResidentialType.map(rt => rt.value);

    //filter by town
    let where = `WHERE a.town IN ('`;
    let towns = townValues.join("', '");
    where += towns;

    //filter by residential type
    where += `') \nAND rt.type_name IN ('`;
    let rtypes = residentialTypeValues.join(`', '`);
    where += rtypes;
    where += `') \n`;

    //filter by min and max sale price and sale ratio
    if(formData.minSalePrice !== ''){
        where += `AND si.sales_amount > ${formData.minSalePrice} `;
    }
    if(formData.maxSalePrice !== ''){
        where += `AND si.sales_amount < ${formData.maxSalePrice} `;
    }
    if(formData.minSaleRatio !== ''){
        where += `AND si.sales_ratio > ${formData.minSaleRatio} `;
    }
    if(formData.maxSaleRatio !== ''){
        where += `AND si.sales_ratio < ${formData.maxSaleRatio} `;
    }
    where += `\n`;

    return where;
};

module.exports = {
    getTowns,
    getResidentialTypes,
    getQueryResults
};