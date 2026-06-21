// =======================
// SAFETY: WAIT FOR PAGE
// =======================
window.addEventListener("DOMContentLoaded", function () {
    init();
});

// =======================
// GLOBAL DATA
// =======================
const payScales2022 = { /* KEEP YOUR EXISTING DATA */ };
const payScales2026 = { /* KEEP YOUR EXISTING DATA */ };
const gpfRates = { /* KEEP YOUR EXISTING DATA */ };

// =======================
// INIT FUNCTION
// =======================
function init() {
    const bpsSelect = document.getElementById("bpsScale");
    const stageSelect = document.getElementById("bpsStage");

    if (!bpsSelect || !stageSelect) {
        console.error("Missing HTML elements (bpsScale or bpsStage)");
        return;
    }

    bpsSelect.addEventListener("change", handleBpsChange);

    handleBpsChange(); // load default
}

// =======================
// FORMAT
// =======================
function formatCurrency(val) {
    return Number(val).toLocaleString();
}

// =======================
// BPS CHANGE
// =======================
function handleBpsChange() {
    const bps = parseInt(document.getElementById("bpsScale").value);

    const scale2022 = payScales2022[bps];
    const scale2026 = payScales2026[bps];

    const stageSelect = document.getElementById("bpsStage");
    stageSelect.innerHTML = "";

    for (let i = 0; i <= scale2022.maxStages; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `Stage ${i} - ${formatCurrency(scale2022.min + i * scale2022.incr)}`;
        stageSelect.appendChild(opt);
    }

    document.getElementById("basicPay").value = scale2022.min;

    calculateSalary();
}

// =======================
// STAGE CHANGE
// =======================
function handleStageChange() {
    const bps = parseInt(document.getElementById("bpsScale").value);
    const stage = parseInt(document.getElementById("bpsStage").value);

    const scale = payScales2022[bps];

    document.getElementById("basicPay").value =
        scale.min + stage * scale.incr;

    calculateSalary();
}

// =======================
// BASIC INPUT
// =======================
function handleBasicInput() {
    calculateSalary();
}

// =======================
// PERSONAL PAY
// =======================
function handlePPInput() {
    calculateSalary();
}

// =======================
// MAIN CALCULATION
// =======================
function calculateSalary() {

    const bps = parseInt(document.getElementById("bpsScale").value);
    const stage = parseInt(document.getElementById("bpsStage").value);

    const scale2022 = payScales2022[bps];
    const scale2026 = payScales2026[bps];

    const basic2022 = scale2022.min + stage * scale2022.incr;
    const basic2026 = scale2026.min + stage * scale2026.incr;

    const pp = parseFloat(document.getElementById("personalPay")?.value || 0);

    const base2022 = basic2022 + pp;
    const base2026 = basic2026 + pp;

    const adhoc2024 = base2026 * 0.25;
    const adhoc2026 = base2026 * 0.07;

    const totalIncrease = adhoc2024 + adhoc2026;

    const gpf = gpfRates[bps];
    const gpfDiff = gpf.newGpf - gpf.oldGpf;

    const net = totalIncrease - gpfDiff;

    // OUTPUT FIX (safe)
    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = formatCurrency(val);
    };

    set("tblBasicCurrent", basic2022);
    set("tblBasicNewVal", basic2026);
    set("tblAdhoc2024New", adhoc2024);
    set("tblAdhoc2026New", adhoc2026);
    set("tblTotalIncrease", totalIncrease);
    set("tblRealIncrease", net);

    set("realIncreaseVal", net);
    set("totalIncreaseVal", totalIncrease);
    set("gpfIncreaseVal", gpfDiff);
}

// =======================
// CHART
// =======================
function openChartModal() {
    const modal = document.getElementById("chartModal");
    if (modal) modal.style.display = "block";
}

function closeChartModal() {
    const modal = document.getElementById("chartModal");
    if (modal) modal.style.display = "none";
}

function printChart() {
    window.print();
}
