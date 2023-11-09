const { Client } = require('pg'); // Use 'Client' instead of 'DB'

const PG_URI = 'postgres://cvuqtpct:OOhaJf6rGio3X3JDhZyk7mOOUOzpSMxe@bubble.db.elephantsql.com/cvuqtpct';

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
