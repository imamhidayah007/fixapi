/**
 * Module dependencies.
 */

var jwt = require('jsonwebtoken');
var atob = require('atob');
var Cryptr = require('cryptr'),
cryptr = new Cryptr('myTotalySecretKey');
var crypto = require('crypto');

//---------------------------------------login services----------------------------------------------------------
exports.masuk=function(req, res){
    var npm=req.body.NPM;
    var password= req.body.PASSWORD;
    var dec_pass = atob(password);
    var encrypted_pass = cryptr.encrypt(dec_pass);
	
	

//var password = 'my Password';
var hash = crypto.createHash('md5').update(password).digest('hex');
console.log(hash);
	
    var sql="SELECT * FROM `groupuser` WHERE `username`='"+npm+"' and password = '"+hash+"'";

    db.query(sql, function(err, results){
        if(results != ""){
            var data = JSON.stringify(results);
            var secret = 'WOI';
            var now = Math.floor(Date.now() / 1000),
                iat = (now - 10),
                expiresIn = 3600,
                expr = (now + expiresIn),
                notBefore = (now - 10),
                jwtId = Math.random().toString(36).substring(7);
            var payload = {
                iat: iat,
                jwtid : jwtId,
                audience : 'TEST',
                data : data
            };

            jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
                if(err){
                    res.json({
                        "results":
                            {
                                "status": false,
                                "msg" : 'Error occurred while generating token'
                            }
                    });
                } else {
                    if(token != false){
                        res.header();
                        res.json({
                            "results":
                                {"status": true,
                                    "token" : token,
                                    "user" : results[0],
                                    "msg" : "Berhasil Login"
                                }
                        });
                        res.end();
                    }
                    else{
                        res.json({
                            "results":
                                {"status": false,"msg" : 'Could not create token'},
                        });
                        res.end();
                    }

                }
            });
        }
        else if(results == ""){
            res.json({
                "results":
                    {"status": false, "msg" : 'Maaf User Tidak Di Temukan',}
            });
            res.end();
        }
    });
};
