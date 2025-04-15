
let allCoin=[];
input.addEventListener("input",(e)=>{
    e.preventDefault();  
    let input=document.getElementById("input")
    let value=input.value
    let filterdArr=allCoin.filter(item=>
        item.name.toLowerCase().includes(value) || item.symbol.toLowerCase().includes(value))
    coinData(filterdArr);
})


document.getElementById("sortMkt").addEventListener("click",(e)=>{   
    e.preventDefault();
   let sortedArr=allCoin.sort((a,b)=>b.market_cap - a.market_cap);
   coinData(sortedArr);
});

document.getElementById("sortPer").addEventListener("click",(e)=>{
    e.preventDefault();

   let sortedArr=allCoin.sort((a,b)=>b.ath_change_percentage - a.ath_change_percentage);
   coinData(sortedArr);
});


const fetched_data=async ()=>{
    const res=await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
    const data=await res.json();
    if(data){
    allCoin=data;
    coinData(data);
}
}
// console.log(fetched_data);
fetched_data();

function coinData(data){   
    let tbody=document.querySelector("tbody");
    tbody.textContent="";
    data.forEach((item)=>{
            tbody.innerHTML+=`
               <tr class="">
                        <td><img height="30px" src=${item.image} /> ${item.name}</td>
                        <td>${item.symbol}</td>
                        <td>${item.current_price}</td>
                        <td>${item.total_volume}</td>
                        <td class="text-success">${item.ath_change_percentage}%</td>
                        <td>Mkr cap: ${item.market_cap}</td>                       
                 </tr>
            `

            // console.log(item)
    })
    }
