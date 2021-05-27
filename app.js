const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth_routes'))
app.use('/api/article', require('./routes/article_routes'))

const PORT = config.get('port'|| 5000)


async function start() {
    try{
        await mongoose.connect(config.get("mongoURL",),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log('App st on port ${PORT} '))
    }catch (e){
        console.log("SerError", e.message)
        process.exit(1)
    }
}

start()
