

//---------------------------------------kata Kotor---------------------------------------------------------
exports.katakotor=function(req , res){
    

    var sql = "SELECT kata FROM `t_kata`";

    db.query(sql, function(err, results){

        if (results != "") {
            res.json({
                "results":
                    {"status": true,
                    "kata" : results,
                     "msg" : "Berhasil memuat data"}
            });
            res.end();
        }else if(results == ""){
           
                   
                    res.json({
                        "results":
                            {"status": false, "msg" : 'Maaf data tidak ditemukan'}
                    });
                    res.end();
                }
            });
    
};



//---------------------------------------kata ganti---------------------------------------------------------
exports.kataganti=function(req , res){
    

    var sql = "SELECT kata_ganti FROM `t_kata`";

    db.query(sql, function(err, results){

        if (results != "") {
            res.json({
                "results":
                    {"status": true,
                    "kata" : results,
                     "msg" : "Berhasil memuat data"}
            });
            res.end();
        }else if(results == ""){
           
                   
                    res.json({
                        "results":
                            {"status": false, "msg" : 'Maaf data tidak ditemukan'}
                    });
                    res.end();
                }
            });
    
};
