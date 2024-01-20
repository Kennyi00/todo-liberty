//jest test runner
//supertest special set of methods to specifically test API's

// router.get('/', todoCtrl.index)
// router.post('/', todoCtrl.create)
// router.put('/:id', todoCtrl.update)
// router.delete('/:id', todoCtrl.destroy)
// router.get('/:id', todoCtrl.show)

const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8080', () => console.log('Lets Test'))
const Todo = require('../models/todo')
const Test = require('supertest/lib/test')
let mongoServer

beforeAll(async () => {
mongoServer = await MongoMemoryServer.create()
await mongoose.connect(mongoServer.getUri())
})

afterAll(async() => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Testing Todo Endpoints For RESTFUL JSON API',() => {
test('It should display a list of todos', async () => {
    const todo = new Todo({ title: 'test todo', description: 'todo testing', completed: true })
    await todo.save()

    const response = await request (app).get('/todos')

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    
    for(let i = 0; i < response.body.length; i++){
        expect(response.body[i]).toHaveProperty('title')
        expect(response.body[i]).toHaveProperty('description')
        expect(response.body[i]).toHaveProperty('completed')
        expect(response.body[i]).toHaveProperty('createdAt')
    }
    
    
    })
})