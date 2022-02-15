

// const verifiedElem = document.getElementById('verified');
const titleElem = document.getElementById('title');
const locationElem = document.getElementById('location');
const dateElem = document.getElementById('date');
const fromElem = document.getElementById('timefrom');
const toElem = document.getElementById('timeto');
// const priceElem = document.getElementById('price');
const idElem = document.getElementById('barcode');
const biljetElem = document.getElementById('biljettnummer');


async function getTicketDetails() {
const res = await fetch("http://localhost:5000/api/ticket")
const ticketData = await res.json();
console.log(ticketData);
// verifiedElem.innerHTML = "Verified: " + ticketData[0].verified;
titleElem.innerHTML =  ticketData[0].title;
locationElem.innerHTML = ticketData[0].location;
dateElem.innerHTML = ticketData[0].date;
fromElem.innerHTML =  ticketData[0].from;
toElem.innerHTML =  ticketData[0].to;
biljetElem.innerHTML= "Biljettnummer: " + ticketData[0].id;
// priceElem.innerHTML = "Price: " + ticketData[0].price;
idElem.innerHTML = ticketData[0].id;
}
getTicketDetails();




