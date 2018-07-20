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
app.set("view engine", "ejs");
app.set("views", "./views");



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
    channelName: "mychannel",
    user: "user1",
    storePath: store_path

});

console.log("Config:", config);

var controller = require("./controller")(config);

var request = {
    //targets : --- letting this default to the peers assigned to the channel
    chaincodeId: "aaa1",
    fcn: "getUserByID",
    args: ['3012']
};

// each method require different certificate of user
app.get("/home", function (req, res) {
    var hung1;
    var id = req.query.userid;
    var lop = req.query.class;
    console.log("lop: ", lop);
    console.log("id: ", id);

    if (typeof id !== "undefined") {

        request.chaincodeId = "aaa1";
        request.fcn = "getUserByID";
        request.args[0] = id;
        console.log(request);
        controller
            .query("user1", request)
            .then(ret => {
                // console.log( "Query results 23131: ",JSON.parse(ret.toString())[0]);

                checkobj = JSON.parse(ret.toString())[0];
                if (typeof checkobj !== "undefined") {
                    hung1 = checkobj.Record;
                    console.log("hung1: ", hung1);
                    
                    if (typeof lop !== "undefined") {
                        request.chaincodeId = "aaa2";
                        request.fcn = "getProfileByID";
                        request.args[0] = id;

                        console.log(request);

                        controller
                            .query("user1", request)
                            .then(ret => {
                                // console.log( "Query results 23131: ",JSON.parse(ret.toString())[0]);

                                userclass = JSON.parse(ret.toString())[0].Record;
                                console.log("userclass= ", userclass);
                                if (lop == "10") {
                                    classid = userclass.class_10;
                                    console.log("Lop 10: ", classid);
                                } else if (lop == "11") {
                                    classid = userclass.class_11;
                                    console.log("Lop 11: ", classid);
                                } else if (lop == "12") {
                                    classid = userclass.class_12;
                                    console.log("Lop 12: ", classid);
                                }
                                console.log("hung: ", hung1);
                                res.render("home", { classid,hung: hung1 });

                            })
                            .catch(err => {
                                console.error(err);
                            });
                    } else {
                        res.render("home", { hung: hung1 });
                    }
                } else {
                    console.log("Loi khong tim thay");
                    res.render("404_notfound")
                }
            })
            .catch(err => {
                console.error(err);
            });


    }
    else {
        res.render("home", { hung: [] });
    }
});

app.get("/create", function(req, res){
    res.render("create");
});


app.listen(4200);