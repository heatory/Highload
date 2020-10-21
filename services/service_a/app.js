'use strict';

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const { PORT } = require('./config');

const caller = require('grpc-caller');
const PROTO_PATH = "../protos/number.proto";
const client = caller('0.0.0.0:30043', PROTO_PATH, 'NumberService')

let verified_numbers = new Set();
const schema = buildSchema(`
  type Query {
    isVerified(number: String): Boolean
  }

  type Mutation {
    checkNumber(number: String, code: Int): String
  }
`);
let root = {
    isVerified: ({ number }) => {
        if(verified_numbers.has(number)){
            return true;
        }
        else {
            return false;
        }
    },
    checkNumber: async ({ number, code }) => {
        let response = verified_numbers.has(number) ? { isOk: true } : await client.Check({ number: number, code: code });
        if(response.isOk){
            verified_numbers.add(number);
            return `Номер ${number} верифицирован`;
        }
        else {
            return response.message;
        }
    }
};

const app = express();

app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
})); 

app.listen(PORT, () => {
    console.log(`GraphQL API server running at localhost: ${PORT}`);
});
