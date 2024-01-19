const { payments, networks } = require('bitcoinjs-lib');
const { bitcoin } = require('bitcoinjs-lib/src/networks');
const { ECPairFactory, TinySecp256k1Interface } = require('ecpair');

const tinysecp = require('tiny-secp256k1');
const ECPair = ECPairFactory(tinysecp);

// Assuming you are using the testnet
const testnet = networks.testnet;

// Generate a random key pair using ecpair
const keypair = ECPair.makeRandom();

// Get address and private key
const { address: addr } = payments.p2pkh({ pubkey: keypair.publicKey, network: testnet });
const pk = keypair.privateKey.toString('hex');

// Display the result
console.log('Address:', addr);
console.log('Private Key:', pk);

//create transaction
let txb = new payments.TransactionBuilder(testnet);
let txid = "tb1qt0lenzqp8ay0ryehj7m3wwuds240mzhgdhqp4c"
let outn = 0;

txb.addInput(txid,outn)

txb.addOutput("tb1qu6nyvpsg02kprgsqc0rr5h0qtm5em9mxgs7fwe", 7000043);
txb.addOutput("tb1qt0lenzqp8ay0ryehj7m3wwuds240mzhgdhqp4c", 200043);

let WIF = "9488957383cde0b3d2d974bee84a017cc7cfff3b96f5089c8a139f5b88f00053"
let keyPairSpend = bitcoin.ECPair.fromWIF(WIF, testnet);
txb.sign(0, keyPairSpend)

let tx = txb.build()
let txhex = tx.toHex();
console.log(txhex);