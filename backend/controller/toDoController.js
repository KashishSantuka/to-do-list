const toDoModel = require('../models/toDoModel')

module.exports.getToDo = async (req, res) => {
    const toDo = await toDoModel.find()
    res.send(toDo)
} 

module.exports.saveToDo = async (req, res) => {
    const {text} = req.body

    toDoModel
    .create({
        text:text
    })
    .then((data) => {
        res.send(data);
    })
}

 module.exports.updateToDo = async (req, res) => {
    const {_id, text} = req.body
    toDoModel
    .findByIdAndUpdate(_id, {text})
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
 }

 module.exports.deleteToDo = async (req,res) => {
    const {_id} = req.body
    
    toDoModel
    .findByIdAndDelete(_id)
    .then((data) => {
        res.send(data)
    })
    .catch((err) => console.log(err))
 }



