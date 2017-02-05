'use strict'

const Joi = require('joi')
const Boom = require('boom')
const Bcrypt = require('bcrypt')

exports.register = function(server, options, next){

  const db = server.plugins['db'].db
  
  server.route({
    method: 'POST',
    path: '/login',
    handler: function(request, reply){
      db.users.findOne({username: request.payload.username}, (err, user)=>{
        if (err){
          throw err 
        }

        if (!user){
          return reply(Boom.unauthorized())
        }
      

      Bcrypt.compare(request.payload.password, user.password, (err, result)=>{
        if (err){
          throw err
        }

        if (!result){
          return reply(Boom.unauthorized())
        }
      })
        
        return reply({
          token: user.token,
          username: user.username
        })
      })
    }, 
    config: {
      validate: {
        payload: {
          username: Joi.string().min(1).max(50).required(),
          password: Joi.string().min(1).max(50).required() 
        }
      }
    }
  })

  next()
}

exports.register.attributes = {
  name: 'routes-auth',
  dependencies: ['db']
}