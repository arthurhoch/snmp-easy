
const snmp = require("net-snmp");

const runSnmpOid = (ip = "localhost", oid) => {

    return new Promise((resolve, reject) => {
        const session = snmp.createSession(ip, "public");
        var oids = [];
        oids.push(oid);
        session.get(oids, function (error, varbinds) {
            if (error) {
                reject(error);
            } else {
                var result = [];
                for (var i = 0; i < varbinds.length; i++)
                    if (snmp.isVarbindError(varbinds[i])) {
                        console.error(snmp.varbindError(varbinds[i]))
                        result.push(snmp.varbindError(varbinds[i]));
                    }
                    else {
                        console.log(varbinds[i].value);
                        var value = typeof varbinds[i].value == 'number' ? varbinds[i].value : varbinds[i].value.toString('utf8');
                        result.push({oid: varbinds[i].oid, value: value});
                    }

                resolve(result);
            }
            session.close();
        });

        session.trap(snmp.TrapType.LinkDown, function (error) {
            if (error) {
                reject(error);
            }
        });

    });
}




module.exports = {
    runSnmpOid
}