/****************************
  SALARY CALCULATOR ENGINE
  CLEAN VERSION (FIXED)
****************************/

const payScales2022 = {
    1:{min:13550,incr:430,max:26450,maxStages:30},
    2:{min:13820,incr:490,max:28520,maxStages:30},
    3:{min:14260,incr:580,max:31660,maxStages:30},
    4:{min:14690,incr:660,max:34490,maxStages:30},
    5:{min:15230,incr:750,max:37730,maxStages:30},
    6:{min:15760,incr:840,max:40960,maxStages:30},
    7:{min:16310,incr:910,max:43610,maxStages:30},
    8:{min:16890,incr:1000,max:46890,maxStages:30},
    9:{min:17470,incr:1090,max:50170,maxStages:30},
    10:{min:18050,incr:1190,max:53750,maxStages:30},
    11:{min:18650,incr:1310,max:57950,maxStages:30},
    12:{min:19770,incr:1430,max:62670,maxStages:30},
    13:{min:21160,incr:1560,max:67960,maxStages:30},
    14:{min:22530,incr:1740,max:74730,maxStages:30},
    15:{min:23920,incr:1980,max:83320,maxStages:30},
    16:{min:28070,incr:2260,max:95870,maxStages:30},
    17:{min:45070,incr:3420,max:113470,maxStages:20},
    18:{min:56880,incr:4260,max:142080,maxStages:20},
    19:{min:87840,incr:4530,max:178440,maxStages:20},
    20:{min:102470,incr:6690,max:196130,maxStages:14},
    21:{min:113790,incr:7420,max:217670,maxStages:14},
    22:{min:122190,incr:8710,max:244130,maxStages:14}
};

const payScales2026 = {
    1:{min:16280,incr:540,max:32480,maxStages:30},
    2:{min:16660,incr:620,max:35260,maxStages:30},
    3:{min:17130,incr:730,max:39030,maxStages:30},
    4:{min:17650,incr:830,max:42550,maxStages:30},
    5:{min:18300,incr:940,max:46500,maxStages:30},
    6:{min:18930,incr:1050,max:50430,maxStages:30},
    7:{min:19590,incr:1140,max:53790,maxStages:30},
    8:{min:20290,incr:1250,max:57790,maxStages:30},
    9:{min:20990,incr:1370,max:62090,maxStages:30},
    10:{min:21680,incr:1490,max:66380,maxStages:30},
    11:{min:22410,incr:1640,max:71610,maxStages:30},
    12:{min:23750,incr:1790,max:77450,maxStages:30},
    13:{min:25420,incr:1950,max:83920,maxStages:30},
    14:{min:27060,incr:2180,max:92460,maxStages:30},
    15:{min:28730,incr:2480,max:103130,maxStages:30},
    16:{min:33720,incr:2830,max:118620,maxStages:30},
    17:{min:54140,incr:4280,max:139740,maxStages:20},
    18:{min:68330,incr:5330,max:174930,maxStages:20},
    19:{min:105510,incr:5670,max:218910,maxStages:20},
    20:{min:123090,incr:8370,max:240270,maxStages:14},
    21:{min:136680,incr:9280,max:266600,maxStages:14},
    22:{min:146770,incr:10890,max:299230,maxStages:14}
};

const gpfRates = {
    1:{old:600,new:730},
    2:{old:1060,new:1280},
    3:{old:1150,new:1390},
    4:{old:1239,new:1490},
    5:{old:1330,new:1600},
    6:{old:1420,new:1710},
    7:{old:1500,new:1810},
    8:{old:1600,new:1930},
    9:{old:1700,new:2040},
    10:{old:1800,new:2160},
    11:{old:1920,new:2310},
    12:{old:3300,new:3970},
    13:{old:3570,new:4290},
    14:{old:3900,new:4680},
    15:{old:4290,new:5160},
    16:{old:4960,new:5970},
    17:{old:6350,new:7620},
    18:{old:7960,new:9570},
    19:{old:10660,new:12810},
    20:{old:11950,new:14350},
    21:{old:13260,new:15930},
    22:{old:14660,new:17610}
};

let currentBPS = 16;

window.onload = () => {
    init();
};

function init(){
    document.getElementById("bpsScale").addEventListener("change",handleBPS);
    document.getElementById("bpsStage").addEventListener("change",handleStage);
    document.getElementById("basicPay").addEventListener("input",handleInput);
    document.getElementById("personalPay").addEventListener("input",calculate);

    handleBPS();
}

/* ---------------- BPS CHANGE ---------------- */
function handleBPS(){
    currentBPS = parseInt(document.getElementById("bpsScale").value);

    const s = payScales2022[currentBPS];
    const stage = document.getElementById("bpsStage");

    stage.innerHTML = "";

    for(let i=0;i<=s.maxStages;i++){
        let opt = document.createElement("option");
        opt.value = i;
        opt.textContent = "Stage " + i;
        stage.appendChild(opt);
    }

    stage.value = 0;
    document.getElementById("basicPay").value = s.min;

    calculate();
}

/* ---------------- STAGE ---------------- */
function handleStage(){
    const bps = currentBPS;
    const stage = parseInt(document.getElementById("bpsStage").value);

    const s = payScales2022[bps];

    document.getElementById("basicPay").value =
        s.min + (stage * s.incr);

    calculate();
}

/* ---------------- INPUT ---------------- */
function handleInput(){
    calculate();
}

/* ---------------- CALCULATION ---------------- */
function calculate(){

    const bps = currentBPS;
    const stage = parseInt(document.getElementById("bpsStage").value);

    const s22 = payScales2022[bps];
    const s26 = payScales2026[bps];

    const basic22 = s22.min + stage * s22.incr;
    const basic26 = s26.min + stage * s26.incr;

    const pp = parseFloat(document.getElementById("personalPay").value) || 0;

    const maxStage = stage === s22.maxStages;

    let pp22 = 0, pp26 = 0;

    if(maxStage && pp > 0){
        const steps = Math.round(pp / s22.incr);
        pp22 = steps * s22.incr;
        pp26 = steps * s26.incr;
    }

    const base22 = basic22 + pp22;
    const base26 = basic26 + pp26;

    const rate = (bps <= 16) ? 0.25 : 0.22;

    const adhocOld = base22 * rate;
    const adhocNew = base26 * rate;

    const adhoc2026 = base26 * 0.07;

    const totalIncrease = (adhocNew - adhocOld) + adhoc2026;

    const gpf = gpfRates[bps];
    const gpfDiff = gpf.new - gpf.old;

    const net = totalIncrease - gpfDiff;

    /* -------- UI UPDATE -------- */

    setText("tblBasicCurrent", basic22);
    setText("tblBasicNewVal", basic26);

    setText("tblAdhoc2024Current", adhocOld);
    setText("tblAdhoc2024New", adhocNew);

    setText("tblAdhoc2026New", adhoc2026);

    setText("tblTotalIncrease", totalIncrease);
    setText("tblGpfDiff", gpfDiff);
    setText("tblRealIncrease", net);

    setText("realIncreaseVal", net);
    setText("totalIncreaseVal", totalIncrease);
}

/* ---------------- HELPER ---------------- */
function setText(id,val){
    let el = document.getElementById(id);
    if(el) el.textContent = Math.round(val).toLocaleString();
}
