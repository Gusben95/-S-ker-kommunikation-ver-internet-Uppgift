// const { response, request } = require('express');
const express = require ('express');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.static('../FrontEnd'));
app.use(express.json());
app.use(cookieParser());
app.use('/public',express.static(__dirname +'/public'));
app.use('/public/img',express.static(__dirname +'/public/img'));



// Ge åtkomst för getMenu'
const {hashPassword, comparePassword} = require('./Utils/bcrypt')
const {ticketVerified , getTicketById , getAccountByUsername ,saveAccount, getMenu , saveMenu , createTicketId,createCookie,addCookieToTicket, addToDb, getTicketByCookie,} = require('./Database/operations');
//  saveMenu();   

app.get("/api/events", async (req, res) => {
    const ticketMenu = await getMenu();

    const resObj = {
        success: true,
        menu: ""

    }
    // console.log(ticketMenu[0]);
   
      resObj.menu = ticketMenu[0];
      
    res.json(resObj);
    
});

app.post("/api/createticket", async (req, res) => {
    const resObj = {
        success: true 

    }
    const ticketInfo = req.body;   
    var newTicketId =  createTicketId();
    ticketInfo.id = newTicketId;
    addToDb(ticketInfo);
    var cookieId = createCookie();
    addCookieToTicket(ticketInfo.id, cookieId);

    res.cookie('TicketCookie', cookieId);
    res.json(resObj);
    console.log(ticketInfo, cookieId);
})

app.listen(5000,() => {
    console.log('Server successfully started on port 5000');
});

app.get("/api/ticket", async (req, res) => {
const cookie = req.cookies.TicketCookie; 
const ticketData =  await getTicketByCookie(cookie)
res.json(ticketData);
console.log(ticketData);


})


app.post('/api/auth/create', async (req, res) => {
    const credentials = req.body;
    //{ username: 'ada', password: 'pwd123' }
    const resObj = {
        success: true,
    }
        const hashedPassword = await hashPassword(credentials.password);
        credentials.password = hashedPassword;

        saveAccount(credentials);

    res.json(resObj);
}); 

app.post('/api/auth/login', async (request, response) => {
    const credentials = request.body;
    //{ username: 'ada', password: 'pwd123' }

    const resObj = {
        success: false,
        token: ''
    }

    const account = await getAccountByUsername(credentials.username);
    console.log(account);

    if (account.length > 0) {
        const correctPassword = await comparePassword(credentials.password, account[0].password);
        if (correctPassword) {
            resObj.success = true;

            // Vår token blir krypterad med vårt användarnamn som kopplar token till en användare
            const token = jwt.sign({ username: account[0].username }, 'a1b1c1', {
                expiresIn: 600 // Går ut om 10 min (värdet är i sekunder)
            });
            resObj.token = token;
        }
    }
    console.log(resObj);
    response.json(resObj);
});




app.post('/api/auth/checkedTicket', async (req, res) => {
    const resObj =   {
        success: false, 
        exist: true,
        used: false
    }
    const ticketId = req.body; 
console.log(ticketId.id);
const checkedTicket =  await getTicketById(ticketId.id); 
// res.json(checkedTicket);
if (checkedTicket[0] == null){
    resObj.exist = false;
}
else if (checkedTicket[0].verified == false) {
    ticketVerified(ticketId.id);
    resObj.success = true;
    
}
else if (checkedTicket[0].verified == true) {
    resObj.used = true; 

}

res.json(resObj);
console.log(resObj);

})
app.get('/api/auth/checktoken', async (request, response) => {
    const token = request.headers.authorization.replace('Bearer ', '');
    const resObj = {
        success: false,
        
    }

    try {
        const data = jwt.verify(token, 'a1b1c1'); // Verifera vår token
        // Kopplar samman beställningen med användarnamnet från JWT som skickades med i anropet

        resObj.success = true;
       
    } catch (error) {
        resObj.errorMessage = 'Token invalid';
    }
    console.log(resObj);
    response.json(resObj);
})