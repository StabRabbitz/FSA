const { Client } = require('pg'); // Use 'Client' instead of 'DB'

const PG_URI = 'postgres://unbrdbbu:YlyeXVScMxCm2eFHy-ANcjRLiWdfUK4C@bubble.db.elephantsql.com/unbrdbbu';

const client = new Client({
  connectionString: PG_URI
});

client.connect(); 

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return client.query(text, params, callback);
  }
};