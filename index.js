'use strict'

const Hapi = require('Hapi')
const uuid = require('node-uuid')

//create server and connetion

const server = new Hapi.Server()

server.connection({
  port: 3000
})

const bookmarks = [{
    "_id": "534de420-2d86-11e6-b18e-4b692101e6d2",
    "title": "CNN",
    "url": "http://cnn.com/",
    "created": new Date(),
    "creator": "0a44ce1a-2cb9-11e6-b67b-9e71128cae77",
    "upvoters": [

    ]
}, {
    "_id": "86ed6030-2d86-11e6-b18e-4b692101e6d2",
    "title": "Huffington Post",
    "url": "http://www.huffingtonpost.com",
    "created": new Date(),
    "creator": "0a44ce1a-2cb9-11e6-b67b-9e71128cae77",
    "upvoters": [

    ]
}];

//creat route

server.route({
  method: 'GET',
  path: '/bookmarks',
  handler: (request, reply)=>{

    return reply(bookmarks)
  }
})

server.route({
  method: 'GET',
  path: '/bookmarks/{id}',
  handler: (request, reply)=>{
    return reply(bookmarks[0])
  }
})

server.route({
  method: 'POST',
  path: '/bookmarks',
  handler: (request, reply)=>{
    console.log(request)

    const bookmark = request.payload
    bookmark._id = uuid.v1()
    bookmark.created = new Date()

    bookmarks.push(bookmark)

    return reply(bookmark).code(201)
  }
})

server.route({
  method: 'PATCH',
  path: '/bookmarks/{id}',
  handler: (request, reply)=>{
    
    return reply().code(204)
  }
})

server.route({
  method: 'DELETE',
  path: '/bookmarks/{id}',
  handler: (request, reply)=>{
    
    return reply().code(204)
  }
})

server.route({
  method: 'POST',
  path: '/bookmarks/{id}/upvote',
  handler: (request, reply)=>{
    
    return reply().code(204)
  }
})

//register plugin

server.register({
  register: require('good'),
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          response: '*'
        }]
      },{
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err)=>{
  server.start(err=>{
    if(err){
      throw err
    }
    console.log(`server is running at ${server.info.uri}`)
  })
})
