var user = require('../model/usermodel');
const bcrypt = require('bcrypt');

exports.register = async (req,res) =>{
    try {
        
       var b_pass =  await bcrypt.hash(req.body.password, 10);
       req.body.password = b_pass;

       var data = await user.create(req.body);

       res.status(200).json({
            status:"success",
            data
       })

    } catch (error) {
        res.status(200).json({
            status:"error",
            error
       })

    }
}

exports.login = async (req,res) =>{
    try {
       var data = await user.find({email:req.body.email});

       if(data.length==1)
       {
            bcrypt.compare(req.body.password,data[0].password, function(err, result) {
                if(result==true)
                {
                    res.status(200).json({
                        status:"login success"
                   })
                }else{
                    res.status(200).json({
                        status:"Check Your Email and password"
                   })
                }
            });
        }else{
            res.status(200).json({
                status:"Check Your Email and password"
           })
        }
    } catch (error) {
        res.status(200).json({
            status:"error",
            error
       })

    }
}