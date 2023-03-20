import express, { json } from 'express';
import Debug from 'debug';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const adminRouter = express.Router();
const debug = Debug('app');

const url = process.env.ATLAS_URI;
const client = new MongoClient(url);

const dbName = client.db('votingSystem');
const songs = dbName.collection('songs');
const dancers = dbName.collection('dancers');
const pages = dbName.collection('pages');

const queryAll = { $or: [ {'vote1': true}, {'valid': true} ] };
const projectionAll = { _id: 0, nick: 1, vote1Count: 1, vote2Count: 1, vote3Count: 1, name: 1, votes: 1 };
const sort1 = { vote1Count: -1 };
const sort2 = { votes: -1 };
const sort3 = { vote2Count: -1 };
const sort4 = { vote3Count: -1 };

//! NEED KÕIK TULEB VÄLJA KUTSUDA ASYNC SEES KUIDAGI
//! KOGU MONGO STRUTUUR TULEB OTSAST PEALE TEHA, ET OLEKS DYNAAMILISEM

const dancer1Result = await dancers.find(queryAll).project(projectionAll).sort(sort1);
const songsResult = await songs.find(queryAll).project(projectionAll).sort(sort2);
const dancer2Result = await dancers.find(queryAll).project(projectionAll).sort(sort3);
const dancer3Result = await dancers.find(queryAll).project(projectionAll).sort(sort4);
const dancer1ResultLimit = await dancer1Result.limit(3).toArray();
const songsResultLimit = await songsResult.limit(3).toArray();
const dancer2ResultLimit = await dancer2Result.limit(3).toArray();
const dancer3ResultLimit = await dancer3Result.limit(3).toArray();

const sumAll = await dancers.aggregate([{$group: { _id: null, sumVote1:{$sum:"$vote1Count"}}}]).toArray();

let winner = '';

adminRouter.route('/').get((req, res) => {
  (async function mongo(){
    console.log(sumAll);
    try {
      res.render('admin', {dancer1Result, dancer2Result, dancer3Result, songsResult, dancer1ResultLimit, dancer2ResultLimit, dancer3ResultLimit, songsResultLimit});
    } catch (error) {
      debug(error.stack);
    }
  }())
})

adminRouter.route('/initializeAllVotes').get((req, res) => {
  console.log(req.query);
  (async function mongo(){
    try {
      const query = {nick: {$ne: 'xxx'}};
      const updateD = {$set: {vote1Count: 0, vote2Count: 0, vote3Count: 0} };
      const updateS = {$set: {votes: 0} };
      dancers.updateMany(query, updateD);
      songs.updateMany(query, updateS);
      const dancersZero = await dancers.find(query,).project( { _id: 0, nick: 1, vote1Count: 1, vote2Count: 1, vote3Count: 1} ).toArray();
      const songsZero = await songs.find(query).project( { _id: 0, nick: 1, votes: 1 } ).toArray();
      debug(dancersZero);
      debug(songsZero);

      res.render('admin', {dancer1Result, dancer2Result, dancer3Result, songsResult, dancer1ResultLimit, dancer2ResultLimit, dancer3ResultLimit, songsResultLimit});
    } catch (error) {
        debug(error.stack);
    }
  }())
})

adminRouter.route('/activateVotes').get((req, res) => {
  console.log(req.query);
  const data = req.query.push;
  console.log(data);
  const push = JSON.parse(data);
  console.log(push);
  console.log(push.pageName);
  console.log(push.disabled);
  (async function mongo(){
    try {
      const query = { pageName: push.pageName };
      const update = { $set: { disabled: push.disabled }};
      pages.updateOne(query, update);

      res.render('admin', {dancer1Result, dancer2Result, dancer3Result, songsResult, dancer1ResultLimit, dancer2ResultLimit, dancer3ResultLimit, songsResultLimit}).json(dancer1Result);
    } catch(error) {
      debug(error.stack);
    }
  }())
})

adminRouter.route('/changeWinner').get((req, res) => {
  console.log(req.query);
  winner = req.query.winner;
  console.log(winner);
  (async function mongo(){
    try {
      const query = { trueWinner: true };
      const update = { $set: {'winner': winner}};
      dancers.updateOne(query, update);

      const queryAll = { $or: [ {'vote1': true}, {'valid': true} ] };
      const projectionAll = { _id: 0, nick: 1, vote1Count: 1, vote2Count: 1, vote3Count: 1, name: 1, votes: 1 };
      const sort1 = { vote1Count: -1 };
      const sort2 = { votes: -1 };
      const sort3 = { vote2Count: -1 };
      const sort4 = { vote3Count: -1 };
      const dancer1Result = await dancers.find(queryAll).project(projectionAll).sort(sort1).limit(3).toArray();
      const songsResult = await songs.find(queryAll).project(projectionAll).sort(sort2).limit(3).toArray();
      const dancer2Result = await dancers.find(queryAll).project(projectionAll).sort(sort3).limit(3).toArray();
      const dancer3Result = await dancers.find(queryAll).project(projectionAll).sort(sort4).limit(3).toArray();

      res.render('admin', {dancer1ResultLimit, dancer2ResultLimit, dancer3ResultLimit, songsResultLimit});

    } catch(error) {
      debug(error.stack);
    }
  }())
})

export default adminRouter;