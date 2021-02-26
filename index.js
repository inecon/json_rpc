require('dotenv').config();

const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jsonRouter = require('express-json-rpc-router')
const {controller} = require('./src/controllers/controller')
const {beforeController} = require('./src/controllers/beforeController')
const {afterController} = require('./src/controllers/afterController')

app.use(bodyParser.json())
app.use(jsonRouter({
    methods: controller,
    beforeMethods: beforeController,
    afterMethods: afterController,
    onError(e) {
        console.log('Something went wrong - error occurred!', e)
    }
}))
const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = process.env.MONGODB_URI
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


