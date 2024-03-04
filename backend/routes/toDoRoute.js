const {Router} = require("express");
const {  getToDo, saveToDo, updateToDo, deleteToDo } = require("../controller/toDoController");

const router = Router()

router.get('/',getToDo)
router.post('/', saveToDo)
router.put('/', updateToDo)
router.delete('/', deleteToDo)

module.exports = router;

