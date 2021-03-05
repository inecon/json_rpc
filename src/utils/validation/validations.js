const TYPES = require('./types')

const reqExp = {
    onlyNumber: /^\d+$/,
    objectID: /^[0-9a-fA-F]{24}$/,
}

const generateErrorMessage = (name, description) => {
    return `Field => ${name} <= ${description}`
}

function isRequired({field = '', name}) {
    typeof field === "number" ? field = field.toString() : field
    if (!field.length) {
        return generateErrorMessage(name, "is required")
    }
    return null
}

function maxLength({field = '', name, params: {maxLimit}}) {
    if (field.length > maxLimit) {
        return generateErrorMessage(name, `must be short short then ${maxLimit}`)
    }
    return null
}


function minMax({field, name, params: {min = 0, max = 100}}) {
    typeof field === "number" ? field = field.toString() : field
    if (field === undefined) {
        return null
    } else if (field.length < min || field.length > max) {
        return generateErrorMessage(name, `must be between ${min} and ${max}`)
    }
    return null
}

function isArray({field = '', name}) {
    if (!(typeof field === "object")) {
        return null
    } else if (!Array.isArray(field)) {
        return generateErrorMessage(name, 'must be Array')
    }
    return null
}

function isNumber({field = '', name}) {
    if (!(typeof field === 'number')) {
        return generateErrorMessage(name, 'must be Number`')
    }
    return null
}

function isObjectID({field = '', name}) {
    if (!new RegExp(reqExp.objectID).test(field)) {
        return generateErrorMessage(name, 'must be ObjectID`')
    }
    return null
}

module.exports = {
    [TYPES.isRequired]: isRequired,
    [TYPES.maxLength]: maxLength,
    [TYPES.minMax]: minMax,
    [TYPES.isArray]: isArray,
    [TYPES.isNumber]: isNumber,
    [TYPES.isObjectID]: isObjectID,
}