// ==========================================
// SALARY CALCULATOR 2026
// ORIGINAL SCALE DATA
// ==========================================

const payScales2022 = {
    1: { min: 13550, incr: 430, max: 26450, maxStages: 30 },
    2: { min: 13820, incr: 490, max: 28520, maxStages: 30 },
    3: { min: 14260, incr: 580, max: 31660, maxStages: 30 },
    4: { min: 14690, incr: 660, max: 34490, maxStages: 30 },
    5: { min: 15230, incr: 750, max: 37730, maxStages: 30 },
    6: { min: 15760, incr: 840, max: 40960, maxStages: 30 },
    7: { min: 16310, incr: 910, max: 43610, maxStages: 30 },
    8: { min: 16890, incr: 1000, max: 46890, maxStages: 30 },
    9: { min: 17470, incr: 1090, max: 50170, maxStages: 30 },
    10: { min: 18050, incr: 1190, max: 53750, maxStages: 30 },
    11: { min: 18650, incr: 1310, max: 57950, maxStages: 30 },
    12: { min: 19770, incr: 1430, max: 62670, maxStages: 30 },
    13: { min: 21160, incr: 1560, max: 67960, maxStages: 30 },
    14: { min: 22530, incr: 1740, max: 74730, maxStages: 30 },
    15: { min: 23920, incr: 1980, max: 83320, maxStages: 30 },
    16: { min: 28070, incr: 2260, max: 95870, maxStages: 30 },
    17: { min: 45070, incr: 3420, max: 113470, maxStages: 20 },
    18: { min: 56880, incr: 4260, max: 142080, maxStages: 20 },
    19: { min: 87840, incr: 4530, max: 178440, maxStages: 20 },
    20: { min: 102470, incr: 6690, max: 196130, maxStages: 14 },
    21: { min: 113790, incr: 7420, max: 217670, maxStages: 14 },
    22: { min: 122190, incr: 8710, max: 244130, maxStages: 14 }
};

const payScales2026 = {
    1: { min: 16280, incr: 540, max: 32480, maxStages: 30 },
    2: { min: 16660, incr: 620, max: 35260, maxStages: 30 },
    3: { min: 17130, incr: 730, max: 39030, maxStages: 30 },
    4: { min: 17650, incr: 830, max: 42550, maxStages: 30 },
    5: { min: 18300, incr: 940, max: 46500, maxStages: 30 },
    6: { min: 18930, incr: 1050, max: 50430, maxStages: 30 },
    7: { min: 19590, incr: 1140, max: 53790, maxStages: 30 },
    8: { min: 20290, incr: 1250, max: 57790, maxStages: 30 },
    9: { min: 20990, incr: 1370, max: 62090, maxStages: 30 },
    10: { min: 21680, incr: 1490, max: 66380, maxStages: 30 },
    11: { min: 22410, incr: 1640, max: 71610, maxStages: 30 },
    12: { min: 23750, incr: 1790, max: 77450, maxStages: 30 },
    13: { min: 25420, incr: 1950, max: 83920, maxStages: 30 },
    14: { min: 27060, incr: 2180, max: 92460, maxStages: 30 },
    15: { min: 28730, incr: 2480, max: 103130, maxStages: 30 },
    16: { min: 33720, incr: 2830, max: 118620, maxStages: 30 },
    17: { min: 54140, incr: 4280, max: 139740, maxStages: 20 },
    18: { min: 68330, incr: 5330, max: 174930, maxStages: 20 },
    19: { min: 105510, incr: 5670, max: 218910, maxStages: 20 },
    20: { min: 123090, incr: 8370, max: 240270, maxStages: 14 },
    21: { min: 136680, incr: 9280, max: 266600, maxStages: 14 },
    22: { min: 146770, incr: 10890, max: 299230, maxStages: 14 }
};

const gpfRates = {
    1: { oldGpf: 600, newGpf: 730 },
    2: { oldGpf: 1060, newGpf: 1280 },
    3: { oldGpf: 1150, newGpf: 1390 },
    4: { oldGpf: 1239, newGpf: 1490 },
    5: { oldGpf: 1330, newGpf: 1600 },
    6: { oldGpf: 1420, newGpf: 1710 },
    7: { oldGpf: 1500, newGpf: 1810 },
    8: { oldGpf: 1600, newGpf: 1930 },
    9: { oldGpf: 1700, newGpf: 2040 },
    10: { oldGpf: 1800, newGpf: 2160 },
    11: { oldGpf: 1920, newGpf: 2310 },
    12: { oldGpf: 3300, newGpf: 3970 },
    13: { oldGpf: 3570, newGpf: 4290 },
    14: { oldGpf: 3900, newGpf: 4680 },
    15: { oldGpf: 4290, newGpf: 5160 },
    16: { oldGpf: 4960, newGpf: 5970 },
    17: { oldGpf: 6350, newGpf: 7620 },
    18: { oldGpf: 7960, newGpf: 9570 },
    19: { oldGpf: 10660, newGpf: 12810 },
    20: { oldGpf: 11950, newGpf: 14350 },
    21: { oldGpf: 13260, newGpf: 15930 },
    22: { oldGpf: 14660, newGpf: 17610 }
};

function formatCurrency(num) {
    return Number(num).toLocaleString('en-PK');
}
// ==========================================
// PAGE INITIALIZATION
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
    handleBpsChange();

    const bpsSelect = document.getElementById('bpsScale');
    const stageSelect = document.getElementById('bpsStage');

    if (bpsSelect) {
        bpsSelect.addEventListener('change', handleBpsChange);
    }

    if (stageSelect) {
        stageSelect.addEventListener('change', calculateSalary);
    }
});

// ==========================================
// BPS CHANGE
// ==========================================

function handleBpsChange() {

    const bps = parseInt(document.getElementById('bpsScale').value);

    const scale2022 = payScales2022[bps];
    const scale2026 = payScales2026[bps];

    if (!scale2022 || !scale2026) return;

    const stageSelect = document.getElementById('bpsStage');

    stageSelect.innerHTML = '';

    for (let i = 0; i <= scale2022.maxStages; i++) {

        const option = document.createElement('option');

        option.value = i;

        if (i === 0) {
            option.textContent =
                `Stage 0 (Rs. ${formatCurrency(scale2022.min)})`;
        } else {
            option.textContent =
                `Stage ${i} (Rs. ${formatCurrency(scale2022.min + (i * scale2022.incr))})`;
        }

        stageSelect.appendChild(option);
    }

    updateScaleInfo(scale2022, scale2026);

    calculateSalary();
}

// ==========================================
// SCALE INFO
// ==========================================

function updateScaleInfo(scale2022, scale2026) {

    const min2022 = document.getElementById('infoMin2022');
    const min2026 = document.getElementById('infoMin2026');

    const incr2022 = document.getElementById('infoIncr2022');
    const incr2026 = document.getElementById('infoIncr2026');

    const max2022 = document.getElementById('infoMax2022');
    const max2026 = document.getElementById('infoMax2026');

    if (min2022) min2022.textContent = formatCurrency(scale2022.min);
    if (min2026) min2026.textContent = formatCurrency(scale2026.min);

    if (incr2022) incr2022.textContent = formatCurrency(scale2022.incr);
    if (incr2026) incr2026.textContent = formatCurrency(scale2026.incr);

    if (max2022) max2022.textContent = formatCurrency(scale2022.max);
    if (max2026) max2026.textContent = formatCurrency(scale2026.max);
}

// ==========================================
// PLACEHOLDER CALCULATOR
// ==========================================

function calculateSalary() {

    const bps =
        parseInt(document.getElementById('bpsScale').value);

    const stage =
        parseInt(document.getElementById('bpsStage').value);

    const scale2022 = payScales2022[bps];
    const scale2026 = payScales2026[bps];

    if (!scale2022 || !scale2026) return;

    const basic2022 =
        scale2022.min + (stage * scale2022.incr);

    const basic2026 =
        scale2026.min + (stage * scale2026.incr);

    const resultBox =
        document.getElementById('result');

    if (resultBox) {

        resultBox.innerHTML = `
            <h3>Calculation Preview</h3>

            <p><strong>BPS:</strong> ${bps}</p>

            <p><strong>Stage:</strong> ${stage}</p>

            <p><strong>Basic Pay 2022:</strong>
            Rs. ${formatCurrency(basic2022)}</p>

            <p><strong>Basic Pay 2026:</strong>
            Rs. ${formatCurrency(basic2026)}</p>

            <p><strong>Difference:</strong>
            Rs. ${formatCurrency(basic2026 - basic2022)}</p>
        `;
    }
}
