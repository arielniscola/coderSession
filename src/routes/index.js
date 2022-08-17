const { Router } = require('express')
const path = require('path')
const ProductosAleatorios = require('../contenedor/productosAleatorios')
const router = Router();
const products = new ProductosAleatorios();
//const authMiddleware = require('../middleware/auth')



router.get('/productos-test', async (req, res) => {
   products.dataCreate()
   return res.render('productoTabla', { productos: products.productos})

})

router.get('/', authMiddleware, (req, res) => {
   res.sendFile(path.join(__dirname, '../public/home.html'))
})

router.get('/login', loginMiddleware,(req, res) => {
   res.sendFile(path.join(__dirname, '../public/login.html'))
})

router.get('/api/login', (req, res) => {
   try {
      req.session.username = req.query.username;
      res.redirect("/")
   } catch (error) {
     res.redirect('/login')
   }
})

router.get('/logout', authMiddleware , (req, res) => {
   let session = req.session.username 
   req.session.username = null
   return res.render('logout', {name: session})
})


function authMiddleware(req, res, next){
   if(req.session.username){
       next();
   }else {
       res.redirect("/login")
   }
}

function loginMiddleware(req, res, next){
   if(req.session.username){
      res.redirect('/');
   }else{
      next()
   }
}


module.exports = router