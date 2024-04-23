const express = require('express');
const path = require('path');
const moment = require('moment');
const methodOverride = require('method-override')


const app = express();
const port = 3000;
const Customer = require('./models/customerSchema')

const mongoose = require('mongoose');
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.render('index', { arr: customers, moment: moment });
})
app.get('/user/add.html', (req, res) => {
    res.render('user/add')
})
app.post('/user/add.html', (req, res) => {
    Customer.create(req.body).then(() => {
        res.redirect('/')
    }).catch((err) => { console.log(err); });
})
app.post('/search', (req, res) => {
    Customer.find({ FirstName: req.body.searchText }).then((result) => {
        console.log(result);
        res.render('user/search', { customers: result })
    }).catch((err) => { console.log(err); });
})
app.put('/edit/:id', async (req, res) => {

    Customer.updateOne({ _id: req.params.id }, req.body).then(() => {
        res.redirect('/');
    }).catch((err) => { console.log(err); });



})
app.get('/edit/:id', async (req, res) => {
    res.render('user/edit', { customer: await Customer.findById(req.params.id) });
})
app.delete('/delete/:id', async (req, res) => {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect('/');
})
app.get('/user/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.render('user/view', { customer: customer, moment: moment })
})





mongoose.connect('mongodb+srv://moaza2298:moaza2298@cluster0.m5l9urg.mongodb.net/all-data?retryWrites=true&w=majority').then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);

    });
}).catch((err) => {
    console.log(err);
});
