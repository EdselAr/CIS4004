function getCounter() {
    return parseInt(document.getElementById("counter").innerText);
}

function setCounter(value) {
    document.getElementById("counter").innerText = value;
}

function tickUp() {
    setCounter(getCounter() + 1);
}

function tickDown() {
    setCounter(getCounter() - 1);
}

function runForLoop() {
    let count = getCounter();
    let result = "";
    for (let i = 0; i <= count; i++) {
        result += i + " ";
    }
    document.getElementById("forLoopResult").innerText = result.trim();
}

function showOddNumbers() {
    let count = getCounter();
    let result = "";
    for (let i = 1; i <= count; i++) {
        if (i % 2 !== 0) {
            result += i + " ";
        }
    }
    document.getElementById("oddNumberResult").innerText = result.trim();
}

function addMultiplesToArray() {
    let count = getCounter();
    let arr = [];
    for (let i = count; i >= 5; i--) {
        if (i % 5 === 0) {
            arr.push(i);
        }
    }
    console.log(arr);
}

function printCarObject() {
    let carObj = {
        cType: document.getElementById("carType").value,
        MPG: document.getElementById("carMPG").value,
        Color: document.getElementById("carColor").value
    };
    console.log(carObj);
}

function loadCar(carNum) {
    let selectedCar;
    if (carNum === 1) selectedCar = carObject1;
    else if (carNum === 2) selectedCar = carObject2;
    else if (carNum === 3) selectedCar = carObject3;

    if (selectedCar) {
        document.getElementById("carType").value = selectedCar.cType;
        document.getElementById("carMPG").value = selectedCar.cMPG;
        document.getElementById("carColor").value = selectedCar.cColor;
    }
}

function changeColor(colorNum) {
    let p = document.getElementById("styleParagraph");
    if (colorNum === 1) p.style.color = "red";
    else if (colorNum === 2) p.style.color = "green";
    else if (colorNum === 3) p.style.color = "blue";
}
