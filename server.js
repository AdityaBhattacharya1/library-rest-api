const app = require('./app')
const { logToConsole } = require('./src/utils/logToConsole')

app.listen(process.env.PORT || 8000, logToConsole('Server started'))
