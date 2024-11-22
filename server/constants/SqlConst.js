// This file stores SQL Query segments as string constants

const ServConst = require('./ServConst'); // Import constants
const dotenv = require('dotenv');
dotenv.config({path:"./.env"});

// Avg Sales Amount
const asaSelectFrom =
    `SELECT
    TO_CHAR(si.${ServConst.saleDate}, 'YYYY') AS sale_year,
    a.${ServConst.town},
    TO_CHAR(ROUND(AVG(si.${ServConst.saleAmount}), 2), '999999999.99') AS avg_${ServConst.saleAmount}
    
FROM ${ServConst.salesInfoTable} si
JOIN ${ServConst.addressTable} a ON si.${ServConst.addrId} = a.${ServConst.aId}
JOIN ${ServConst.resTypeTable} rt ON si.${ServConst.resTypeId} = rt.${ServConst.rId}
`;

const asaGroupOrder =
    `GROUP BY
    TO_CHAR(si.${ServConst.saleDate}, 'YYYY'),
    a.${ServConst.town}
ORDER BY
    sale_year,
    a.${ServConst.town}`;

// Total Sales Volume
const tsvSelectFrom =
    `SELECT
    TO_CHAR(si.${ServConst.saleDate}, 'YYYY') AS sale_year,
    a.${ServConst.town},
    rt.${ServConst.resTypeName} AS residential_type,
    COUNT(si.${ServConst.serialNum}) AS total_sales_vol
    
FROM ${ServConst.salesInfoTable} si
JOIN ${ServConst.addressTable} a ON si.${ServConst.addrId} = a.${ServConst.aId}
JOIN ${ServConst.resTypeTable} rt ON si.${ServConst.resTypeId} = rt.${ServConst.rId}
`;

const tsvGroupOrder =
    `GROUP BY
    TO_CHAR(si.${ServConst.saleDate}, 'YYYY'),
    a.${ServConst.town},
    rt.${ServConst.resTypeName}
ORDER BY
    sale_year,
    a.${ServConst.town},
    rt.${ServConst.resTypeName}`;

// Avg Sales Ratio
const asrSelectFrom =
    `SELECT
    TO_CHAR(si.${ServConst.saleDate}, 'YYYY') AS sale_year,
    a.${ServConst.town},
    ROUND(AVG(si.${ServConst.saleRatio}), 4) AS avg_${ServConst.saleRatio}
    
FROM ${ServConst.salesInfoTable} si
JOIN ${ServConst.addressTable} a ON si.${ServConst.addrId} = a.${ServConst.aId}
JOIN ${ServConst.resTypeTable} rt ON si.${ServConst.resTypeId} = rt.${ServConst.rId}
`;

const asrGroupOrder =
    `GROUP BY
    TO_CHAR(si.${ServConst.saleDate}, 'YYYY'),
    a.${ServConst.town}
ORDER BY
    sale_year,
    a.${ServConst.town}`;

//Avg Assessed Value
const aavSelectFrom =
    `SELECT
    TO_CHAR(si.${ServConst.saleDate}, 'YYYY') AS sale_year,
    a.${ServConst.town},
    TO_CHAR(ROUND(AVG(si.${ServConst.assessedVal}), 2), '999999999.99') AS avg_${ServConst.assessedVal}
    
FROM ${ServConst.salesInfoTable} si
JOIN ${ServConst.addressTable} a ON si.${ServConst.addrId} = a.${ServConst.aId}
JOIN ${ServConst.resTypeTable} rt ON si.${ServConst.resTypeId} = rt.${ServConst.rId}
`;

const aavGroupOrder =
    `GROUP BY
    TO_CHAR(si.${ServConst.saleDate}, 'YYYY'),
    a.${ServConst.town}
ORDER BY
    sale_year,
    a.${ServConst.town}`;

// Total Sales Volume mnth
const tsvmSelectFrom =
    `SELECT
    TO_CHAR(si.${ServConst.saleDate}, 'fmMM') AS sale_month,
    a.${ServConst.town},
    COUNT(si.${ServConst.serialNum}) AS total_sales_vol
    
FROM ${ServConst.salesInfoTable} si
JOIN ${ServConst.addressTable} a ON si.${ServConst.addrId} = a.${ServConst.aId}
JOIN ${ServConst.resTypeTable} rt ON si.${ServConst.resTypeId} = rt.${ServConst.rId}
`;

const tsvmGroupOrder =
    `GROUP BY
    TO_CHAR(si.${ServConst.saleDate}, 'fmMM'),
    a.${ServConst.town}
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