const Todo = require('../models/todo')

/*
200 - Good Response
    200 - OK
    201 - CREATED
    204 - NO CONTENT
300 - Redirection
    301 - REDIRECT
    302 - REDIRECT
400 - Bad Response-Users Fault
    400 - BAD RESPONSE
    401 - UNAUTHORIZED
    403 - FORBIDDEN
    404 - NOT FOUND
500 - Bad Response-Servers Fault 
*/

/*
router.post('/', todoCtrl.create)
router.put('/:id', todoCtrl.update)
router.delete('/:id', todoCtrl.destroy)
router.get('/:id', todoCtrl.show)
*/

exports.index = async function index (req,res) {
    //grab all the tools
try {
   const todos = await Todo.find({})
   res.status(200).json(todos)
} catch (error) {
    res.status(400).json( { msg: error.message } )
    }   
}


exports.create = async function create(req,res) {
    //make a new todo
try {
    const todo = await Todo.create(req.body)
    res.status(200).json(todo)
} catch (error) {
    res.status(400).json( { msg: error.message } ) 
}
}



exports.update = async function update(req,res) {
    //update a todo that was already made
try {
    const updatedTodo = await Todo.
    findOneAndUpdate({ _id: req.params.id }, req.body, { new: true } )
    res.status(200).json(updatedTodo)
} catch (error) {
    res.status(400).json( { msg: error.message } ) 
    }
}

exports.destroy = async function destroy(req,res) {
    //delete/destroy a todo
try {
  const deleted = await Todo.findOneAndDelete({ _id: req.params.id })

  res.status(200).json ({ msg: `The Todo with the id of ${deleted._id} was deleted from the MongoDB database` })


} catch (error) {
    res.status(400).json( { msg: error.message } ) 
}
}


exports.show = async function show(req,res) {
    //show 1 individual todo
try {
    const foundTodo = await Todo.findOne({_id: req.params.id })
    res.status(200).json(foundTodo)
} catch (error) {
    res.status(400).json( { msg: error.message } ) 
}
}
