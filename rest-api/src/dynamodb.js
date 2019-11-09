const { DynamoDB } = require('aws-sdk')

const dynamoDb = new DynamoDB.DocumentClient()

module.exports.scan = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await dynamoDb.scan(params).promise()
            resolve(response.Items)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports.query = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await dynamoDb.query(params).promise()

            if (response.Items.length === 1) {
                resolve(response.Items[0])
            } else if (response.Items.length > 1) {
                resolve(response.Items)
            } else {
                resolve(null)
            }
        } catch (err) {
            reject(err)
        }
    })
}

module.exports.put = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            await dynamoDb.put(params).promise()
            resolve(params.Item)
        } catch (err) {
            reject(err)
        }
    })
}
