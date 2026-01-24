const mongoose= require('mongoose');
const {Schema}=mongoose;

const problemSchema=new Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    difficultyLevel:{
        type:String,
        enum:["Easy","Medium","Hard"],
        required:true,
    },
    tags:{
        type:String,
        required:true,
    },
    visibleTestCases:[{
        input:{
            type:String,
            required:true,
        },
        output:{
            type:String,
            required:true,
        },
        explaination:{
            type:String,
            required:true, 
        }
    }],
    invisibleTestCases:[{
        input:{
            type:String,
            required:true,
        },
        output:{
            type:String,
            required:true,
        },
    }],
    sartCode:[{
        language:{
            type:String,
            required:true,
        },
        intitialCode:{
            type:String,
            required:true,
        },
    }],

    problemCreator:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
})

const Problem=mongoose.model("problem",problemSchema);
module.exports=Problem;