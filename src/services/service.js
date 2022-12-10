const shortUrl=require('../model/schema');
const url_shortner={};

url_shortner.shortUrl=async(req,res,next)=>{
    try {
      
        const data=req.body.url;
        console.log(data);
        let status=await shortUrl.create({full:data});
        if(status)
            res.json({'message':'Added'})
        


        
    } catch (error) {
        console.log(error);
    }
};

module.exports=url_shortner;