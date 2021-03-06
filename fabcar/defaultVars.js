
var fs = require('fs');
let peerPem = fs.readFileSync('/home/bahung/Desktop/fabric-samples/basic-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt');
let ordererPem = fs.readFileSync('/home/bahung/Desktop/fabric-samples/basic-network/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/tls/ca.crt');
module.exports = {
    PEER_PEM: peerPem,
    ORDERER_PEM: ordererPem,
    ORDERER_DOMAIN: "orderer0.orgorderer",
    PEER_DOMAIN: "peer0.org1",
    TLS_ENABLED: "true",
    MSPID: "Org1MSP",
    CA_SERVER_NAME: "ca.org1"
};
