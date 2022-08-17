const express = require('express')
const { Server: IOServer } = require('socket.io')
const path = require('path');
const app = express()
const serverExpress = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(serverExpress)
const route = require('./routes/index');
const MongoStore = require('connect-mongo')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const  { engine } = require('express-handlebars')
//creo instancias de contenedores y busco las configuraciones de las BD
const Contenedor = require('./contenedor/contenedor');
const {configSqlite }= require('./connections/config');
const {configMariaDB } = require('./connections/config');
const exp = require('constants');

const mensajeContenedor = new Contenedor(configSqlite, 'Mensaje');
const productoContenedor = new Contenedor(configMariaDB, 'Producto');

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({mongoUrl:'mongodb+srv://admin:ariel36219@cluster0.z1fv8.mongodb.net/?retryWrites=true&w=majority', useNewUrlParser: true, useUnifiedTopology: true}),
        secret: "coderback",
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 60000,
        }
    }),
);

app.use(express.static(path.join(__dirname, './public')))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './public/views/layouts/index.hbs')
}))
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'hbs');

app.use('/', route);

io.on('connection', async socket => {
    console.log(`Se conecto un usuario ${socket.id}`)
    let messagesData = await mensajeContenedor.getAll();
    let products = await productoContenedor.getAll();

    io.emit('server:message', messagesData)

    io.emit('server:products', products)

    socket.on('client:message', async messageInfo => {

       await mensajeContenedor.saveObject(messageInfo); 
       messagesData = await mensajeContenedor.getAll();
        io.emit('server:message', messagesData)
    })

    socket.on('client:product',async productForm => {
        await productoContenedor.saveObject(productForm);
        products = await productoContenedor.getAll();
        io.emit('server:products', products)
    })
})

