//TABLA DE MESSAGE
//SE ESTA ENLAZANDO CON FILE connect
const mongoose=require('../connect');
var Schema = mongoose.Schema;
var messageSchema ={
    senderNickname:String,
    message:String
};
var message = mongoose.model("message", messageSchema);
module.exports = message;
