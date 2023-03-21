import express from 'express';
import Debug from 'debug';
import { MongoClient } from 'mongodb';

const votingRouter = express.Router();
const debug = Debug('app');

const url = 'mongodb+srv://kriisid:6UNt3yQEzYVIZXHM@kriisidcluster.elkybmy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = client.db('votingSystem');
const people = dbName.collection('people');

// * Reach stuff about VOTE 1
const vote1Q = { "voting.vote1.valid": true };
const vote1P = { _id: 0, nick: 1, "voting.vote1.count": 1 };
const vote1S = { "voting.vote1.count": -1 };

const vote1sum = await people.aggregate([{$group: { _id: null, sumVote1:{$sum:"$voting.vote1.count"}}}]).toArray();
console.log(vote1sum);

// * Reach stuff about VOTE 2
const vote2Q = { "voting.vote2.valid": true };
const vote2P = { _id: 0, nick: 1, "voting.vote2.count": 1 };
const vote2S = { "voting.vote2.count": -1 };

const vote2sum = await people.aggregate([{$group: { _id: null, sumVote2:{$sum:"$voting.vote2.count"}}}]).toArray();

// * Reach stuff about VOTE 3
const vote3Q = { "voting.vote3.valid": true };
const vote3P = { _id: 0, nick: 1, "voting.vote3.count": 1 };
const vote3S = { "voting.vote3.count": -1 };

const vote3sum = await people.aggregate([{$group: { _id: null, sumVote3:{$sum:"$voting.vote3.count"}}}]).toArray();

// * Reach stuff about VOTE 4
const vote4Q = { "voting.vote4.valid": true };
const vote4P = { _id: 0, nick: 1, "voting.vote4.count": 1 };
const vote4S = { "voting.vote4.count": -1 };

const vote4sum = await people.aggregate([{$group: { _id: null, sumVote4:{$sum:"$voting.vote4.count"}}}]).toArray();

const pages = dbName.collection('pages');

votingRouter.route('/').get((req, res) => {
  res.render('voting');
});

votingRouter.route('/vote1').get((req, res) => {
  (async function mongo(){
    try {
      const votesQ = await people.find(vote1Q).project(vote1P).toArray();
      const currentVote = 'vote1';
      res.render('vote1', { votesQ, currentVote });
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote1Confirm').get((req, res) => {
  const { vote1 } = req.query;
  debug(vote1);
  (async function mongo(){
    try {
      const query = { nick: vote1 };
      const update = { $inc: {"voting.vote1.count": 1} };
      people.updateOne(query, update);
      const votesQ = await people.find(vote1Q).project(vote1P).toArray();
      const currentVote = 'vote1';
      res.render('voting', {votesQ, currentVote});
      debug(votesQ);
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
      const voteCount = await people.find(vote1Q).project(vote1P).sort(vote1S).toArray();
      const vote1sum = await people.aggregate([{$group: { _id: '00', sumVote1:{$sum:"$voting.vote1.count"}}}]).toArray();
      const addedSum = voteCount.concat(vote1sum);
      res.status(200).json(addedSum);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote2').get((req, res) => {
  (async function mongo(){
    try {
      const votesQ = await people.find(vote2Q).project(vote2P).toArray();
      const currentVote = 'vote2';
      res.render('vote2', { votesQ, currentVote });
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote2Confirm').get((req, res) => {
  const { vote2 } = req.query;
  debug(vote2);
  (async function mongo(){
    try {
      const query = { nick: vote2 };
      const update = { $inc: {"voting.vote2.count": 1} };
      people.updateOne(query, update);
      const votesQ = await people.find(vote2Q).project(vote2P).toArray();
      const currentVote = 'vote2';
      res.render('voting', {votesQ, currentVote});
      debug(votesQ);
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
      const voteCount = await people.find(vote2Q).project(vote2P).sort(vote2S).toArray();
      const vote2sum = await people.aggregate([{$group: { _id: '00', sumVote2:{$sum:"$voting.vote2.count"}}}]).toArray();
      const addedSum = voteCount.concat(vote2sum);
      res.status(200).json(addedSum);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote3').get((req, res) => {
  (async function mongo(){
    try {
      const votesQ = await people.find(vote3Q).project(vote3P).toArray();
      const currentVote = 'vote3';
      res.render('vote3', { votesQ, currentVote });
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote3Confirm').get((req, res) => {
  const { vote3 } = req.query;
  debug(vote3);
  (async function mongo(){
    try {
      const query = { nick: vote3 };
      const update = { $inc: {"voting.vote3.count": 1} };
      people.updateOne(query, update);
      const votesQ = await people.find(vote3Q).project(vote3P).toArray();
      const currentVote = 'vote3';
      res.render('voting', {votesQ, currentVote});
      debug(votesQ);
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
      const voteCount = await people.find(vote3Q).project(vote3P).sort(vote3S).toArray();
      const vote1sum = await people.aggregate([{$group: { _id: '00', sumVote3:{$sum:"$voting.vote3.count"}}}]).toArray();
      const addedSum = voteCount.concat(vote3sum);
      res.status(200).json(addedSum);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote4').get((req, res) => {
  (async function mongo(){
    try {
      const votesQ = await people.find(vote4Q).project(vote4P).toArray();
      const currentVote = 'vote4';
      res.render('vote4', { votesQ, currentVote });
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote4Confirm').get((req, res) => {
  const { vote4 } = req.query;
  debug(vote4);
  (async function mongo(){
    try {
      const query = { nick: vote4 };
      const update = { $inc: {"voting.vote4.count": 1} };
      people.updateOne(query, update);
      const votesQ = await people.find(vote4Q).project(vote4P).toArray();
      const currentVote = 'vote4';
      res.render('voting', {votesQ, currentVote});
      debug(votesQ);
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
      const voteCount = await people.find(vote4Q).project(vote4P).sort(vote4S).toArray();
      const vote4sum = await people.aggregate([{$group: { _id: '00', sumVote4:{$sum:"$voting.vote4.count"}}}]).toArray();
      const addedSum = voteCount.concat(vote4sum);
      res.status(200).json(addedSum);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

export default votingRouter;