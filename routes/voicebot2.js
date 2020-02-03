/**
 * Module dependencies.
 */

var jwt = require('jsonwebtoken');
var atob = require('atob');
var Cryptr = require('cryptr'),
cryptr = new Cryptr('myTotalySecretKey');


//---------------------------------------Pertanyaan---------------------------------------------------------

exports.tanya=function(req , res){
    var question  = req.body.Question;
    var npm= req.body.NPM;
    var status= 0;
	
    var keyword1 = "SELECT * FROM t_setkey WHERE MATCH (keyword) AGAINST ('"+question+"');";

   var input = db2.query(keyword1, function(err, results){

     // var k1 =  console.log( results.kalimat);
	  
	  if (results != ""){
	  
			var keyword2 = "SELECT kalimat FROM t_tanya WHERE MATCH (kalimat) AGAINST ('"+question+"');";
			var input2 = db2.query(keyword2, function(err, results){
			//var k2 =  console.log( results.length);
			if (results != "" ){
			
					
				var keyword3 = "SELECT keterangan FROM t_pendukung WHERE MATCH (keterangan) AGAINST ('"+question+"');";
				var input3 = db2.query(keyword3, function(err, results){
				if(results != "" ){
				
				
				 var sql = "SELECT a.kode_info,a.informasi,a.label,b.keyword FROM (SELECT kode_info,informasi,label FROM t_info2) as a INNER JOIN (SELECT kode_info,keyword FROM t_setkey WHERE MATCH (keyword) AGAINST ('" + question + "')) as b ON a.kode_info = b.kode_info ORDER BY a.kode_info ASC";

          db2.query(sql, function(err, results){
        if(results != ""){

		//db.query("UPDATE `t_pesan` SET `status` = '1' ORDER BY `t_pesan`.`id` DESC LIMIT 1");
		
            res.header();
            res.json({
                "results":
                    {"status": true,
                        "data" : results,
                        "msg" : "Berhasil Memuat"
                    }
            });
            res.end();
        }
        else if(results == ""){
            res.json({
                "results":
                    {"status": false, "msg" : 'Maaf Data Tidak Di Temukan'}
            });
            res.end();
        }
				
				
				});
				}else{
				 res.json({
                "results":
                    {"status": false, "msg" : 'gagal 3'}
            });
            res.end();
				
				}
			});
			
			}else{
			 res.json({
                "results":
                    {"status": false, "msg" : 'gagal 2'}
            });
            res.end();
			}
			
			
			});
	  
	  
	  }else {
	  res.json({
                "results":
                    {"status": false, "msg" : 'gagal 1'}
            });
            res.end();
	  }
	   
	   
	   
	   
    });
		

};