let mongoose = require('mongoose');
let Stock = require('../models/stock-model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Stocks', () => {
    beforeEach((done) => {
        Stock.remove({}, (err) => {
            done();
        });
    });

    describe('/GET stock', () => {
        it('it should get a stock', (done) => {
            chai.request(server)
            .get('/api/stocks/1')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        })
    })

    describe('/POST stock', () => {
        it('it should POST a stock', (done) => {
            let stock = {
                ticker: "spy",
                entry: 300,
                quantity: 5
            }
            chai.request(server)
            .post('/api/stocks/')
            .send(stock)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('ticker');
                res.body.should.have.property('entry');
                res.body.should.have.property('quantity');
                done();
            })
        })
    })

    describe('/PUT/:id stock', () => {
        it('it should UPDATE a stock', (done) => {
            let stock = new Stock({
                ticker: "spy",
                entry: 300,
                quantity: 5
            })
            stock.save((err, stock) => {
                chai.request(server)
                .patch('/api/stocks/' + stock.id)
                .send({ quantity: 5000 })
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('quantity').eql(5000);
                    done();
                })
            })
        })
    })

    describe('/DELETE/:id stock', () => {
        it('it should DELETE a stock', (done) => {
            let stock = new Stock({
                ticker: "spy",
                entry: 300,
                quantity: 5
            })
            stock.save((err, stock) => {
                chai.request(server)
                .delete('/api/stocks/' + stock.id)
                .end((err,res) => {
                    res.should.have.status(200);
                    done();
                })
            })
        })
    })

});