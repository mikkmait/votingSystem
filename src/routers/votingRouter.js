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

votingRouter.route('/').get((req, res) => {
  res.render('voting');
});

votingRouter.route('/vote1').get((req, res) => {
  (async function mongo(){
    try {
      debug('connected to Mongo');
      
      const query1 = { vote1: true };
      const project1 = { _id: 0, nick: 1, vote1Count: 1 };
      const dancers1 = await dancers.find(query1).project(project1).toArray();
      debug(dancers1);

      res.render('vote1', {dancers1});
    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote1Confirm').get((req, res) => {
  console.log(req.query);
  const { vote1 } = req.query;
  console.log(vote1);
  (async function mongo(){
    try {
      debug('connected to Mongo');

      const query1 = { nick: vote1 };
      const update = { $inc: {vote1Count: 1} };
      dancers.updateOne(query1, update);

      const dancers1 = await dancers.find({ vote1: true }).project({ _id: 0, nick: 1, vote1Count: 1}).toArray();
      res.render('vote1', {dancers1});
      debug(dancers1);

    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote2').get((req, res) => {
  (async function mongo(){
    try {
      debug('connected to Mongo');
      
      const query1 = { valid: true };
      const project1 = { _id: 0, name: 1, votes: 1 };
      const songs1 = await songs.find(query1).project(project1).toArray();
      debug(songs1);

      res.render('vote2', {songs1});
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
      debug('connected to Mongo');
      
      const query1 = { name: vote2 };
      const update = { $inc: {votes: 1} };
      songs.updateOne(query1, update);

      const songs1 = await songs.find({ valid: true }).project({ _id: 0, name: 1, votes: 1 }).toArray();
      res.render('vote2', {songs1});
      debug(songs1);

    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote3').get((req, res) => {
  (async function mongo(){
    try {
      debug('connected to Mongo');
      
      const query1 = { vote2: true };
      const project1 = { _id: 0, nick: 1, vote2Count: 1 };
      const dancers2 = await dancers.find(query1).project(project1).toArray();
      debug(dancers2);

      res.render('vote3', {dancers2});
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
      debug('connected to Mongo');
      
      const query1 = { nick: vote3 };
      const update = { $inc: {vote2Count: 1} };
      dancers.updateOne(query1, update);

      const dancers2 = await dancers.find({ vote2: true }).project({ _id: 0, nick: 1, vote2Count: 1 }).toArray();
      res.render('vote3', {dancers2});
      debug(dancers2);

    } catch (error) {
      debug(error.stack);
    }
  }())
});

votingRouter.route('/vote4').get((req, res) => {
  (async function mongo(){
    try {
      debug('connected to Mongo');
      
      const query1 = { vote3: true };
      const project1 = { _id: 0, nick: 1, vote3Count: 1 };
      const dancers3 = await dancers.find(query1).project(project1).toArray();
      debug(dancers3);

      res.render('vote4', {dancers3});
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
      debug('connected to Mongo');
      
      const query1 = { nick: vote4 };
      const update = { $inc: {vote3Count: 1} };
      dancers.updateOne(query1, update);

      const dancers3 = await dancers.find({ vote3: true }).project({ _id: 0, nick: 1, vote3Count: 1 }).toArray();
      res.render('vote4', {dancers3});
      debug(dancers3);

    } catch (error) {
      debug(error.stack);
    }
  }())
});

export default votingRouter;