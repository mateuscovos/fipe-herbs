const { apiConfig } = require('../../../config')

const express = require('express')
const cors = require('cors')

var { ApolloServer } = require('apollo-server-express')
var herbsshelf = require('@herbsjs/herbsshelf')

const usecases = require('../../../src/domain/usecases/_uclist')

const [typeDefs, resolvers] = require('./graphql')

class Server {
    
    constructor(app) {
        this.app = app

        this.useCors()
        this.apollo()
        this.herbsshelf()
        this.listen()
    }

    useCors() {
        this.app.use(cors())
    }

    async apollo(){
        const server = new ApolloServer({
            introspection: true,
            playground: true,
            typeDefs,
            resolvers,
            context: () => {}
        })

        await server.start()
        server.applyMiddleware({ app: this.app, path: '/graphql' })
    }

    herbsshelf() {
        this.app.get('/herbsshelf', (_, res, __) => {
            res.setHeader('Content-Type', 'text/html')
            const shelf = herbsshelf('Fipe.API', usecases())
            res.write(shelf)
            res.end()
        })
    }

    listen() {
        this.app.listen({ port: apiConfig.PORT }, this.serverUp)
    }

    serverUp(){
        console.log(`\n🚗 ----------------------------------------- 🚗\n🚗   rodando na porta ${apiConfig.PORT} env=${apiConfig.ENV}   🚗\n🚗 ----------------------------------------- 🚗\n\n`)
    }

}

module.exports = new Server(express())