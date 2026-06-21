document.addEventListener("DOMContentLoaded", function () {

const payScales = {
1:{min22:13550,inc22:430,min26:16280,inc26:520,max26:31880},
2:{min22:13820,inc22:490,min26:16600,inc26:590,max26:34300},
3:{min22:14260,inc22:580,min26:17130,inc26:700,max26:38130},
4:{min22:14690,inc22:660,min26:17650,inc26:800,max26:41650},
5:{min22:15230,inc22:750,min26:18300,inc26:910,max26:45600},
6:{min22:15760,inc22:840,min26:18930,inc26:1010,max26:49230},
7:{min22:16310,inc22:910,min26:19590,inc26:1100,max26:52590},
8:{min22:16890,inc22:1000,min26:20290,inc26:1210,max26:56590},
9:{min22:17470,inc22:1090,min26:20990,inc26:1310,max26:60290},
10:{min22:18050,inc22:1190,min26:21680,inc26:1430,max26:64580},
11:{min22:18650,inc22:1310,min26:22400,inc26:1580,max26:69800},
12:{min22:19770,inc22:1430,min26:23750,inc26:1720,max26:75350},
13:{min22:21160,inc22:1560,min26:25420,inc26:1880,max26:81820},
14:{min22:22530,inc22:1740,min26:27060,inc26:2090,max26:89760},
15:{min22:23920,inc22:1980,min26:28730,inc26:2380,max26:100130},
16:{min22:28070,inc22:2260,min26:33720,inc26:2720,max26:115320},
17:{min22:45070,inc22:3420,min26:54140,inc26:4110,max26:136340},
18:{min22:56880,inc22:4260,min26:68320,inc26:5120,max26:170720},
19:{min22:87840,inc22:4530,min26:105510,inc26:5450,max26:214510},
20:{min22:102470,inc22:6690,min26:123080,inc26:8040,max26:235640},
21:{min22:113790,inc22:7420,min26:136680,inc26:8920,max26:261560},
22:{min22:122190,inc22:8710,min26:146770,inc26:10470,max26:293350}
};

const dropdown = document.getElementById("bps");

dropdown.innerHTML = `<option value="">Select BPS</option>`;
for(let i=1;i<=22;i++){
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = "BPS-" + String(i).padStart(2,"0");
    dropdown.appendChild(opt);
}

function animate(id, start, end, duration){
    let el = document.getElementById(id);
    let startTime = null;

    function step(t){
        if(!startTime) startTime = t;
        let progress = Math.min((t-startTime)/duration,1);
        let value = Math.floor(progress*(end-start)+start);
        el.innerText = "Rs. " + value.toLocaleString();
        if(progress<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

window.calculateSalary = function(){

    let bps = document.getElementById("bps").value;
    let current = parseInt(document.getElementById("basicPay").value);

    if(!bps) return alert("Select BPS");
    if(!current) return alert("Enter Basic Pay");

    let scale = payScales[bps];

    let stage = Math.round((current - scale.min22)/scale.inc22);
    if(stage < 0) stage = 0;

    let newPay = scale.min26 + (stage*scale.inc26);
    let diff = newPay - current;

    document.getElementById("result").innerHTML = `
    <div class="result-box">
        <h3>Salary Calculation Result</h3>
        <table>
            <tr><td>Current Pay</td><td id="a"></td></tr>
            <tr><td>New Pay</td><td id="b"></td></tr>
            <tr><td>Difference</td><td id="c"></td></tr>
            <tr><td>Increment</td><td id="d"></td></tr>
            <tr><td>Max Pay</td><td id="e"></td></tr>
        </table>
    </div>
    `;

    animate("a",0,current,700);
    animate("b",0,newPay,900);
    animate("c",0,diff,800);
    animate("d",0,scale.inc26,700);
    animate("e",0,scale.max26,900);
};

});
