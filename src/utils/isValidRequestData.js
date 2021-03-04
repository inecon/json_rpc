const isValidRequestData = function (json, rules) {
    let error;
    for (const field of rules) {
        if (typeof field === 'string') {
            let data = json[field]
            if (!data) {
                error = new Error(`Field '${field}' is requerd`)
            }
        }
        if (typeof field === 'object') {
            let data = json[field.name]
            if (field.minMax) {
                const [min, max] = field.minMax
                if (data.length < min || data.length > max) {
                    error =  new Error(`Field '${field.name}' must be in range ${min}-${max} symbols`)
                    break
                }
            }
        }
    }
    return error
}

module.exports = isValidRequestData