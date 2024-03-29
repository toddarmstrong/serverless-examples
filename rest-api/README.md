# rest-api

A Node.js REST API utilising multiple Lambda functions per endpoint and a single API Gateway.

The API is using DynamoDB as the data source, and contains a single table to store movies.

## Deploy

Install the dependancies via Yarn

```bash
yarn install
```

Deploy the project

```bash
yarn run deploy
```

Before being able to seed the database, you need to edit the `STAGE` in `movies.json` to match the stage you are deploying to.

```json
{
    "STAGE-rest-api-movies": [
        {
```

Once the stage has been defined in the json file, run the following command.

```bash
yarn run seed
```

## API details

| Endpoint          | Method | Example                                                                  | Data |
| ----------------- |:------:| -------------------------------------------------------------------------| - |
| /getAllMovies     | GET    | https://api.url.com/getAllMovies                                         |   |
| /getMovieById     | GET    | https://api.url.com/getMovieById?id=46141ac4-8e12-4287-a7b3-9028aa3dbe93 |   |
| /getMoviesByGenre | GET    | https://api.url.com/getMoviesByGenre?genre=thriller                      |   |
| /addMovie         | POST   | https://api.url.com/addMovie                                             | `{ "name": "Terminator", "year": "1984", "genre": "action" }` |