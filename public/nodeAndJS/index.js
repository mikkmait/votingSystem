const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = "mongodb+srv://kriisid:VWHASjSxoXiLSHtk@kriisidcluster.elkybmy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function findDancersForVote1() {
  try {
    const database = client.db('votingSystem');
    const songs = database.collection('songs');
    const dancers = database.collection('dancers');

    // Query for the song vote, names and vote counts
    const querySong = { valid: true };
    const projectionSong = { _id: 0, name: 1, votes: 1};
    const songsVote = await songs.find(querySong).project(projectionSong);
    await songsVote.forEach(console.dir);

    // Query for the 1st vote, names and vote counts
    const query1 = { vote1: true };
    const projection1 = { _id: 0, nick: 1, vote1Count: 1};
    const dancer1 = await dancers.find(query1).project(projection1);
    await dancer1.forEach(console.dir);
    
    // Query for the 2nd vote, names and vote counts
    const query2 = { vote2: true };
    const projection2 = { _id: 0, nick: 1, vote2Count: 1};
    const dancer2 = await dancers.find(query2).project(projection2);
    await dancer2.forEach(console.dir);
    
    // Query for the 3rd vote, names and vote counts
    const query3 = { vote3: true };
    const projection3 = { _id: 0, nick: 1, vote3Count: 1};
    const dancer3 = await dancers.find(query3).project(projection3);
    await dancer3.forEach(console.dir);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

findDancersForVote1().catch(console.dir);