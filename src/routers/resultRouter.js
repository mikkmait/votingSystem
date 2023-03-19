import express from 'express';
import Debug from 'debug';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const resultRouter = express.Router();
const debug = Debug('app');

const url = process.env.ATLAS_URI;
const client = new MongoClient(url);

const dbName = client.db('votingSystem');
const songs = dbName.collection('songs');
const dancers = dbName.collection('dancers');

resultRouter.route('/').get((req, res) => {
  (async function mongo(){
    try {
      debug('connected to Mongo');
      
      // const query1 = { vote1: true };
      // const query2 = { valid: true };
      // const query3 = { vote2: true };
      // const query4 = { vote3: true };
      // const projection = { _id: 0, nick: 1, vote1Count: 1, vote2Count: 1, vote3Count: 1, name: 1, votes: 1 };
      // const sort1 = { vote1Count: -1 };
      // const sort2 = { votes: -1 };
      // const sort3 = { vote2Count: -1 };
      // const sort4 = { vote3Count: -1 };
      // const dancer1Result = await dancers.find(query1).project(projection).sort(sort1).toArray();
      // const songsResult = await songs.find(query2).project(projection).sort(sort2).toArray();
      // const dancer2Result = await dancers.find(query3).project(projection).sort(sort3).toArray();
      // const dancer3Result = await dancers.find(query4).project(projection).sort(sort4).toArray();
      // debug(dancer1Result);
      // debug(songsResult);
      // debug(dancer2Result);
      // debug(dancer3Result);

      res.render('result');

    } catch (error) {
      debug(error.stack);
    }
  }())
})

export default resultRouter;