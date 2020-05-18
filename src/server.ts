import app from './app'

app.listen(process.env.NODE_PORT, () => {
  console.log(`running port ${process.env.NODE_PORT}`)
})
