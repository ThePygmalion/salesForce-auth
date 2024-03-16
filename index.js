const express = require('express')
const jsforce = require('jsforce')
require('dotenv').config()
const app = express()
const PORT = 3001


const {SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN} = process.env
const conn = new jsforce.Connection({
	loginUrl: SF_LOGIN_URL
})
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo)=>{
	if(err){
		console.log(err)
	}else{
		console.log('user ID: ' + userInfo.id)
		console.log('org ID: ' + userInfo.organizationId)
	}
})
app.get('/', (req,res)=>{
	conn.query("SELECT Id, Name FROM Account", (err, result)=>{
		if(err){
			console.log(err)
		}else{
			console.log("Total Records: "+result.totalSize)
			res.json(result.records)
		}
	})
	// res.send("salesforce integration with nodejs")
})
app.listen(PORT, ()=>{
	console.log(`server is live at http://localhost:${PORT}`)
})
