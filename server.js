const express=require('express');
const app=express();
const session=require('express-session');
app.listen(3000,()=>console.log("server started"))
//middlewares
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key',
    resave: false,             
    saveUninitialized: true,   
    cookie: { secure: false }  
}));
//first interface
app.get('/',(req,res)=>
{
    if(req.session.username)
    {
       res.render('home');
    }
    else{
        res.render('login',{message:''});
    }
})
//declaring username and password
const username='sarath124';
const password='12345';
//vrifying the req with our data
app.post('/verify',(req,res)=>
{
    if(req.body.username===username&&req.body.password===password)
        {
            req.session.username=username;
            req.session.password=password;
              res.redirect('/home');//if it's correct redirecting to home
        }
        else{
            res.render('login',{message:'invalid username or password'})
        }
})
//accessing home 
app.get('/home',(req,res)=>
{
    if(req.session.username)
    {
        res.setHeader('Cache-Control', 'no-store'); 
        res.setHeader('Pragma', 'no-cache');  
        res.setHeader('Expires', '0');   
        res.render('home')
    }
    else{
        res.redirect('/');
    }
})
//logout operation
app.get('/logout',(req,res)=>{
    if(req.session.username)
    {
        req.session.destroy((err)=>
                {
                    if(err)
                    {
                return res.write("error occured while logging out")
                    }
        })
        res.redirect('/');
    }
    else{
        res.redirect('/');
    }
})
