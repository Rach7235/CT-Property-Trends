// This file stores constants to be used in the back end.

// API endpoint constants
const Town = 'towns'
const resType = 'residential-type'
const queryRequest = 'submit-and-query'
const Year = 'years'

//Table name constants
const addressTable = '"M.ENGERT".Address'
const resTypeTable = '"M.ENGERT".Residential_Type'
const salesInfoTable = '"M.ENGERT".Sales_Info'

//Address Table attribute constants
const aId = 'id'
const town = 'town'
const addrLines = 'address_lines'

// Residential Table attribute constants
const rId = 'id'
const resTypeName = 'type_name'

// Sales Info Table attribute constants
const serialNum = 'serial_number'
const saleDate = 'sale_date'
const saleAmount = 'sales_amount'
const assessedVal = 'assessed_value'
const saleRatio = 'sales_ratio'
const addrId = 'address_id'
const resTypeId = 'residential_type_id'

module.exports = {
    Town,
    resType,
    queryRequest,
    Year,
    addressTable,
    resTypeTable,
    salesInfoTable,
    aId,
    town,
    addrLines,
    rId,
    resTypeName,
    serialNum,
    saleDate,
    saleAmount,
    assessedVal,
    saleRatio,
    addrId,
    resTypeId
};