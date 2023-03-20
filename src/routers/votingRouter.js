import express from 'express';
import Debug from 'debug';
import { MongoClient } from 'mongodb';

const votingRouter = express.Router();
const debug = Debug('app');

const url = 'mongodb+srv://kriisid:6UNt3yQEzYVIZXHM@kriisidcluster.elkybmy.mongodb.net/?retryWrites=true&w=majority';
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

const sumAll = await dancers.aggregate([{$group: { _id: null, sumVote1:{$sum:"$vote1Count"}}}]).toArray();

votingRouter.route('/').get((req, res) => {
  res.render('voting');
});

votingRouter.route('/vote1').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote1';
      const query = { vote1: true };
      const projection = { _id: 0, nick: 1, vote1Count: 1 };
      const votesQ = await dancers.find(query).project(projection).toArray();
      // debug(votesQ);
      res.render('vote', {votesQ, currentVote});
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote1Disable').get((req, res) => {
  // console.log(req.query);
  (async function mongo(){
    try {
      const currentVote = 'vote1';
      const pagesActiveQ = { pageName: currentVote };
      const pagesProject = { _id: 0, pageName: 1, disabled: 1 };
      const activePageQ = await pages.find(pagesActiveQ).project(pagesProject).toArray();
      // debug(activePageQ);
      res.status(200).json(activePageQ);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote1Percent').get((req, res) => {
  // console.log(req.query);
  (async function mongo(){
    try {
      const dancer1Result = await dancers.find(queryAll).project(projectionAll).sort(sort1).toArray();
      res.status(200).json(dancer1Result);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote1Confirm').get((req, res) => {
  const { vote1 } = req.query;
  console.log(vote1);
  (async function mongo(){
    try {
      debug('connected to Mongo');
      const query = { nick: vote1 };
      const update = { $inc: {vote1Count: 1} };
      dancers.updateOne(query, update);
      const votesQ = await dancers.find({ vote1: true }).project({ _id: 0, nick: 1, vote1Count: 1}).toArray();
      const currentVote = 'vote1';
      res.render('voting', {votesQ, currentVote});
      debug(votesQ);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote2').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote2';
      const query = { valid: true };
      const projection = { _id: 0, nick: 1, votes: 1 };
      const votesQ = await songs.find(query).project(projection).toArray();
      debug(votesQ);
      res.render('vote', {votesQ, currentVote});
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote2Disable').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote2';
      const pagesActiveQ = { pageName: currentVote };
      const pagesProject = { _id: 0, disabled: 1 };
      const activePageQ = await pages.find(pagesActiveQ).project(pagesProject).toArray();
      debug(activePageQ);
      res.status(200).json(activePageQ);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote2Percent').get((req, res) => {
  // console.log(req.query);
  (async function mongo(){
    try {
      const songsResult = await songs.find(queryAll).project(projectionAll).sort(sort2).toArray();
      res.status(200).json(songsResult);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote2Confirm').get((req, res) => {
  console.log(req.query);
  const { vote2 } = req.query;
  console.log(vote2);
  (async function mongo(){
    try {
      const query = { nick: vote2 };
      const update = { $inc: {votes: 1} };
      songs.updateOne(query, update);
      const votesQ = await songs.find({ valid: true }).project({ _id: 0, nick: 1, votes: 1 }).toArray();
      const currentVote = 'vote2';
      res.render('voting', {votesQ, currentVote});
      debug(votesQ);

    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote3').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote3';
      const query = { vote2: true };
      const projection = { _id: 0, nick: 1, vote2Count: 1 };
      const votesQ = await dancers.find(query).project(projection).toArray();
      debug(votesQ);

      res.render('vote', {votesQ, currentVote});
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote3Disable').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote3';
      const pagesActiveQ = { pageName: currentVote };
      const pagesProject = { _id: 0, disabled: 1 };
      const activePageQ = await pages.find(pagesActiveQ).project(pagesProject).toArray();
      debug(activePageQ);
      res.status(200).json(activePageQ);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote3Percent').get((req, res) => {
  // console.log(req.query);
  (async function mongo(){
    try {
      const dancer2Result = await dancers.find(queryAll).project(projectionAll).sort(sort3).toArray();
      res.status(200).json(dancer2Result);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote3Confirm').get((req, res) => {
  console.log(req.query);
  const { vote3 } = req.query;
  console.log(vote3);
  (async function mongo(){
    try {
      const query = { nick: vote3 };
      const update = { $inc: {vote2Count: 1} };
      dancers.updateOne(query, update);
      const votesQ = await dancers.find({ vote2: true }).project({ _id: 0, nick: 1, vote2Count: 1 }).toArray();
      const currentVote = 'vote3';
      res.render('voting');
      debug(votesQ);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote4').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote4';
      const query = { vote3: true };
      const projection = { _id: 0, nick: 1, vote3Count: 1 };
      const votesQ = await dancers.find(query).project(projection).toArray();
      debug(votesQ);
      res.render('vote', {votesQ, currentVote});
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote4Disable').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote4';
      const pagesActiveQ = { pageName: currentVote };
      const pagesProject = { _id: 0, disabled: 1 };
      const activePageQ = await pages.find(pagesActiveQ).project(pagesProject).toArray();
      debug(activePageQ);
      res.status(200).json(activePageQ);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote4Percent').get((req, res) => {
  // console.log(req.query);
  (async function mongo(){
    try {
      const dancer3Result = await dancers.find(queryAll).project(projectionAll).sort(sort4).toArray();
      res.status(200).json(dancer3Result);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote4Confirm').get((req, res) => {
  console.log(req.query);
  const { vote4 } = req.query;
  console.log(vote4);
  (async function mongo(){
    try {
      const query = { nick: vote4 };
      const update = { $inc: {vote3Count: 1} };
      dancers.updateOne(query, update);
      const votesQ = await dancers.find({ vote3: true }).project({ _id: 0, nick: 1, vote3Count: 1 }).toArray();
      const currentVote = 'vote4';
      res.render('voting', {votesQ, currentVote});
      debug(votesQ);

    } catch (error) {
      debug(error.stack);
    }
  }())
});

export default votingRouter;