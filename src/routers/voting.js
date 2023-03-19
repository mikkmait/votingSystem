import express from 'express';
import Debug from 'debug';
import { MongoClient } from 'mongodb';

const vote1Route = express.Router();
const debug = Debug('app');

const url = 'mongodb+srv://kriisid:6UNt3yQEzYVIZXHM@kriisidcluster.elkybmy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

vote1Route.post('/vote1').get((req, res) => {
  const selectedOption = req.body.option;
  console.log(selectedOption);
  // (async function mongo(){
  //   try {
  //     const dbName = client.db('votingSystem');
  //     const songs = dbName.collection('songs');
  //     const dancers = dbName.collection('dancers');

  //     debug('connected to Mongo');
      
  //     const query1 = { vote1: true };
  //     const project1 = { _id: 0, nick: 1, vote1Count: 1 };
  //     const sort1 = { vote1Count: -1 };
  //     const dancer1vote = await dancers.find(query1).project(project1);
  //     await dancer1vote.forEach(console.dir);
  //     const dancer1result = await dancers.find(query1).project(project1).sort(sort1);
  //     await dancer1result.forEach(console.dir);

  //   } catch (error) {
  //     debug(error.stack);
  //   }
  // }())
})

export default vote1Route;