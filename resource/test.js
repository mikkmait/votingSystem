import people from './schDancer.json' assert { type: 'json' };

console.log(people);

//!First level stuff here
const name = people[0].name;
console.log(name);
console.log('-----');
const nick = people[0].nick;
console.log(nick);
console.log('-----');
const voting = people[0].voting;
console.log(voting);
console.log('-----');
const qa = people[0].qa;
console.log(qa);
console.log('-----');
const result = people[0].result;
console.log(result);
console.log('-----');

// * ONLY OBJECT METHODS
//!Second level stuff here
const vote1 = voting.vote1
console.log(vote1);
console.log('-----');
//!Third level stuff here
const vote1Valid = vote1.valid;
console.log(vote1Valid);
console.log('-----');
const vote1Count = vote1.count;
console.log(vote1Count);
console.log('-----');

// // * OBJECT AND ARRAY COMBINED
// //!Second level stuff here
// const qENG = qa.ENG;
// console.log(qENG);
// console.log('-----');

// function printDialogue(value) {
//   console.log(value);
//   console.log('-----');
// }

// function printQA(value) {
//   console.log('q: ' + value.q);
//   console.log('a: ' + value.a);
//   console.log('-----');
// }

// qENG.forEach(printDialogue);
// qENG.forEach(printQA);