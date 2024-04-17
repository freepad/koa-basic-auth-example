const Koa = require('koa')
const auth = require('koa-basic-auth')

const app = module.exports = new Koa()

// custom 401 handling

app.use(async function(ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.set('WWW-Authenticate', 'Basic')
      ctx.body = 'you cant see it!'
    } else {
      throw err
    }
  }
})

// require auth

app.use(auth({ name: 'admin', pass: 'secret' }))

// secret response

app.use(async function(ctx) {
  ctx.body = 'secret info'
})


const PORT = process.env.PORT || 7080
app.listen(PORT, () => {
  console.log(`Open http://localhost:${PORT}`)
})
