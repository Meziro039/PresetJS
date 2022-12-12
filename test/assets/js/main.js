console.log("%cSuccess: main.js load", "color:yellow");

async function anime(){
    while (true){
        document.getElementById("anime").textContent = "|.........";
        await Sleep(100);
        document.getElementById("anime").textContent = "||........";
        await Sleep(100);
        document.getElementById("anime").textContent = "|||.......";
        await Sleep(100);
        document.getElementById("anime").textContent = "||||......";
        await Sleep(100);
        document.getElementById("anime").textContent = "|||||.....";
        await Sleep(100);
        document.getElementById("anime").textContent = "||||||....";
        await Sleep(100);
        document.getElementById("anime").textContent = "|||||||...";
        await Sleep(100);
        document.getElementById("anime").textContent = "||||||||..";
        await Sleep(100);
        document.getElementById("anime").textContent = "|||||||||.";
        await Sleep(100);
        document.getElementById("anime").textContent = "||||||||||";
        await Sleep(100);
    }
}

function Sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

anime();