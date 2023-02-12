const { default: axios } = require("axios");

// var axios = require('axios');
const startKeepAlive = () => {
    setInterval(()=>{
        var options = {
            host: 'https://obscure-sea-94311.herokuapp.com',
            path: '/'
        };
        axios.get('https://obscure-sea-94311.herokuapp.com').then((res)=>{
            console.log("Ping success!");
        }).catch((error)=>{
            console.log({error})
        })
    }, 10*60 * 1000); // load every 20 minutes
}

module.exports = {startKeepAlive}