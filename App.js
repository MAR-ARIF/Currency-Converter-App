const selects = document.querySelectorAll("select");
const form = document.querySelector("form");
const amountInput = document.querySelector("#cform");
const msg = document.querySelector(".msg");



for (let currency in countryList) {
    selects.forEach(drop => {
        let option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        drop.appendChild(option);

    }  )

}

function updateFlag (selectElement){
    let currencyCode = selectElement.value;
    let countryCode = countryList[currencyCode];
    let img = selectElement.nextElementSibling;
    img.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;

}

document.querySelector("#from").value = "GBP";
document.querySelector("#to").value = "BDT";
updateFlag(document.querySelector("#from"));
updateFlag(document.querySelector("#to"));

selects.forEach(select => {
    select.addEventListener("change", () => updateFlag(select));
})

form.addEventListener("submit" , async (e) => {
    e.preventDefault();

    let amount = amountInput.value;
    let fromSelection = document.querySelector("#from").value;
    let toSelection = document.querySelector("#to").value;

    if (amount === "" || amount <= 0){
        msg.textContent = "Please enter a valid amount."
        return;
    }

    msg.textContent = "Getting exchane rate.....";

    let url = `https://api.exchangerate-api.com/v4/latest/${fromSelection}`;
    let response = await fetch(url);
    let data = await response.json();

    let rate = data.rates[toSelection];
    let convert = (amount * rate).toFixed(2);

    msg.textContent = `${amount} ${fromSelection} = ${convert} ${toSelection}`;
})

