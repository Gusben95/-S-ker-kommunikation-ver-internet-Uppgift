const verify = document.querySelector("#verify");
const check = document.querySelector("#check");
const ticketInformationElem = document.querySelector("#ticketInformation");




async function isLoggedIn() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/auth/checktoken', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const data = await response.json();
    console.log(data);

    if (data.success == false) {
        verify.style.display = "none";
        check.style.display = "none"; 
        window.location.href = "http://localhost:5000/login.html"
          
    }
    
}


async function checkingTicket(verify){
    console.log(verify.id  + " CheckingTicket funktionen")
const res = await fetch ('http://localhost:5000/api/auth/checkedTicket', {
 method: 'POST',
 body: JSON.stringify(verify),
 headers: {
     'Content-Type': 'application/json'
 }
 
});
const data = await res.json();
showTicketInformation(data);
console.log(data);
}
check.addEventListener('click', () => {
    // if(ticketInformation)
    const verifying = {
        id: verify.value
        
        
    }
     console.log(verify.value);
     checkingTicket(verifying);
    
});

function showTicketInformation(data) {
    
        const tickets = document.createElement('li');
        tickets.innerHTML = `Success: ${data.success}<br/>Exist: ${data.exist}<br/>Used: ${data.used}`;
        ticketInformationElem.appendChild(tickets);
        
    };

    
    
    isLoggedIn();