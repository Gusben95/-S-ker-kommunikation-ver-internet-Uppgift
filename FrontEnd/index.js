
const lista = document.getElementById('listaElement'); 
const container = document.getElementById('container')
const  konsertLista = document.getElementById('listaKonserter')

function showMenu(conserts) {
   
    conserts.forEach((menu, index) => {
        const parContainer = document.createElement('div');
        parContainer.setAttribute("class" , "parContainer");
        parContainer.addEventListener("click", () => {
            buyticket(menu);
        })
        konsertLista.append(parContainer);
        

        const datumContainer = document.createElement('div');
        datumContainer.setAttribute("class" , "datumContainer");
        parContainer.append(datumContainer);

        const datum = document.createElement('p');
        datum.setAttribute("class" , "datum" );
        datum.innerHTML = menu.date;
        datumContainer.append(datum);

        const konsertContainer = document.createElement('div');
        // konsertContainer.setAttribute("id" , "konsertContainer" + index);
        konsertContainer.setAttribute("class" , "konsertContainer" ) ;
        parContainer.append(konsertContainer);

        const konserter = document.createElement('p');
        konserter.setAttribute("class" , "konserter" );
        konserter.innerHTML = menu.title;
        konsertContainer.append(konserter);

        const plats = document.createElement('p');
        plats.setAttribute("class" , "plats" );
        plats.innerHTML = menu.location;
        konsertContainer.append(plats);
        
        const tidPrisDiv = document.createElement('div');
        tidPrisDiv.setAttribute("class", "tidPrisDiv");
        konsertContainer.append(tidPrisDiv);

        const tid = document.createElement('p');
        tid.setAttribute("class" , "tid" );
        tid.innerHTML = menu.from + "-" + menu.to;
        tidPrisDiv.append(tid);

        const pris = document.createElement('p');
        pris.setAttribute("class" , "pris" );
        pris.innerHTML = menu.price + " SEK";
        tidPrisDiv.append(pris);

        
       

      
        
         
        

        



        
    });














    // conserts.forEach((menu) => {
        
    //     const itemEl = document.createElement('li');
    //     console.log(itemEl);
    //     itemEl.innerHTML = `${menu.title} - ${menu.location} - ${menu.date} - ${menu.time} - ${menu.price}`;
    //     menuEl.appendChild(itemEl);
    //     const köp = document.createElement('button');
    //     köp.innerHTML = "Köpknapp";
    //     köp.addEventListener("click", function(){
    //         buyticket(menu);
    //     });
    //     menuEl.append(köp);
    // });
}


async function getMenu(){
    const res = await fetch("http://localhost:5000/api/events")
    const data = await res.json();
    // console.log(data.menu.menu);
    if (data.success = true )   { 
        
        showMenu(data.menu.menu);
    }

}
getMenu();


async function buyticket(ticket) {

const res = await fetch("http://localhost:5000/api/createticket", {
    method : "POST",
    body: JSON.stringify(ticket),
    headers: {"Content-Type" : "application/json"}
    
}
)
const data = await res.json();
if (data.success == true) {
   window.location.href = 'http://localhost:5000/ticket.html'
}
}
