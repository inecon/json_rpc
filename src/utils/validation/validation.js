const validations = require('./validations')

function validation(data, rules = []) {
    let errors = [];
    rules.forEach(({name, rules: config}) => {
        const field = data[name]

        config.forEach(validation => {
            const key = typeof validation === 'string' ? validation : validation.type

            const checker = validations[key]
            if (!checker) {
                console.log(`Rule ${key} wasn't found`)
                return
            }
            const error = checker({
                field,
                name,
                ...(validation.params && {params: validation.params})
            })
            error && errors.push(error)
        })

    })
    return errors
}

module.exports = validation