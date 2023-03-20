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
const dancers = dbName.collection('dancers');

resultRouter.route('/').get((req, res) => {
  (async function mongo(){
    let winner = await dancers.find({trueWinner: true}).project( { _id: 0, winner: 1 }).toArray();
    // console.log(winner);
    try {
      res.render('result', {winner});
    } catch (error) {
      debug(error.stack);
    }
  }())
})

resultRouter.route('/changeWinner').get((req, res) => {
  console.log(req.query);
  winner = req.query.winner;
  console.log(winner);

  res.render('result', { winner } )
})

export default resultRouter;