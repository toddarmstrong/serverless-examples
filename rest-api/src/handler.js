const uuid = require('uuid/v4')
const { scan, query, put } = require('./dynamodb')
const { responseHandler } = require('./utils')

const TableName = process.env.MOVIES_TABLE_NAME

module.exports.getAllMovies = async () => {
    try {
        const params = {
            TableName
        }

        return responseHandler(200, {
            data: await scan(params)
        })
    } catch (err) {
        return responseHandler(500, { message: err.message })
    }
}

module.exports.getMovieById = async (event) => {
    if (event.queryStringParameters && event.queryStringParameters.id) {
        try {
            const params = {
                TableName,
                ExpressionAttributeValues: {
                    ':id': event.queryStringParameters.id
                },
                KeyConditionExpression: 'id = :id'
            }

            return responseHandler(200, {
                data: await query(params)
            })
        } catch (err) {
            return responseHandler(500, { message: err.message })
        }
    } else {
        return responseHandler(400, { message: `Query string parameter 'genre' not sent.` })
    }
}

module.exports.getMoviesByGenre = async (event) => {
    if (event.queryStringParameters && event.queryStringParameters.genre) {
        try {
            const params = {
                TableName,
                IndexName: 'GenreIndex',
                ExpressionAttributeValues: {
                    ':genre': event.queryStringParameters.genre
                },
                KeyConditionExpression: 'genre = :genre'
            }

            return responseHandler(200, {
                data: await query(params)
            })
        } catch (err) {
            return responseHandler(500, { message: err.message })
        }
    } else {
        return responseHandler(400, { message: `Query string parameter 'genre' not sent.` })
    }
}

module.exports.addMovie = async (event) => {
    if (event.body) {
        const body = JSON.parse(event.body)

        if (
            body.name && 
            body.year && 
            body.genre
        ) {
            try {
                const params = {
                    TableName,
                    Item: {
                        id: uuid(),
                        name: body.name,
                        year: body.year,
                        genre: body.genre
                    }
                }
    
                return responseHandler(201, {
                    data: await put(params)
                })
            } catch (err) {
                return responseHandler(500, { message: err.message })
            }
        } else {
            return responseHandler(400, { message: `Required data not sent. Please make sure to sent name, year and genre of movie.` })
        }
    } else {
        return responseHandler(400, { message: `Data not sent through.` })
    }
}