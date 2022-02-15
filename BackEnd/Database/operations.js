const { application } = require('express');
const nedb = require('nedb-promise');


//skapa databas
const database = new nedb({filename:"Tickets.db" , autoload:true});

// Skapa ett objekt att senare hämta till frontend.
const menu = {
    "type": "consert-menu",
    "menu":[
      {
        "type": "ticket",
        "verified": false,
        "title":"Icona Pop",
        "location":"Stora Teatern",
        "date":"21 APR",
        // "time":"18.00 - 20.00",
        "from": "18:00",
        "to": "20:00",
        "price":249
      },
      {
        "type": "ticket",
        "verified": false,
        "title":"Imagine Dragons",
        "location":"Trädgår'n",
        "date":"28 APR",
        // "time":"20.00 - 22.00"
        "from": "20:00",
        "to": "22:00",
        "price":449
      },
      {
        "type": "ticket",
        "verified": false,
        "title":"Tame Impala",
        "location":"Pustevik",
        "date":"11 MAJ",
        // "time":"19.00 - 20.00",
        "from": "19:00",
        "to": "20:00",
        "price":149
      },
      {
        "type": "ticket",
        "verified": false,
        "title":"E-type",
        "location":"Park Lane",
        "date":"1 JUN",
        // "time":"20.00 - 22.00",
        "from": "20:00",
        "to": "22:00",
        "price":199
      }
    ]
  }
// Skapa en funktion för att hitta och exportera menyn
 async function getMenu()
{
const menu = await database.find({ type: 'consert-menu'});
return menu; 
}
function saveMenu(){
    database.insert(menu);
}

// function getTicketId(x) {
//   const account = await database.find({
//     id: x,
    
//     });
//     return account;
// }

// Gör kollen redan här. Skapa tillräckligt "stora id " för att minska risken för samma kolla UUIDv4 
function createTicketId() {

    const letters = ['ABC', 'DEF' ];
    const randomLetter = letters[Math.floor(Math.random() * letters.length)]; // Slumpar en av bokstäverna X, Y eller Z
    const randomNumber = Math.floor(Math.random() * 5000/10); // Slumpar ett tal mellan 0 och 10 000
    var x = `${randomLetter}${randomNumber}`;
    return x; 
  
   

}


function createCookie(){
  const cookieId = Math.round(Math.random() * 10000);
  return cookieId;
}


function addToDb(ticket) {
  database.insert(ticket);
}

function addCookieToTicket(ticketInfoId, cookieId) {
  
  database.update({ id: ticketInfoId}, {$set:{cookie: cookieId}} );
  
}

async function getTicketByCookie(cookie) {
 
 
 const ticket =  database.find({cookie: parseInt(cookie)})
  return ticket; 

}
function saveAccount(account) {
  database.insert(account);
}

async function getAccountByUsername(username){
const account = database.find({username: username});
return account;

}

async function getTicketById(ticketId) {
const checkTicket = database.find({id: ticketId}); 
return checkTicket;
} 

async function ticketVerified(ticket_Id){
  database.update({id: ticket_Id},  {$set:{verified: true}});

}








module.exports = {ticketVerified, getTicketById, getMenu , saveMenu , createTicketId , addToDb, createCookie, addCookieToTicket,getTicketByCookie,saveAccount, getAccountByUsername}