// * Reach stuff about VOTE 1
const vote1Q = { "voting.vote1.valid": true };
const vote1P = { _id: 0, nick: 1, "voting.vote1.count": 1 };
const vote1S = { "voting.vote1.count": -1 };

const vote1sum = await people.aggregate([{$group: { _id: null, sumVote1:{$sum:"$voting.vote1.count"}}}]).toArray();

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