var express = require("express");
var app = express();



var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


const program = require('commander');
// var query = require('./query');

'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode query
 */

// cau hinh ejs
app.set("view engine","ejs");
app.set("views","./views");



'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode query
 */
var defaultConfig = require("./config");
var path = require('path');



var store_path = path.join(__dirname, 'hfc-key-store');
const config = Object.assign({}, defaultConfig, {
    channelName:"mychannel" ,
    user: "user1",
    storePath: store_path
    
});

console.log("Config:", config);

var controller = require("./controller")(config);

const request = {
    //targets : --- letting this default to the peers assigned to the channel
    chaincodeId: "aaa1",
    fcn: "getUserByID",
    args:  ['3012']
};

// each method require different certificate of user
app.get("/home", function(req, res){
    controller
        .query("user1", request)
        .then(ret => {
            
            console.log( "Query results 23131: ",JSON.parse(ret.toString())[0]);
            
            hung1 = JSON.parse(ret.toString())[0];

            console.log("colour hung", hung1.Record.colour);
            res.render("home", {hung: hung1});

        })
        .catch(err => {
            console.error(err);
        });
});
app.listen(4200);