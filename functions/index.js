'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
  	databaseURL: 'ws://chatbot-rektta.firebaseio.com/'
});
 
const ref1 = admin.database().ref('data').push();

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // function helpHandler(agent) {
  //     agent.add(`Welcome to the Help Menu!
  //                Type 
  //                  ~ 'File a complaint' - For registering a complaint
  //                  ~ 'About' - To know about the application
  //                  ~ 'Contact' - To get the contact details of the local authorities`);
  //     agent.add(new Card({
  //         title: `Title: this is a card title`,
  //         imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
  //         text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //         buttonText: 'This is a button',
  //         buttonUrl: 'https://docs.dialogflow.com/'
  //       })
  //     );
  //     agent.add(new Suggestion(`Quick Reply`));
  //     agent.add(new Suggestion(`Suggestion`));
  //     agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  //   }

	function fileReportHandler(agent){
     const t1 = agent.parameters.prtype;
     const t2 = agent.parameters.name;
     const t3 = agent.parameters.college;
     const t4 = agent.parameters.branch;
     const t5 = agent.parameters.year;
  	 const t6 = agent.parameters.desc;
     const t7 = agent.parameters.when;
  	 const t8 = agent.parameters.where;
  	 const t9 = agent.parameters.who;
     const cdate = new Date().toLocaleString();
     
     
     
     return ref1.set({
       cdate: cdate,
       name: t2,
       college: t3,
       branch: t4,
       year: t5,
       prtype: t1,
       desc: t6,
       when: t7,
       where: t8,
       who: t9
     });
   }

   function aboutHandler(){}

   function contactHandler(){}

   function helpHandler(){}

   
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('FileReport', fileReportHandler);
  intentMap.set('FileReport.about', aboutHandler);
  intentMap.set('FileReport.contact', contactHandler);
  intentMap.set('Help', helpHandler);
  agent.handleRequest(intentMap);
});
