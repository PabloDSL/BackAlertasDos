'user strict';

const { Client } = require('pg')

const connectionData = {
    user: 'iovyymwgcbczfn',
    host: 'ec2-54-83-61-142.compute-1.amazonaws.com',
    database: 'd49s4e1caspeur',
    password: 'e275b3a3326cdecddb9ac3ea7da996679e745f396b000d2bb63ba4600ff3c9a3',
    port: 5432,
    ssl: true,
  }
  const client = new Client(connectionData)

  client.connect(function(err) {
    if (err) throw err;
});

module.exports = client;
