const express = require('express');
const cors = require('cors');
const ip = require('ip');
const mynmap = require('network-list');

const { runSnmpOid } = require('./simple-snmp');
const { nameOids } = require('./functions');

var app = express();
app.use(cors())


var ips = undefined;

app.get('/oids/:ip/:oid', (req, res) => {
    var ip = req.params.ip;
    var oid = req.params.oid;
    var oids = [];
    oids.push(oid);

    runSnmpOid(ip, oid)
        .then((result) => {
            console.log(result);
            return res.status(200).send(result)
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send(e)
        });
});

app.get('/oids/list', (req, res) => {
    return res.status(200).send(nameOids);
});


app.get('/oids/iplist', (req, res) => {
    const myIp = ip.address().split(".");
    const net = myIp[0] + '.' + myIp[1] + '.' + myIp[2];
    var retorno = {};

    if (ips === undefined) {
        mynmap.scan({ ip: net }, (err, arr) => {
            if (err)
                return res.status(500).send(err);
            ips = arr;
            return res.status(200).send(ips);
        });
    } else {
        return res.status(200).send(ips);
    }

})

app.listen(3001, () => {
    console.log(`Started on port 3001`)
})