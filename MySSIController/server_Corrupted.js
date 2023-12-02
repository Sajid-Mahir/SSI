const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const twoFactor = require('./model/twoFactor')
const twoFactorData = require('./model/twoFactorData')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const qr = require("qrcode");
const session = require('express-session')
const axios = require('axios');
var qs = require('querystring');
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars');
const helpers = require('handlebars-helpers');
var nodemailer = require('nodemailer');


global.connectionStatus = null;
global.credDef = null;
global.credStatus = null;
global.proofStatus = null;
global.retrievedAttribute = null;


const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


mongoose.connect('mongodb://127.0.0.1:27017/login-app-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const app = express()

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultView: 'default',
	layoutsDir: path.join(__dirname, '/views/layouts/'),
	partialsDir: [
	  path.join(__dirname, '/views/partials'),
	  path.join(__dirname, '/views/partials/connection'),
	  path.join(__dirname, '/views/partials/home'),
	  path.join(__dirname, '/views/partials/proof'),
	],
	helpers: helpers(['array', 'comparison'])
  }));

  app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

var transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
	  user: "bf956c5376f337",
	  pass: "6762a66e3868ba"
	}
  });

// Simple routing to the index.ejs file
app.get("/", (req, res) => {
	var body = '';

	req.on('data', function (data) {
		body += data;

		// Too much POST data, kill the connection!
		// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
		if (body.length > 1e6)
			req.connection.destroy();
	});

	req.on('end', function () {
		var post = qs.parse(body);
		// use post['blah'], etc.
	});
	// console.log("At Root:", req)
    res.render("index");
});

app.get("/ssi", (req, res) => {
	
	req.session.reqPage = "Page1"
	
	if(req.cookies.conID === undefined ){
		res.render("ssi")
		
	} else {
		
		const conID = req.cookies.conID;
		console.log("Connection ID found from cookies:",conID)
		req.session.conID = conID
		res.render("proof");
	}
});

app.post("/", (req, res) => {
	// var body = '';

	// req.on('data', function (data) {
	// 	body += data;

	// 	// Too much POST data, kill the connection!
	// 	// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
	// 	if (body.length > 1e6)
	// 		req.connection.destroy();
	// });

	// req.on('end', function () {
	// 	var post = qs.parse(body);
	// 	// use post['blah'], etc.
	// });
	// console.log("At Root:", req)
    //res.render("index");
});

app.get("/webhooks/*", (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Hello World\n');
	console.log("At Webhooks GET:")
    //res.render("index");
});

app.get("/setSession", (req, res) => {
	req.session.test = "Testing.."
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Hello World\n');
    //res.render("index");
});

app.get("/getSession", (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Session Value:' + req.session.test);
    //res.render("index");
});

app.get("/status", (req, res) => {
	if (connectionStatus !== null){
		// console.log("At status:",connectionStatus)
	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
	if (connectionStatus === null){
		res.end("Nothing..");
	}
  		
	else
	{
		req.session.conID = connectionStatus
		res.end(connectionStatus);
	}
		
	//console.log("At Webhooks GET:")
    //res.render("index");
});

app.get("/credStatus", (req, res) => {
	console.log("At Cred status:");
	res.writeHead(200, {'Content-Type': 'text/plain'});
	
	
	if (credStatus === null){
		// console.log("At Cred status:",credStatus);
		res.end("Nothing..");
	}
  		
	else {
		console.log("Credential acked:"+credStatus)
		res.end(""+credStatus);
	}
		
});

app.get("/proofStatus", (req, res) => {
	console.log("At Cred status:");
	res.writeHead(200, {'Content-Type': 'text/plain'});
	
	
	if (proofStatus === null){
		// console.log("At Cred status:",credStatus);
		res.end("Nothing..");
	}
  		
	else {
		req.session.verified = true
		req.session.retrievedAttribute = retrievedAttribute
		console.log("Credential verified:"+proofStatus)
		res.end(""+proofStatus);
	}
		
});

app.get("/reqPage", (req, res) => {
	console.log("At Requested Page:");
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(""+req.session.reqPage);
});

app.get("/connected", (req, res) => {
    res.render("connected");
});

// Gets executed when you scan the QR code with phone.
app.post("/webhooks/*", (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Hello World\n');
	console.log("At Webhooks POST:", req.body)
	const conID = req.body['connection_id']
	const conStatus = req.body['rfc23_state']
	if(conID){
			console.log("Invitation Completed with conID:" + conID)
			connectionStatus= conID
			// req.session.conID = conID
		}
		if(req.body['state'] === 'credential_acked'){
			console.log("Credential acked...")
			credStatus = true
			// req.session.credStatus = true
		}
		if(req.body['verified'] === 'true'){
			// console.log("Credential verified..:", req.body)
			var base64data = JSON.stringify(req.body['presentation_request_dict']['request_presentations~attach'][0]['data']['base64'])
			// console.log("At Webhooks POST:", JSON.stringify(req.body['presentation_request_dict']['request_presentations~attach'][0]['data']['base64']))
			const decodedString = Buffer.from(base64data, "base64");
			const jsonData = JSON.parse(decodedString.toString());
			// console.log("Retrieved attributes:", jsonData['requested_attributes']['0_role']['value'])
			proofStatus = true
			retrievedAttribute = jsonData['requested_attributes']['0_role']['value']
			// req.session.credStatus = true
		}
	
    //res.render("index");
});

app.use('/', express.static(path.join(__dirname, 'static')))

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//app.set('views', path.join(__dirname, '../view'))
// app.set('view engine','ejs');

app.get("/", (req, res) => {
    res.render("index")
});


// app.get('/test', function(req,res) {
// 	// Your code here
// 	console.log("At test...")
// 	const d = {
// 		"credential_definition_ids": [
// 		  "FXd9ZjZrzGQbn2Gt2EyRLw:3:CL:114538:faber.agent.degree_schema"
// 		]
// 	  }
// 	const stat = "fc7b0a16-2bf8-4b1e-981c-57511c332f67"
// 	const defID = d["credential_definition_ids"][0]
// 	const data = {
// 		"auto_issue": true,
// 		"auto_remove": true,
// 		"connection_id":stat,
// 		"cred_def_id":defID,
// 		"comment":"Offer on cred def id " + defID,
// 		"credential_preview":{
// 			"@type":"https://didcomm.org/issue-credential/1.0/credential-preview",
// 			"attributes":[
// 				{
// 					"name":"name",
// 					"value":"Alice Smith"
// 				},
// 				{
// 					"name":"date",
// 					"value":"2018-05-28"
// 				},
// 				{
// 					"name":"degree",
// 					"value":"Maths"
// 				},
// 				{
// 					"name":"birthdate_dateint",
// 					"value":"19980204"
// 				},
// 				{
// 					"name":"timestamp",
// 					"value": ""+Date.now()
// 				}
// 			]
// 		}
// 	};
// 	res.setHeader('Content-Type', 'application/json');
//     res.json(data);
// 	console.log("At test!")
//   });
  
  function testCode( req, res, next )
  {
      var src = "Hello!" 
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        res.render("test", { src });
  }//checkUserSession()

app.get('/newCon', async function(req,res) {
	console.log("At newConn!")
	const data = {
		"my_label": "Web.Agent",
		// "service_endpoint": "https://25d8-2a02-908-e37-bfa0-ea1a-9e5-28c6-cfcd.ngrok.io"
	};
	const agentService = require('./services/AgentService');

    const invitation = await agentService.createInvitation(data);
	const id = invitation['connection_id']
	console.log('Returned id:', id)
    if (invitation) {
        // invitation.invitation = JSON.stringify(invitation.invitation, null, 4);
		const inviteURL = JSON.stringify(invitation['invitation_url'], null, 4);
		// console.log('Body: ', inviteURL)
		qr.toDataURL(inviteURL, (err, src) => {
			//if (err) res.send("Error occured");
			res.render("invitation", { src, id });
		});
    }
});

app.post('/newCon', async function(req,res) {
	
	const memoName = req.body.memoNameData
	const email = req.body.emailData
	console.log("POST /newCon memoName:", memoName, " and email:", email)
	const data = {
		"my_label": memoName,
		// "service_endpoint": "https://25d8-2a02-908-e37-bfa0-ea1a-9e5-28c6-cfcd.ngrok.io"
	};

	axios.post('http://127.0.0.1:8021/connections/create-invitation?alias='+memoName,data)
			.then((resp) => {
				//console.log('Invitation Body: ', resp.data)
				const id = resp.data['connection_id']
				console.log('resp:\n', resp.data);
				if (resp) {
					const connectionID = id
					try {
						const response = twoFactor.create({
							email,
							memoName,
							connectionID
						})
					} catch (error) {
						if (error.code === 11000) {
							// duplicate key
							return res.json({ status: 'error', error: 'Username already in use' })
						}
						throw error
					}
					const inviteURL = JSON.stringify(resp.data['invitation_url'], null, 4);
					qr.toDataURL(inviteURL, (err, src) => {
						//if (err) res.send("Error occured");
						res.render("invitation", { src, id });
					});
				}
			}).catch((err) => {
				console.error(err);
			});
	// const agentService = require('./services/AgentService');

    // const invitation = await agentService.createInvitation(memoName);
	// const id = invitation['connection_id']
	// console.log('Returned id:', id)
    // if (invitation) {
    //     // invitation.invitation = JSON.stringify(invitation.invitation, null, 4);
	// 	const inviteURL = JSON.stringify(invitation['invitation_url'], null, 4);
	// 	console.log('Inviting URL: ', inviteURL)
	// 	qr.toDataURL(inviteURL, (err, src) => {
	// 		//if (err) res.send("Error occured");
	// 		res.render("invitation", { src, id });
	// 	});
    // }
});

app.post('/credential', async function(req,res) {
	console.log("POST /credential")
	
	const name = req.body.name
	const email = req.body.email
	const address = req.body.address
	const dob = req.body.dob
	const [day, month, year] = dob.split('/');
	const date = new Date(+year, month - 1, +day);

	// basically gets credential-definition from the ledger
	axios.get('http://127.0.0.1:8021/credential-definitions/created')
		.then( async (resp) => {
			const credID = resp.data['credential_definition_ids'][0];
			if(credID){
				req.session.credID = credID
				const data = {
					"auto_issue": true,
					"auto_remove": true,
					// "connection_id": connectionStatus,
					"connection_id":req.session.conID,
					// "cred_def_id":"FXd9ZjZrzGQbn2Gt2EyRLw:3:CL:114538:faber.agent.degree_schema",
					"cred_def_id":credID,
					"comment":"Offer on cred def id " + credID,
					"credential_preview":{
						"@type":"https://didcomm.org/issue-credential/1.0/credential-preview",
						"attributes":[
							{
								"name":"name",
								"value":name
							},
							{
								"name":"email",
								"value":email
							},
							{
								"name":"address",
								"value":address
							},
							{
								"name":"birthdate_dateint",
								"value":dob
							},
							{
								"name":"role",
								"value":"faculty"
							},
							{
								"name":"timestamp",
								"value": ""+Date.now()
							}
						]
					}
				};

				// const jsonData = JSON.stringify(data);
				
				const temp = await axios.post('http://127.0.0.1:8021/issue-credential/send-offer', data);
				console.log("send-offer response:");
				console.log(temp.data);
				console.log("Sending VC offer!");
				res.cookie('conID', req.session.conID, { maxAge: 900000, httpOnly: true });
				res.render("dummy",{connectionStatus});	
				
			}
		}).catch((err) => {
			console.error(err);
		});
	
	// console.log('Generated JSON:', JSON.stringify(data));
	// const agentService = require('./services/AgentService');

    // const response = await agentService.issueCredential();
	// console.log('Returned response:', response)

	
    
});

// Sample credential generates and offers
app.get('/credential', async function(req,res) {
	console.log("GET /credential")
	axios.get('http://127.0.0.1:8021/credential-definitions/created')
		.then((resp) => {
			const credID = resp.data['credential_definition_ids'][0];

			if(credID){
				req.session.credID = credID
				const data = {
					"auto_issue": true,
					"auto_remove": true,
					// "connection_id": connectionStatus,
					"connection_id":req.session.conID,
					// "cred_def_id":"FXd9ZjZrzGQbn2Gt2EyRLw:3:CL:114538:faber.agent.degree_schema",
					"cred_def_id":credID,
					"comment":"Offer on cred def id " + credID,
					"credential_preview":{
						"@type":"https://didcomm.org/issue-credential/1.0/credential-preview",
						"attributes":[
							{
								"name":"name",
								"value":"Will Smith"
							},
							{
								"name":"email",
								"value":"sfr@er.et"
							},
							{
								"name":"address",
								"value":"Ringstraße 43, 53225 Bonn, Germany"
							},
							{
								"name":"birthdate_dateint",
								"value":"19980204"
							},
							{
								"name":"role",
								"value":"faculty"
							},
							{
								"name":"timestamp",
								"value": ""+Date.now()
							}
						]
					}
				};

				// const jsonData = JSON.stringify(data);
				
				axios.post('http://127.0.0.1:8021/issue-credential/send-offer', data)
				console.log("Before creating dummy page...")
				res.cookie('conID', req.session.conID, { maxAge: 900000, httpOnly: true });
				res.render("dummy",{connectionStatus});	
			}
		}).catch((err) => {
			console.error(err);
		});
});

// executes when Request Proof button is clicked
app.get('/proofReq', async function(req,res) {
	console.log("GET /proofReq")
	var role = ""
	if(req.session.reqPage === "Page1"){
		role = "student"
	}
	else if(req.session.reqPage === "Page2"){
		role = "faculty"
	}
	axios.get('http://127.0.0.1:8021/credential-definitions/created')
		.then((resp) => {

			const credID = resp.data['credential_definition_ids'][0];
			// if(req.session.credID || req.cookies.conID)
			if(req.cookies.conID){
				// console.log("Connection ID:", req.cookies.conID) 
				req.cookies.conID
				const data = {
					"connection_id": req.cookies.conID,
					"proof_request": {
						"name": "Proof of Role",
					"version": "1.0",
					"requested_attributes": {
						// "0_name_uuid": {
						// "name": "name",
						// "restrictions": [
						// 	{
						// 	"schema_name": "web schema"
						// 	}
						// ]
						// },
						// "0_email_uuid": {
						// "name": "email",
						// "restrictions": [
						// 	{
						// 	"schema_name": "web schema"
						// 	}
						// ]
						// },
						// "0_address_uuid": {
						// 	"name": "address",
						// 	"restrictions": [
						// 		{
						// 		"schema_name": "web schema"
						// 		}
						// 	]
						// },
						// "0_birthdate_dateint_uuid": {
						// 	"name": "birthdate_dateint",
						// 	"restrictions": [
						// 		{
						// 		"schema_name": "web schema"
						// 		}
						// 	]
						// },
						// "0_role_uuid": {
						// 	"name": "role",
						// 	"restrictions": [
						// 		{
						// 			"schema_name": "web schema",
						// 			"value": "student"
						// 		}
						// 	]
						// }
						"0_role": {
							"name": "role",
							"value": role,
							"restrictions": [
								{
									"schema_name": "web schema"
								}
							]
						}
					},
					"requested_predicates": {
						// "0_role_match": {
						// "name": "role",
						// // "p_type": "<=",
						// // "p_value": 20040207,
						// "value":"student",
						// "restrictions": [
						// 	{
						// 	"schema_name": "web schema"
						// 	}
						// ]
						// }
					}
					}
				};

				
				axios.post('http://127.0.0.1:8021/present-proof/send-request', data)
					.then((resp) => {
						console.log("Before creating dummy proof page...")
						res.render("dummyProof");
					}).catch((err) => {
						// console.error(err);
						console.log("Error at issuing credentials!")
					});
			}
		}).catch((err) => {
			console.error(err);
		});
});

app.post('/checkMemName', function(req,res) {
	const { memoName } = req.body
	console.log("POST /checkMemName with:", memoName)
	var returnData;
	axios.get('http://127.0.0.1:8021/connections')
		.then((resp) => {
			var flag = false;
			var conID;
			resp.data['results'].forEach((element) => {
				if(element.hasOwnProperty('alias')){
					const alias = element['alias']
					if(alias === memoName) {
						flag = true;
						conID = element["connection_id"];
						console.log("Matching found....");
						
					}
				}
			})
			if(flag){
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ status: false,connection:conID }));
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ status: true }));
			}
			
			
		}).catch((err) => {
			console.error(err);
		});
  });

app.post('/twoFactor', function(req,res) {
	
	const { memoName, conID } = req.body

	const connectionID = conID

	console.log("POST /twoFactor with:", conID, " and Memorable Name:", memoName)

	twoFactor.findOne({connectionID: connectionID}, function(err,obj) { 
		
		console.log("From database:",obj); 
		const email = obj.email;
		const memoName = obj.memoName;
		const connectionID = obj.connectionID;
		const status = false;

		var code = Math.floor(1000 + Math.random() * 9000);
		console.log("Random Number:",code);

		try {
			const response = twoFactorData.create({
				email,
				memoName,
				connectionID,
				code, 
				status
			})
			console.log('Code with other data saved successfully!')

			var mailOptions = {
				from: 'ripul.bd@gmail.com',
				to: email,
				subject: 'SSI Code',
				text: "" + code
			  };
			  
			  transport.sendMail(mailOptions, function(error, info){
				if (error) {
				  console.log(error);
				} else {
				  console.log('Email sent: ' + info.response);
				  console.log();
				  
				}
			  });

		} catch (error) {
			if (error.code === 11000) {
				// duplicate key
				return res.json({ status: 'error', error: 'Username already in use' })
			}
			throw error
		}
		res.cookie('conID', conID, { maxAge: 900000, httpOnly: true });
		res.cookie('memoName', memoName, { maxAge: 900000, httpOnly: true });

		req.session.conID = conID
		res.render("twoFactor");
	});

  });

app.post('/twoFactorCheck', function(req,res) {
	// Your code here
	console.log("POST /twoFactorCheck");
	const { codeData } = req.body

	if(req.cookies.conID && req.cookies.memoName){
		const connectionID = req.cookies.conID
		const memoName = req.cookies.memoName

		console.log("At TwoFactorCheck: Connection ID:", connectionID, " and MemoName:", memoName)


		twoFactorData.remove({connectionID: connectionID, memoName: memoName, code: codeData}, (err) => {
			if (!err) {
				res.render("proof");
			}
			
			
		});
	}
  });

app.post('/activeConctd', function(req,res) {
	// Your code here
	
	const { conID } = req.body
	console.log("At activeConctd with:", conID)
	res.cookie('conID', conID, { maxAge: 900000, httpOnly: true });
	
	req.session.conID = conID
	res.render("proof");
  });

  app.post('/checkDID', function(req,res) {
	// Your code here
	
	const { did } = req.body
	console.log("At checkMemName with:", did)
	
	var returnData;
	axios.get('http://127.0.0.1:8021/connections')
		.then((resp) => {
			// console.log(`Status: ${res.status}`);
			var flag = false;
			var conID;
			resp.data['results'].forEach((element) => {
				if(element.hasOwnProperty('their_did')){
					const alias = element['their_did']
					if(alias.includes(did)) {
						flag = true;
						conID = element["connection_id"];
						console.log("Matching found....");
						
					}
				}
				// }
			})
			if(flag){
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ status: false,connection:conID }));
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ status: true }));
			}
			
			// returnData = JSON.stringify(resp.data)
			
		}).catch((err) => {
			console.error(err);
		});
  });

app.post('/checkMemName', function(req,res) {
	// Your code here
	
	const { memoName } = req.body
	console.log("At checkMemName with:", memoName)
	
	var returnData;
	axios.get('http://127.0.0.1:8021/connections')
		.then((resp) => {
			// console.log(`Status: ${res.status}`);
			var flag = false;
			var conID;
			resp.data['results'].forEach((element) => {
				// console.log(element.name);
				// returnData = JSON.parse(resp.data['results']);
				//console.log('Body: ', element);
				// for(i = 0; i < returnData.length; i++){
				if(element.hasOwnProperty('alias')){
					const alias = element['alias']
					if(alias === memoName) {
						flag = true;
						conID = element["connection_id"];
						console.log("Matching found....");
						
					}
				}
				// }
			})
			if(flag){
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ status: false,connection:conID }));
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ status: true }));
			}
			
			// returnData = JSON.stringify(resp.data)
			
		}).catch((err) => {
			console.error(err);
		});
  });


app.get('/generate', function(req,res) {
	// Your code here
	console.log("At rgenerate!")
	const data = {

		"my_label": "Web.Agent",
		// "recipient_keys": [
		//   "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
		// ],
		// "service_endpoint": "https://25d8-2a02-908-e37-bfa0-ea1a-9e5-28c6-cfcd.ngrok.io"
	};
	var returnData;
	axios.post('http://127.0.0.1:8021/connections/create-invitation', data)
		.then((resp) => {
			// console.log(`Status: ${res.status}`);
			// console.log('Body: ', res.data);
			returnData = resp.data['invitation_url'];
			returnData = JSON.stringify(returnData)
			console.log('Body: ', resp.data)
			qr.toDataURL(returnData, (err1, src) => {
				//if (err) res.send("Error occured");

				res.render("invitation", { src });
			});
		}).catch((err) => {
			console.error(err);
		});
  });
 

app.get('/page1', checkUserSession, function(req,res) {
	// Your code here
	console.log("At redirect!")
  });
  
function checkUserSession( req, res, next )
  {
	req.session.reqPage = "Page1"
	  if( req.session.username )
	  {
		// console.log("Session found!")  
		// next();
		
		res.render("page1")
	  } else if (req.session.verified){
		res.render("page1")
	  }
	  else
	  {
		console.log("Session not found!")  
		// res.redirect('/login');
		res.redirect('/ssi');
	}
}

app.get('/page2', checkUserSession2, function(req,res) {
	// Your code here
	console.log("At redirect!")
  });
  
function checkUserSession2( req, res, next )
  {
	req.session.reqPage = "Page2"
	  if( req.session.username )
	  {
		// console.log("Session found!")  
		// next();
		
		res.render("page2")
	  } else if (req.session.verified){
		  console.log("At Page 2:", req.session.retrievedAttribute)
		if(req.session.retrievedAttribute && req.session.retrievedAttribute === 'faculty')
			res.render("page2")
		else res.render("denied")
	  }
	  else
	  {
		console.log("Session not found!")  
		res.redirect('/ssi');
	}
}

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body

	req.session.username = username

	console.log("UserName:" + username + ", Password:" + password)
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)
		console.log("We are here!")

		//return res.json({ status: 'ok', data: token })
		res.render("page1")
	}

	//res.json({ status: 'error', error: 'Invalid username/password' })
})

// render new connection form
app.get('/newConData', (req, res) => {
	res.render("invitationData")
})

app.get('/regData', (req, res) => {
	res.render("regData")
})

app.post('/handleRegData', (req, res) => {
	const name = req.body.name
	const email = req.body.email
	const address = req.body.address
	const dob = req.body.dob

	console.log("raw date:", dob)

	const [day, month, year] = dob.split('/');

	const date = new Date(+year, month - 1, +day);
	console.log("New Date",date); 

	// var dateObject = new Date(dob);

	console.log("At Handle Registration Data:", name, " ,email:", email, " , address:", address, " and dob:", date.getTime() )
	res.end("Handling Registration Data")
})

app.get('/ui', async (req, res) => {
	console.log("Now at register...")
	res.render("ui")
})

app.get('/register', async (req, res) => {
	console.log("Now at register...")
	res.render("register")
})
app.get('/login', async (req, res) => {
	console.log("Now at login...")
	res.render("login")
})

app.get('/issue', async (req, res) => {
	console.log("Now at register...")
	res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: "Credential" }));
})
app.get('/proof', async (req, res) => {
	console.log("Now at proof...")
	res.render("proof");
	// if (connectionStatus === null){
	// 	console.log("Generating Proof QR!")
	// 	const data = {
	// 		// "connection_id": req.session.conID,
	// 		"proof_request": {
	// 			"name": "Proof of Education",
	// 		"version": "1.0",
	// 		"requested_attributes": {
	// 			"0_name_uuid": {
	// 			"name": "name",
	// 			"restrictions": [
	// 				{
	// 				"schema_name": "degree schema"
	// 				}
	// 			]
	// 			},
	// 			"0_date_uuid": {
	// 			"name": "date",
	// 			"restrictions": [
	// 				{
	// 				"schema_name": "degree schema"
	// 				}
	// 			]
	// 			},
	// 			"0_degree_uuid": {
	// 			"name": "degree",
	// 			"restrictions": [
	// 				{
	// 				"schema_name": "degree schema"
	// 				}
	// 			]
	// 			}
	// 		},
	// 		"requested_predicates": {
	// 			"0_birthdate_dateint_GE_uuid": {
	// 			"name": "birthdate_dateint",
	// 			"p_type": "<=",
	// 			"p_value": 20040207,
	// 			"restrictions": [
	// 				{
	// 				"schema_name": "degree schema"
	// 				}
	// 			]
	// 			}
	// 		}
	// 		}
	// 	};
	// 	var returnData;
	// 	axios.post('http://127.0.0.1:8021/present-proof/create-request',data)
	// 		.then((resp) => {
	// 			// console.log('Body: ', resp.data)
	// 			const jData = JSON.stringify(resp.data);
	// 			const base64data = Buffer.from(jData).toString("base64");
	// 			const url = "https://a753-2a02-908-698-80a0-126-e426-5202-5def.ngrok.io?c_i=" + base64data
	// 			console.log('URL: ', url)
	// 			qr.toDataURL(url, (err1, src) => {
	// 				if (err1) console.error('Error occured: ', err1)
	// 				console.log('QR Image: ', src)
	// 				res.render("proofQR", { src });
	// 			});
	// 		}).catch((err) => {
	// 			console.error(err);
	// 		});
	// } else {
	// 	res.render("proof");
	// }
	
})

app.get('/activeCon', async (req, res) => {
	// console.log("Now at active Connection...")
	res.render("activeCon")
})

app.get('/logout', async (req, res) => {
	console.log("Now at logout...")
	req.session.destroy();
	global.connectionStatus = null;
	global.credDef = null;
	global.credStatus = null;
	global.proofStatus = null;
	global.retrievedAttribute = null;
	// res.render("index")
	res.clearCookie("conID")
	res.clearCookie("memoName")
	res.redirect("/");
})

// app.get('/page1', async (req, res) => {
// 	console.log("Now at Page1...")
// 	res.render("page1")
// })

app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})
