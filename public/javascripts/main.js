/** Handles fetching data from server
 * 
 * @param {start<Integer>, limit<Integer>}
 * 
 * @returns null
 */
loadData = async (start, limit)=>{
    //DOM Element
    var tbody = document.querySelector("tbody");
    var section = document.querySelector("#section");
    var prev = document.querySelector("#previous");
    if(start === 1){
        prev.style.display = "none";
    } else {
        prev.style.display = "block";
    }

    //Fetch
    var responseJSON = await fetch(`https://api.coinlore.com/api/tickers/?start=${start}&limit=${limit}`);
    var response = await responseJSON.json();

    //Data
    var data = response.data;

    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", 'container mb-2 mt-2');
        if (i % 2 === 0) {
            div.innerHTML = `<div class='row no-gutters border shadow'><div class='col-6 p-1 border-bottom border-right'><div>💰 Coin</div><div>${data[i].name}</div></div><div class='col-6 p-1 border-bottom'><div>📄 Code</div><div>${data[i].symbol}</div></div><div class='col-6 p-1 border-right'><div>🤑 Price</div><div>&#36;${data[i].price_usd}</div></div><div class='col-6 p-1 '><div>📉 Total Supply</div><div>${data[i].tsupply}</div></div></div>`;
        } else {
            div.innerHTML = `<div style='background:#999;' class='row no-gutters border shadow'><div class='col-6 p-1 border-bottom border-right'><div>💰 Coin</div><div>${data[i].name}</div></div><div class='col-6 p-1 border-bottom'><div>📄 Code</div><div>${data[i].symbol}</div></div><div class='col-6 p-1 border-right'><div>🤑 Price</div><div>&#36;${data[i].price_usd}</div></div><div class='col-6 p-1 '><div>📉 Total Supply</div><div>${data[i].tsupply}</div></div></div>`;
        }

        var tr = document.createElement("tr");
        tr.innerHTML = `<td>${data[i].name}</td><td>${data[i].symbol}</td><td>${data[i].price_usd}</td><td>${data[i].tsupply}</td></tr>`;
        
        tbody.append(tr);
        section.append(div);
    }
}


document.addEventListener("DOMContentLoaded", async()=>{
    var start = 1;
    const LIMIT = 10; 
     
    var section = document.querySelector("#section");
    var tbody = document.querySelector("tbody");
    
    var next = document.querySelector("#next");
    var prev = document.querySelector("#previous");
     
     await loadData(start, LIMIT);
     next.addEventListener("click", async ()=>{
         start = start + LIMIT;

         tbody.innerHTML = "";
         section.innerHTML = "";

         window.scrollTo(0, 0);

        //  document.querySelector("#spinner").style.display = "block";
         await loadData(start, LIMIT);

        //  document.querySelector("#spinner").style.display = "none";
     })
     
     prev.addEventListener("click", async ()=>{
         start = start - LIMIT;

         tbody.innerHTML = "";
         section.innerHTML = "";

         window.scrollTo(0, 0);

        //  document.querySelector("#spinner").style.display = "block";
         await loadData(start, LIMIT);

        //  document.querySelector("#spinner").style.display = "none";
     })
     
 })