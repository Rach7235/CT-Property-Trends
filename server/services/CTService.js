//This file handles querying the database and all related helper functions

// Importing constants
const SqlConst = require('../constants/SqlConst');
const ServConst = require('../constants/ServConst');

const getTowns = async (connection) => {

    const result = await connection.execute(`SELECT distinct ${ServConst.town} FROM ${ServConst.addressTable}`)
    // label, value is the format of the multiselect component
    // will be an array instead of a single value since user can select multiple things
    const towns = result.rows.map(row => ({ label: row[0], value: row[0] }));

    return towns;
};

const getResidentialTypes = async (connection) => {

    const result = await connection.execute(`SELECT ${ServConst.resTypeName} FROM ${ServConst.resTypeTable}`)
    // label, value is the format of the multiselect component
    // will be an array instead of a single value since user can select multiple things
    const residentialTypes = result.rows.map(row => ({ label: row[0], value: row[0] }));

    return residentialTypes;
};

const getYearRange = async(connection) => {
    const result = await connection.execute(`SELECT MIN(extract(YEAR from ${ServConst.saleDate})) AS minYear, MAX(extract(YEAR from ${ServConst.saleDate}))AS maxYear FROM ${ServConst.salesInfoTable}`)

    const [minYear, maxYear] = result.rows[0];

    return {minYear, maxYear};
}

// returns the results of the query specified by the user through the formData
const getQueryResults = async (formData, connection) => {
    let query = await formulateQuery(formData)

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

    return queryResults;
};

// uses formData selected by the user to formulate the requested query
const formulateQuery = async (formData) => {
    let where = await formulateWhereClause(formData);
    let query;

    // depending on the selected query, append relevant Select, From, Group, and Order clauses from SqlConst.js
    switch (formData.trendQuery) {
        case 'Avg Sales Amount':
            query = SqlConst.asaSelectFrom;
            query += where;
            query += SqlConst.asaGroupOrder;
            break;
        case 'Total Sales Volume':
            query = SqlConst.tsvSelectFrom;
            query += where;
            query += SqlConst.tsvGroupOrder;
            break;
        case 'Avg Sales Ratio':
            query = SqlConst.asrSelectFrom;
            query += where;
            query += SqlConst.asrGroupOrder;
            break;
        case 'Avg Assessed Value':
            query = SqlConst.aavSelectFrom;
            query += where;
            query += SqlConst.aavGroupOrder;
            break;
        case 'Total Sales Volume mnth':
            query = SqlConst.tsvmSelectFrom;
            query += where;
            query += SqlConst.tsvmGroupOrder;
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
    let where = `WHERE a.${ServConst.town} IN ('`;
    let towns = townValues.join("', '");
    where += towns;

    //filter by residential type
    where += `') \nAND rt.${ServConst.resTypeName} IN ('`;
    let rtypes = residentialTypeValues.join(`', '`);
    where += rtypes;
    where += `') \n`;

    //filter by min and max sale price and sale ratio
    if(formData.minSalePrice !== ''){
        where += `AND si.${ServConst.saleAmount} >= ${formData.minSalePrice} `;
    }
    if(formData.maxSalePrice !== ''){
        where += `AND si.${ServConst.saleAmount} <= ${formData.maxSalePrice} `;
    }
    if(formData.minSaleRatio !== ''){
        where += `AND si.${ServConst.saleRatio} >= ${formData.minSaleRatio} `;
    }
    if(formData.maxSaleRatio !== ''){
        where += `AND si.${ServConst.saleRatio} <= ${formData.maxSaleRatio} `;
    }
    where += `\n`;

    return where;
};

module.exports = {
    getTowns,
    getResidentialTypes,
    getQueryResults,
    getYearRange
};