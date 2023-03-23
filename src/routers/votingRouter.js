import express from 'express';
import Debug from 'debug';
import { MongoClient } from 'mongodb';

const votingRouter = express.Router();
const debug = Debug('app');

// ! MONGODB database stuff

// * connecting to the database
const url = process.env.ATLAS_URI;
const client = new MongoClient(url);
const dbName = client.db('votingSystem');
const people = dbName.collection('people');

// * Reach stuff about VOTE 1
const vote1Q = { "voting.vote1.valid": true };
const vote1P = { _id: 0, nick: 1, "voting.vote1.count": 1 };
// * Reach stuff about VOTE 2
const vote2Q = { "voting.vote2.valid": true };
const vote2P = { _id: 0, nick: 1, name: 1, "voting.vote2.count": 1 };
// * Reach stuff about VOTE 3
const vote3Q = { "voting.vote3.valid": true };
const vote3P = { _id: 0, nick: 1, "voting.vote3.count": 1 };
// * Reach stuff about VOTE 4
const vote4Q = { "voting.vote4.valid": true };
const vote4P = { _id: 0, nick: 1, "voting.vote4.count": 1 };

const pages = dbName.collection('pages');

votingRouter.route('/').get((req, res) => {
  res.render('voting');
});

votingRouter.route('/vote1').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote1';
      const votesC = await people.find(vote1Q).project(vote1P).toArray();
      const vote1sum = await people.aggregate([{$group: { _id: null, sumVote1:{$sum:"$voting.vote1.count"}}}]).toArray();
      const votesQ = votesC.concat(vote1sum);
      const votesString = JSON.stringify(votesQ);
      const Active = await pages.find({"pageName": 'vote1'}, {_id: 0, pageName: 1, disabled: 1}).toArray();
      res.render('vote', { votesQ, votesString, currentVote, Active });
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote1Confirm').get((req, res) => {
  const { vote1 } = req.query;
  (async function mongo(){
    try {
      const query = {nick:vote1};
      const update = {$inc:{"voting.vote1.count":1}};
      people.updateOne(query, update);
      res.redirect('/voting');
    } catch (error) {
      debug(error.stack);
    }
    const voteCount = await people.find({nick:vote1}, { _id: 0, voting: { vote1: { count: 1}}}).toArray();
    console.log('Vote 1:', voteCount[0].nick, voteCount[0].voting.vote1.count);
  }())
});

votingRouter.route('/vote2').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote2';
      const votesC = await people.find(vote2Q).project(vote2P).toArray();
      const vote2sum = await people.aggregate([{$group: { _id: null, sumVote2:{$sum:"$voting.vote2.count"}}}]).toArray();
      const votesQ = votesC.concat(vote2sum);
      const votesString = JSON.stringify(votesQ);
      const Active = await pages.find({"pageName": 'vote2'}, {_id: 0, pageName: 1, disabled: 1}).toArray();
      res.render('vote', { votesQ, votesString, currentVote, Active });
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote2Confirm').get((req, res) => {
  const { vote2 } = req.query;
  (async function mongo(){
    try {
      const query = { nick: vote2 };
      const update = { $inc: {"voting.vote2.count": 1} };
      people.updateOne(query, update);
      res.redirect('/voting');
    } catch (error) {
      debug(error.stack);
    }
    const voteCount = await people.find({nick:vote2}, { _id: 0, voting: { vote2: { count: 1}}}).toArray();
    console.log('Vote 2:', voteCount[0].nick, voteCount[0].voting.vote2.count);
  }())
});

votingRouter.route('/vote3').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote3';
      const votesC = await people.find(vote3Q).project(vote3P).toArray();
      const vote3sum = await people.aggregate([{$group: { _id: null, sumVote3:{$sum:"$voting.vote3.count"}}}]).toArray();
      const votesQ = votesC.concat(vote3sum);
      const votesString = JSON.stringify(votesQ);
      const Active = await pages.find({"pageName": 'vote3'}, {_id: 0, pageName: 1, disabled: 1}).toArray();
      res.render('vote', { votesQ, votesString, currentVote, Active });
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote3Confirm').get((req, res) => {
  const { vote3 } = req.query;
  (async function mongo(){
    try {
      const query = { nick: vote3 };
      const update = { $inc: {"voting.vote3.count": 1} };
      people.updateOne(query, update);
      res.redirect('/voting');
    } catch (error) {
      debug(error.stack);
    }
    const voteCount = await people.find({nick:vote3}, { _id: 0, voting: { vote3: { count: 1}}}).toArray();
    console.log('Vote 3:', voteCount[0].nick, voteCount[0].voting.vote3.count);
  }())
});

votingRouter.route('/vote4').get((req, res) => {
  (async function mongo(){
    try {
      const currentVote = 'vote4';
      const votesC = await people.find(vote4Q).project(vote4P).toArray();
      const vote4sum = await people.aggregate([{$group: { _id: null, sumVote4:{$sum:"$voting.vote4.count"}}}]).toArray();
      const votesQ = votesC.concat(vote4sum);
      const votesString = JSON.stringify(votesQ);
      const Active = await pages.find({"pageName": 'vote4'}, {_id: 0, pageName: 1, disabled: 1}).toArray();
      res.render('vote', { votesQ, votesString, currentVote, Active });
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote4Confirm').get((req, res) => {
  const { vote4 } = req.query;
  (async function mongo(){
    try {
      const query = { nick: vote4 };
      const update = { $inc: {"voting.vote4.count": 1} };
      people.updateOne(query, update);
      res.redirect('/voting');
    } catch (error) {
      debug(error.stack);
    }
    const voteCount = await people.find({nick:vote4}, { _id: 0, voting: { vote4: { count: 1}}}).toArray();
    console.log('Vote 4:', voteCount[0].nick, voteCount[0].voting.vote4.count);
  }())
});

export default votingRouter;