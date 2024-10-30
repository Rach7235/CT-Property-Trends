// This file stores constants (currently only strings containing query segments)

const dotenv = require('dotenv');
dotenv.config({path:"./.env"});

// Avg Sales Amount
const asaSelectFrom =
    `SELECT
    TO_CHAR(si.sale_date, 'YYYY') AS sale_year,
    a.town,
    TO_CHAR(ROUND(AVG(si.sales_amount), 2), '999999999.99') AS avg_assessed_value
    
FROM "M.ENGERT".Sales_Info si
JOIN "M.ENGERT".Address a ON si.address_id = a.id
JOIN "M.ENGERT".Residential_Type rt ON si.residential_type_id = rt.id
`;

const asaGroupOrder =
    `GROUP BY
    TO_CHAR(si.sale_date, 'YYYY'),
    a.town
ORDER BY
    sale_year,
    a.town`;

// Total Sales Volume
const tsvSelectFrom =
    `SELECT
    TO_CHAR(si.sale_date, 'YYYY') AS sale_year,
    a.town,
    rt.type_name AS residential_type,
    COUNT(si.serial_number) AS total_sales_vol
    
FROM "M.ENGERT".Sales_Info si
JOIN "M.ENGERT".Address a ON si.address_id = a.id
JOIN "M.ENGERT".residential_type rt ON si.residential_type_id = rt.id
`;

const tsvGroupOrder =
    `GROUP BY
    TO_CHAR(si.sale_date, 'YYYY'),
    a.town,
    rt.type_name
ORDER BY
    sale_year,
    a.town,
    rt.type_name`;

// Avg Sales Ratio
const asrSelectFrom =
    `SELECT
    TO_CHAR(si.sale_date, 'YYYY') AS sale_year,
    a.town,
    ROUND(AVG(si.sales_ratio), 4) AS avg_sales_ratio
    
FROM "M.ENGERT".Sales_Info si
JOIN "M.ENGERT".Address a ON si.address_id = a.id
JOIN "M.ENGERT".residential_type rt ON si.residential_type_id = rt.id
`;

const asrGroupOrder =
    `GROUP BY
    TO_CHAR(si.sale_date, 'YYYY'),
    a.town
ORDER BY
    sale_year,
    a.town`;

//Avg Assessed Value
const aavSelectFrom =
    `SELECT
    TO_CHAR(si.sale_date, 'YYYY') AS sale_year,
    a.town,
    TO_CHAR(ROUND(AVG(si.assessed_value), 2), '999999999.99') AS avg_assessed_value
    
FROM "M.ENGERT".Sales_Info si
JOIN "M.ENGERT".Address a ON si.address_id = a.id
JOIN "M.ENGERT".residential_type rt ON si.residential_type_id = rt.id
`;

const aavGroupOrder =
    `GROUP BY
    TO_CHAR(si.sale_date, 'YYYY'),
    a.town
ORDER BY
    sale_year,
    a.town`;

// Total Sales Volume mnth
const tsvmSelectFrom =
    `SELECT
    TO_CHAR(si.sale_date, 'MM') AS sale_month,
    a.town,
    COUNT(si.serial_number) AS total_sales_vol
    
FROM "M.ENGERT".Sales_Info si
JOIN "M.ENGERT".Address a ON si.address_id = a.id
JOIN "M.ENGERT".residential_type rt ON si.residential_type_id = rt.id
`;

const tsvmGroupOrder =
    `GROUP BY
    TO_CHAR(si.sale_date, 'MM'),
    a.town
ORDER BY
    sale_month`;

module.exports = {
    asaSelectFrom,
    asaGroupOrder,
    tsvSelectFrom,
    tsvGroupOrder,
    asrSelectFrom,
    asrGroupOrder,
    aavSelectFrom,
    aavGroupOrder,
    tsvmSelectFrom,
    tsvmGroupOrder
};