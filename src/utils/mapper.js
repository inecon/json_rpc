const mapper = ({data, error, message}) => {
    const answer = {}
    error ? answer.error = true : answer.data = data

    return {
        ...answer,
        ...(message && {message})
    }
}
module.exports = mapper