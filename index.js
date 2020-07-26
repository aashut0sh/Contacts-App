const express =require('express');
const path=require('path');
const port =8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app= express();
app.use(express.static('assests'));
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
//for the home page
app.get('/',function(req,res){
    Contact.find({},function(err,fetchContat){
        if(err){
            console.log('error in fetching');
        }
        return res.render('home',{
            toto:"Contact-List!",
            mylist: fetchContat
        });
    });
});
//for creation of new contact
app.post('/mypost',function(req,res){
 
    // contactList.push(req.body);
    // now i can push it in my databas
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
         //console.log('*******',newContact);
        return res.redirect('back');
    });
});

app.get('/practise',function(req,res){

    return res.render('practise',{
     title:"let me play"
    });
});
//for deletion of selected contact
app.get('/delete',function(req,res){

    // let phone=req.query.phone;
    //  console.log(req.query);
    // let index = contactList.findIndex(yo => yo.phone==phone);
    // console.log(index);
    // if(index != -1)
    // {
    //     contactList.splice(index,1);
    // }

    let id=req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error deleting');
            return;
        }
        res.redirect('back');
    });
});
//running the port
app.listen(port,function(err){
    if(err){
        console.log("error in running server");
    }

    console.log("Yupp!! Its Running");
});