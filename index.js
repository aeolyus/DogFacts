'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.81ca2ea9-36c1-45b8-be8f-5b5dfed992df"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Dog Facts';

/**
 * Array containing dog facts.
 */
var FACTS = [
    "Corgi is Welsh for \"dwarf dog.\"",
    "Dogs have wet noses because it helps to absorb scent chemicals.",
    "Dogs prefer to poo along a north-sourth axis.",
    "A dog's sense of smell is 10,000 times stronger than that of a human's.",
    "Labradors are the most popular breed in the United States.",
    "Dogs can also see blue and yellow.",
    "Bloodhounds are able to trace scens that are over 300 hours old.",
    "Dogs have at least 18 muscles in each ear.",
    "The USA is the country with the highest per dog population, at around 75 million.",
    "Dogs can hear about 4 times the distance of a human.",
    "The Beatles included a whistle that is only audible to dogs in the song \"A Day in the Life.\"",
    "George Lucas modeled the Ewoks from Star Wars after his family dog.",
    "Thomas Jefferson helped enact a dog tax in Virginia, because he was annoyed that dogs were killing his sheep."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random dog fact from the dog facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a dog fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};