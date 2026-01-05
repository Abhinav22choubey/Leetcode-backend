const validator= require("validator");

const validate=(data)=>{
    try{
        const mandatoryfield=["firstName", "emailId","password"];
        const IsAllowed= mandatoryfield.every((k)=>{
            Object.keys(data).includes(k);
        })
        if(!IsAllowed) {
            throw new Error ("Some Credentials are missing ");  
        }
        if(!validator.isEmail(data.emailId)){
            throw new Error ("Email Invalid ");
        }
        if(!validator.isStrongPassword(data.password)){
            throw new Error("Choose a Strong password");
        }
    }
    catch{

    }
}

module.exports=validate;