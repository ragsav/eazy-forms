const validator = require("validator");

const formCreationValidation = (req,res,next) =>{
    const { form } = req.body;
    const {title,description} = form;
    if(!title){
        return res.status(400).json({success:false,error:{message:"Form title required"}})
    }
    if(!description){
        return res.status(400).json({success:false,error:{message:"Form description required"}})
    }
    if(title.toString().length > 50){
        return res.status(400).json({success:false,error:{message:"Form title can be maximum 50 characters long"}})
    }
    if(description.toString().length > 300){
        return res.status(400).json({success:false,error:{message:"Form description can be maximum 300 characters long"}})
    }
    next();

}
const formUpdationValidation = (req,res,next) =>{
    const { form } = req.body;
    const {title,description} = form;
    if(title&&title.toString().length > 30){
        return res.status(400).json({success:false,error:{message:"Form title can be maximum 30 characters long"}})
    }
    if(description&&description.toString().length > 200){
        return res.status(400).json({success:false,error:{message:"Form description can be maximum 200 characters long"}})
    }
    next();

}

module.exports = {formCreationValidation,formUpdationValidation}