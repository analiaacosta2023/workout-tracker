import express from 'express'
import config from './config.js'
import mongoose from 'mongoose'
import workoutRoutes from './routes/workouts.js'
import userRoutes from './routes/user.js'

// express app
const app = express();

// middlewares

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(config.mongoUri)
    .then(() => {
        // listen for requests
        app.listen(config.port, () => {
            console.log(`Connected to db & listening on port ${config.port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

