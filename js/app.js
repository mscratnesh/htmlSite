// Goal-based Investment Calculator logic
function setupGoalCalculator() {
    const form = document.getElementById('goal-form');
    const resultDiv = document.getElementById('goal-result');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const amount = parseFloat(document.getElementById('goal-amount').value);
        const years = parseInt(document.getElementById('goal-years').value);
        const rate = parseFloat(document.getElementById('goal-rate').value);
        const type = document.getElementById('goal-type').value;
        if (isNaN(amount) || isNaN(years) || isNaN(rate) || amount <= 0 || years <= 0 || rate <= 0) {
            resultDiv.textContent = 'Please enter valid values.';
            return;
        }
        let result = '';
        if (type === 'sip') {
            // SIP: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
            // Reverse: P = FV / [((1 + r)^n - 1) / r * (1 + r)]
            const months = years * 12;
            const monthlyRate = rate / 12 / 100;
            const factor = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
            const sip = amount / factor;
            result = `<div>Required Monthly SIP: <b>₹${sip.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
        } else {
            // Lump sum: FV = P * (1 + r)^n => P = FV / (1 + r)^n
            const lump = amount / Math.pow(1 + rate / 100, years);
            result = `<div>Required Lump Sum Investment: <b>₹${lump.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
        }
        resultDiv.innerHTML =
            `<div>Goal Amount: <b>₹${amount.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
            `<div>Years to Goal: <b>${years}</b></div>` +
            `<div>Expected Return: <b>${rate}% p.a.</b></div>` +
            result;
    };
}
function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(res => res.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
            if (page === 'review') {
                setupReviewForm();
            }
            if (page === 'calculators') {
                setupCalculatorCollapse();
            }
        })
        .catch(() => {
            document.getElementById("content").innerHTML = "<h3>Error loading page</h3>";
        });
}

window.loadPage = loadPage;

// Collapsible calculators logic
function setupCalculatorCollapse() {
    const btns = document.querySelectorAll('.collapse-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = btn.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isActive = btn.classList.contains('active');
            // Close all
            document.querySelectorAll('.collapse-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.collapse-content').forEach(c => c.classList.remove('active'));
            // Open this one if not already open
            if (!isActive) {
                btn.classList.add('active');
                content.classList.add('active');
                if (targetId === 'sip-calc') setupSIPCalculator();
                if (targetId === 'lump-calc') setupLumpCalculator();
                if (targetId === 'lumpsip-calc') setupLumpSIPCalculator();
                if (targetId === 'emi-calc') setupEMICalculator();
                if (targetId === 'emiadd-calc') setupEMIAddCalculator();
                if (targetId === 'tax-calc') setupTaxCalculator();
                if (targetId === 'cgt-calc') setupCGTCalculator();
                if (targetId === 'goal-calc') setupGoalCalculator();
                if (targetId === 'retire-calc') setupRetireCalculator();
                if (targetId === 'swp-calc') setupSWPCalculator();
            // SWP (Systematic Withdrawal Plan) Calculator logic
            function setupSWPCalculator() {
                const form = document.getElementById('swp-form');
                const resultDiv = document.getElementById('swp-result');
                if (!form) return;
                form.onsubmit = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const corpus = parseFloat(document.getElementById('swp-corpus').value);
                    const withdraw = parseFloat(document.getElementById('swp-withdraw').value);
                    const rate = parseFloat(document.getElementById('swp-rate').value);
                    const years = parseInt(document.getElementById('swp-years').value);
                    if (isNaN(corpus) || isNaN(withdraw) || isNaN(rate) || isNaN(years) || corpus <= 0 || withdraw <= 0 || rate <= 0 || years <= 0) {
                        resultDiv.textContent = 'Please enter valid values.';
                        return;
                    }
                    // Calculate if corpus will last for the period
                    let balance = corpus;
                    const months = years * 12;
                    const monthlyRate = rate / 12 / 100;
                    let depletedMonth = null;
                    for (let m = 1; m <= months; m++) {
                        balance = balance * (1 + monthlyRate) - withdraw;
                        if (balance < 0 && !depletedMonth) {
                            depletedMonth = m;
                            break;
                        }
                    }
                    let result = '';
                    if (depletedMonth) {
                        const y = Math.floor((depletedMonth - 1) / 12);
                        const mo = (depletedMonth - 1) % 12;
                        result = `<div style='color:#c00;'><b>Corpus will be depleted in ${y} years ${mo} months.</b></div>`;
                    } else {
                        result = `<div style='color:green;'><b>Corpus will last for ${years} years.</b></div>` +
                            `<div>Estimated Final Balance: <b>₹${balance.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
                    }
                    resultDiv.innerHTML =
                        `<div>Initial Corpus: <b>₹${corpus.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Monthly Withdrawal: <b>₹${withdraw.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Expected Return: <b>${rate}% p.a.</b></div>` +
                        `<div>Planned Period: <b>${years} years</b></div>` +
                        result;
                };
            }
            // Retirement Corpus Calculator logic
            function setupRetireCalculator() {
                const form = document.getElementById('retire-form');
                const resultDiv = document.getElementById('retire-result');
                if (!form) return;
                form.onsubmit = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const age = parseInt(document.getElementById('retire-age').value);
                    const retireAge = parseInt(document.getElementById('retire-retire').value);
                    const life = parseInt(document.getElementById('retire-life').value);
                    const exp = parseFloat(document.getElementById('retire-exp').value);
                    const infl = parseFloat(document.getElementById('retire-infl').value);
                    const rate = parseFloat(document.getElementById('retire-rate').value);
                    if (isNaN(age) || isNaN(retireAge) || isNaN(life) || isNaN(exp) || isNaN(infl) || isNaN(rate) || age < 18 || retireAge <= age || life <= retireAge || exp <= 0 || infl <= 0 || rate <= 0) {
                        resultDiv.textContent = 'Please enter valid values.';
                        return;
                    }
                    // Years to retirement and years in retirement
                    const yearsToRetire = retireAge - age;
                    const yearsRetired = life - retireAge;
                    // Inflate expenses to retirement year
                    const expAtRetire = exp * Math.pow(1 + infl / 100, yearsToRetire);
                    // Annualize
                    const annualExp = expAtRetire * 12;
                    // Corpus needed: PV of annuity due (expenses at start of each year)
                    const r = rate / 100;
                    const n = yearsRetired;
                    // PV = Pmt * [(1 - (1 + r)^-n) / r] * (1 + r)
                    const corpus = annualExp * ((1 - Math.pow(1 + r, -n)) / r) * (1 + r);
                    resultDiv.innerHTML =
                        `<div>Monthly Expenses at Retirement: <b>₹${expAtRetire.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Years in Retirement: <b>${yearsRetired}</b></div>` +
                        `<div>Required Retirement Corpus: <b>₹${corpus.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
                };
            }
            // Capital Gains Tax Calculator logic
            function setupCGTCalculator() {
                const form = document.getElementById('cgt-form');
                const resultDiv = document.getElementById('cgt-result');
                if (!form) return;
                form.onsubmit = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const type = document.getElementById('cgt-type').value;
                    const buy = parseFloat(document.getElementById('cgt-buy').value);
                    const sell = parseFloat(document.getElementById('cgt-sell').value);
                    const years = parseFloat(document.getElementById('cgt-years').value);
                    const exp = parseFloat(document.getElementById('cgt-exp').value);
                    if (isNaN(buy) || isNaN(sell) || isNaN(years) || isNaN(exp) || buy < 0 || sell < 0 || years < 0 || exp < 0 || sell < buy) {
                        resultDiv.textContent = 'Please enter valid values.';
                        return;
                    }
                    let gain = sell - buy - exp;
                    let tax = 0, details = '', slab = '';
                    if (type === 'stock' || type === 'equity-mf') {
                        if (years >= 1) {
                            // LTCG: 10% above ₹1L
                            slab = 'Long Term';
                            let taxable = Math.max(0, gain - 100000);
                            tax = taxable * 0.10;
                            details = `LTCG above ₹1L taxed at 10%`;
                        } else {
                            // STCG: 15%
                            slab = 'Short Term';
                            tax = gain * 0.15;
                            details = `STCG taxed at 15%`;
                        }
                    } else if (type === 'debt-mf') {
                        if (years >= 3) {
                            // LTCG: slab rate (from FY24, else 20% with indexation)
                            slab = 'Long Term';
                            tax = gain * 0.30;
                            details = `LTCG taxed at slab rate (assumed 30% for demo)`;
                        } else {
                            // STCG: slab rate
                            slab = 'Short Term';
                            tax = gain * 0.30;
                            details = `STCG taxed at slab rate (assumed 30% for demo)`;
                        }
                    } else if (type === 'property') {
                        if (years >= 2) {
                            // LTCG: 20% with indexation (indexation not implemented here)
                            slab = 'Long Term';
                            tax = gain * 0.20;
                            details = `LTCG taxed at 20% (indexation not included)`;
                        } else {
                            // STCG: slab rate
                            slab = 'Short Term';
                            tax = gain * 0.30;
                            details = `STCG taxed at slab rate (assumed 30% for demo)`;
                        }
                    }
                    if (gain <= 0) {
                        resultDiv.innerHTML = `<div>No capital gain.</div>`;
                        return;
                    }
                    resultDiv.innerHTML =
                        `<div>Capital Gain Type: <b>${slab}</b></div>` +
                        `<div>Net Capital Gain: <b>₹${gain.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Tax Payable: <b>₹${tax.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div style='font-size:0.95em;color:#888;margin-top:0.5em;'>${details}</div>`;
                };
            }
            // Income Tax Calculator logic
            function setupTaxCalculator() {
                const form = document.getElementById('tax-form');
                const resultDiv = document.getElementById('tax-result');
                if (!form) return;
                form.onsubmit = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const income = parseFloat(document.getElementById('tax-income').value);
                    const deduction80C = parseFloat(document.getElementById('tax-deduction').value);
                    const medical = parseFloat(document.getElementById('tax-medical').value);
                    const hra = parseFloat(document.getElementById('tax-hra').value);
                    const rent = parseFloat(document.getElementById('tax-rent').value);
                    const pf = parseFloat(document.getElementById('tax-pf').value);
                    const age = document.getElementById('tax-age').value;
                    // Calculate HRA exemption (basic, simplified):
                    // Least of: (i) Actual HRA received, (ii) 50% salary (metro) or 40% (non-metro), (iii) Rent paid - 10% salary
                    // For simplicity, use: min(HRA received, Rent paid - 10% of income, 0 if negative)
                    let hraExempt = 0;
                    if (hra > 0 && rent > 0) {
                        hraExempt = Math.max(0, Math.min(hra, rent - 0.1 * income));
                    }
                    // 80C max 1.5L, 80D max 25k (50k for senior), PF no max, HRA as above
                    let max80C = 150000;
                    let max80D = (age === 'senior' || age === 'super') ? 50000 : 25000;
                    let ded80C = Math.min(deduction80C, max80C);
                    let ded80D = Math.min(medical, max80D);
                    let totalDed = ded80C + ded80D + pf + hraExempt;
                    if (isNaN(income) || isNaN(deduction80C) || isNaN(medical) || isNaN(hra) || isNaN(rent) || isNaN(pf) || income < 0 || deduction80C < 0 || medical < 0 || hra < 0 || rent < 0 || pf < 0 || totalDed > income) {
                        resultDiv.textContent = 'Please enter valid values.';
                        return;
                    }
                    // Old Regime
                    const taxableOld = Math.max(0, income - totalDed);
                    let slabsOld;
                    if (age === 'normal') {
                        slabsOld = [
                            { upto: 250000, rate: 0 },
                            { upto: 500000, rate: 0.05 },
                            { upto: 1000000, rate: 0.2 },
                            { upto: Infinity, rate: 0.3 }
                        ];
                    } else if (age === 'senior') {
                        slabsOld = [
                            { upto: 300000, rate: 0 },
                            { upto: 500000, rate: 0.05 },
                            { upto: 1000000, rate: 0.2 },
                            { upto: Infinity, rate: 0.3 }
                        ];
                    } else {
                        slabsOld = [
                            { upto: 500000, rate: 0 },
                            { upto: 1000000, rate: 0.2 },
                            { upto: Infinity, rate: 0.3 }
                        ];
                    }
                    let taxOld = 0, prevOld = 0;
                    for (let i = 0; i < slabsOld.length; i++) {
                        if (taxableOld > slabsOld[i].upto) {
                            taxOld += (slabsOld[i].upto - prevOld) * slabsOld[i].rate;
                            prevOld = slabsOld[i].upto;
                        } else {
                            taxOld += (taxableOld - prevOld) * slabsOld[i].rate;
                            break;
                        }
                    }
                    // 87A rebate for old regime
                    if ((age === 'normal' && taxableOld <= 500000) || (age === 'senior' && taxableOld <= 500000) || (age === 'super' && taxableOld <= 500000)) {
                        taxOld = 0;
                    }
                    let cessOld = taxOld * 0.04;
                    let totalOld = taxOld + cessOld;

                    // New Regime (FY 2023-24)
                    // No deductions allowed except NPS, employer contribution, and standard deduction (₹50,000 for salaried)
                    // For simplicity, allow only standard deduction
                    let stdDed = 50000;
                    const taxableNew = Math.max(0, income - stdDed);
                    const slabsNew = [
                        { upto: 300000, rate: 0 },
                        { upto: 600000, rate: 0.05 },
                        { upto: 900000, rate: 0.1 },
                        { upto: 1200000, rate: 0.15 },
                        { upto: 1500000, rate: 0.2 },
                        { upto: Infinity, rate: 0.3 }
                    ];
                    let taxNew = 0, prevNew = 0;
                    for (let i = 0; i < slabsNew.length; i++) {
                        if (taxableNew > slabsNew[i].upto) {
                            taxNew += (slabsNew[i].upto - prevNew) * slabsNew[i].rate;
                            prevNew = slabsNew[i].upto;
                        } else {
                            taxNew += (taxableNew - prevNew) * slabsNew[i].rate;
                            break;
                        }
                    }
                    // 87A rebate for new regime (up to ₹7L)
                    if (taxableNew <= 700000) {
                        taxNew = 0;
                    }
                    let cessNew = taxNew * 0.04;
                    let totalNew = taxNew + cessNew;

                    // Display side by side
                    resultDiv.innerHTML =
                        `<div style='min-width:270px;max-width:340px;border:1px solid #ccc;padding:1em;border-radius:8px;'>
                            <div style='font-weight:600;font-size:1.1em;margin-bottom:0.5em;'>Old Regime</div>
                            <div>Taxable Income: <b>₹${taxableOld.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                            <div>Income Tax: <b>₹${taxOld.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                            <div>Health & Education Cess (4%): <b>₹${cessOld.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                            <div>Total Tax Payable: <b>₹${totalOld.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                            <div style='font-size:0.95em;color:#888;margin-top:0.5em;'>Deductions claimed: ₹${deduction.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                        </div>` +
                        `<div style='min-width:270px;max-width:340px;border:1px solid #ccc;padding:1em;border-radius:8px;'>
                            <div style='font-weight:600;font-size:1.1em;margin-bottom:0.5em;'>New Regime</div>
                            <div>Taxable Income: <b>₹${taxableNew.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                            <div>Income Tax: <b>₹${taxNew.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                            <div>Health & Education Cess (4%): <b>₹${cessNew.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                            <div>Total Tax Payable: <b>₹${totalNew.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                            <div style='font-size:0.95em;color:#888;margin-top:0.5em;'>Standard deduction: ₹50,000</div>
                            <div style='font-size:0.95em;color:#888;'>Other deductions not allowed</div>
                        </div>`;
                };
            }
            // EMI with Additional Payment Calculator logic
            function setupEMIAddCalculator() {
                const form = document.getElementById('emiadd-form');
                const resultDiv = document.getElementById('emiadd-result');
                if (!form) return;
                form.onsubmit = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const principal = parseFloat(document.getElementById('emiadd-principal').value);
                    const rate = parseFloat(document.getElementById('emiadd-rate').value);
                    const years = parseInt(document.getElementById('emiadd-years').value);
                    const extra = parseFloat(document.getElementById('emiadd-extra').value);
                    if (isNaN(principal) || isNaN(rate) || isNaN(years) || isNaN(extra) || principal <= 0 || rate <= 0 || years <= 0 || extra < 0) {
                        resultDiv.textContent = 'Please enter valid values.';
                        return;
                    }
                    const n = years * 12;
                    const r = rate / 12 / 100;
                    let balance = principal;
                    let totalInterest = 0;
                    let month = 0;
                    const emi = balance * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
                    while (balance > 0.1 && month < 1000) {
                        month++;
                        let interest = balance * r;
                        let principalPaid = emi - interest;
                        balance -= principalPaid;
                        // Apply extra payment at the end of each year
                        if (month % 12 === 0 && extra > 0) {
                            balance -= extra;
                        }
                        totalInterest += interest;
                        if (balance < 0) balance = 0;
                    }
                    const totalPaid = emi * month + extra * Math.floor(month / 12);
                    resultDiv.innerHTML =
                        `<div>Monthly EMI: <b>₹${emi.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Total Payment: <b>₹${totalPaid.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Total Interest: <b>₹${totalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Loan Paid Off In: <b>${Math.floor(month/12)} years ${month%12} months</b></div>`;
                };
            }
            // EMI Calculator logic
            function setupEMICalculator() {
                const form = document.getElementById('emi-form');
                const resultDiv = document.getElementById('emi-result');
                if (!form) return;
                form.onsubmit = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const principal = parseFloat(document.getElementById('emi-principal').value);
                    const rate = parseFloat(document.getElementById('emi-rate').value);
                    const years = parseInt(document.getElementById('emi-years').value);
                    if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0 || rate <= 0 || years <= 0) {
                        resultDiv.textContent = 'Please enter valid values.';
                        return;
                    }
                    const n = years * 12;
                    const r = rate / 12 / 100;
                    const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
                    const total = emi * n;
                    const interest = total - principal;
                    resultDiv.innerHTML =
                        `<div>Monthly EMI: <b>₹${emi.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Total Payment: <b>₹${total.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                        `<div>Total Interest: <b>₹${interest.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
                };
            }
            }
        // Lump Sum + SIP Calculator logic
        function setupLumpSIPCalculator() {
            const form = document.getElementById('lumpsip-form');
            const resultDiv = document.getElementById('lumpsip-result');
            if (!form) return;
            form.onsubmit = function(e) {
                e.preventDefault();
                e.stopPropagation();
                const lump = parseFloat(document.getElementById('lumpsip-lump').value);
                const sip = parseFloat(document.getElementById('lumpsip-sip').value);
                const rate = parseFloat(document.getElementById('lumpsip-rate').value);
                const years = parseInt(document.getElementById('lumpsip-years').value);
                if (isNaN(lump) || isNaN(sip) || isNaN(rate) || isNaN(years) || lump < 0 || sip < 0 || rate <= 0 || years <= 0) {
                    resultDiv.textContent = 'Please enter valid values.';
                    return;
                }
                // Lump sum FV
                const lumpFV = lump * Math.pow(1 + rate / 100, years);
                // SIP FV
                const months = years * 12;
                const monthlyRate = rate / 12 / 100;
                const sipFV = sip * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
                const invested = lump + (sip * months);
                const totalFV = lumpFV + sipFV;
                const gain = totalFV - invested;
                resultDiv.innerHTML =
                    `<div>Total Invested: <b>₹${invested.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                    `<div>Estimated Value: <b>₹${totalFV.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                    `<div>Estimated Gain: <b>₹${gain.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
            };
        }
        // Lump Sum Calculator logic
        function setupLumpCalculator() {
            const form = document.getElementById('lump-form');
            const resultDiv = document.getElementById('lump-result');
            if (!form) return;
            form.onsubmit = function(e) {
                e.preventDefault();
                e.stopPropagation();
                const amount = parseFloat(document.getElementById('lump-amount').value);
                const rate = parseFloat(document.getElementById('lump-rate').value);
                const years = parseInt(document.getElementById('lump-years').value);
                if (isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate <= 0 || years <= 0) {
                    resultDiv.textContent = 'Please enter valid values.';
                    return;
                }
                // Lump sum formula: FV = P * (1 + r)^n
                const fv = amount * Math.pow(1 + rate / 100, years);
                const gain = fv - amount;
                resultDiv.innerHTML =
                    `<div>Invested Amount: <b>₹${amount.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                    `<div>Estimated Value: <b>₹${fv.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
                    `<div>Estimated Gain: <b>₹${gain.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
            };
        }
        });
    });
}

// SIP Calculator logic
function setupSIPCalculator() {
    const form = document.getElementById('sip-form');
    const resultDiv = document.getElementById('sip-result');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const amount = parseFloat(document.getElementById('sip-amount').value);
        const rate = parseFloat(document.getElementById('sip-rate').value);
        const years = parseInt(document.getElementById('sip-years').value);
        if (isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate <= 0 || years <= 0) {
            resultDiv.textContent = 'Please enter valid values.';
            return;
        }
        // SIP formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
        const months = years * 12;
        const monthlyRate = rate / 12 / 100;
        const fv = amount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        const invested = amount * months;
        const gain = fv - invested;
        resultDiv.innerHTML =
            `<div>Total Invested: <b>₹${invested.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
            `<div>Estimated Value: <b>₹${fv.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
            `<div>Estimated Gain: <b>₹${gain.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
    };
}


document.addEventListener('DOMContentLoaded', function() {
    loadPage('home');
});

// SheetDB API integration for review form
function setupReviewForm() {
    const reviewForm = document.getElementById('review-form');
    const reviewMessage = document.getElementById('review-message');
    const reviewsList = document.getElementById('reviews');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let allReviews = [];
    let carouselIndex = 0;

    // Fetch and display reviews from SheetDB
    function fetchReviewsFromSheetDB() {
        fetch('https://sheetdb.io/api/v1/1b0can2pr0h1a')
            .then(response => response.json())
            .then(data => {
                allReviews = [];
                for (let i = data.length - 1; i >= 0; i--) {
                    const row = data[i];
                    if (row.Name && row.Review) {
                        allReviews.push(row);
                    }
                }
                carouselIndex = 0;
                renderCarousel();
            })
            .catch(error => {
                reviewsList.innerHTML = `<div class="review-card">Error fetching reviews: ${error}</div>`;
            });

    }

    function renderCarousel() {
        reviewsList.innerHTML = '';
        if (allReviews.length === 0) {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.textContent = 'No reviews found.';
            reviewsList.appendChild(card);
            return;
        }
        for (let i = carouselIndex; i < carouselIndex + 3 && i < allReviews.length; i++) {
            const row = allReviews[i];
            let stars = '';
            if (row.Rating) {
                const rating = Math.max(1, Math.min(5, parseInt(row.Rating)));
                stars = '<span class="review-stars">' + '★'.repeat(rating) + '☆'.repeat(5 - rating) + '</span>';
            }
            let date = '';
            if (row.Timestamp) {
                date = `<div class="review-date">${row.Timestamp}</div>`;
            }
            let email = '';
            if (row.email) {
                email = `<div class="review-email">${row.email}</div>`;
            }
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="review-name">${row.Name}</div>
                ${email}
                ${date}
                <div class="review-text">${row.Review}</div>
                ${stars}
            `;
            reviewsList.appendChild(card);
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.onclick = function() {
            if (carouselIndex - 3 >= 0) {
                carouselIndex -= 3;
                renderCarousel();
            }
        };
        nextBtn.onclick = function() {
            if (carouselIndex + 3 < allReviews.length) {
                carouselIndex += 3;
                renderCarousel();
            }
        };
    }
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const reviewer = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const review = document.getElementById('review').value.trim();
            const rating = document.querySelector('input[name="rating"]:checked')?.value;
            if (reviewer && email && phone && review && rating) {
                const data = {
                    Name: reviewer,
                    Email: email,
                    Phone: phone,
                    Review: review,
                    Rating: rating
                };
                fetch('https://sheetdb.io/api/v1/1b0can2pr0h1a', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data })
                })
                    .then(response => {
                        if (response.ok) {
                            reviewMessage.textContent = 'Thank you for your review!';
                            reviewForm.reset();
                            setTimeout(fetchReviewsFromSheetDB, 2000);
                        } else {
                            reviewMessage.textContent = 'There was an error submitting your review. Please try again later.';
                        }
                    })
                    .catch(() => {
                        reviewMessage.textContent = 'There was an error submitting your review. Please try again later.';
                    });
            } else {
                reviewMessage.textContent = 'Please fill in all fields.';
            }
        });
        fetchReviewsFromSheetDB();
    }
}
