'use strict'

const Hapi = require('Hapi')
// const uuid = require('node-uuid')

//create server and connection
const server = new Hapi.Server()

server.connection({
  port: 3000
})

//register plugin
server.register([{
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
}, {
  register: require('hapi-auth-bearer-token')
}, {
  register: require('./plugins/db')
},{
  register: require('./plugins/auth')
},{
  register: require('./routes/bookmarks')
},{
  register: require('./routes/auth')
}], (err)=>{
  server.start(err=>{
    if(err){
      throw err
    }
    console.log(`server is running at ${server.info.uri}`)
  })
})
