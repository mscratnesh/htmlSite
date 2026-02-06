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
const seoConfig = {
    "new-home": {
        title: "Let Money Earn | Home",
        description: "Financial education, mutual funds, trading strategies, and practical tools to grow your wealth.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Services",
            "itemListElement": [
                { "@type": "Service", "name": "Mutual Fund Distribution" },
                { "@type": "Service", "name": "Insurance" },
                { "@type": "Service", "name": "Bonds & NCDs" },
                { "@type": "Service", "name": "Medical Insurance" },
                { "@type": "Service", "name": "Share Market & FnO Classes" }
            ]
        }
    },
    "learn-with-me": {
        title: "Learn With Me | Let Money Earn",
        description: "Explore practical lessons and resources to master investing and trading.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Learn With Me",
            "description": "Practical lessons, strategies, and resources to master investing and trading.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "technical-analysis": {
        title: "Technical Analysis | Let Money Earn",
        description: "Learn chart patterns, indicators, and price action strategies.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Technical Analysis",
            "description": "Chart patterns, indicators, and price action strategies.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "fundamental-analysis-new": {
        title: "Fundamental Analysis | Let Money Earn",
        description: "Financial statements, ratios, and company valuation fundamentals.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Fundamental Analysis",
            "description": "Financial statements, ratios, and company valuation fundamentals.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "trading-strategies": {
        title: "Trading Strategies | Let Money Earn",
        description: "Intraday, swing, and positional trading techniques and setups.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Trading Strategies",
            "description": "Intraday, swing, and positional trading techniques and setups.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "risk-management": {
        title: "Risk Management | Let Money Earn",
        description: "Position sizing, stop losses, and portfolio protection techniques.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Risk Management",
            "description": "Position sizing, stop losses, and portfolio protection techniques.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "options-trading": {
        title: "Options Trading | Let Money Earn",
        description: "Learn options basics, Greeks, and practical strategies.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Options Trading",
            "description": "Options basics, Greeks, and practical strategies.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "portfolio-building": {
        title: "Portfolio Building | Let Money Earn",
        description: "Diversification, allocation, and long-term portfolio growth.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Portfolio Building",
            "description": "Diversification, allocation, and long-term portfolio growth.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "services": {
        title: "Services | Let Money Earn",
        description: "Mutual fund distribution, insurance, medical insurance, and market classes.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Services",
            "itemListElement": [
                { "@type": "Service", "name": "Mutual Fund Distribution" },
                { "@type": "Service", "name": "Insurance" },
                { "@type": "Service", "name": "Bonds & NCDs" },
                { "@type": "Service", "name": "Medical Insurance" },
                { "@type": "Service", "name": "Share Market & FnO Classes" }
            ]
        }
    },
    "option-wheel": {
        title: "Option Wheel Strategy | Let Money Earn",
        description: "Learn the Options Wheel Strategy for systematic income using cash-secured puts and covered calls.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Option Wheel Strategy",
            "description": "Systematic options strategy using cash-secured puts and covered calls.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "moving-average-conversion": {
        title: "Moving Average Conversion | Let Money Earn",
        description: "Multi-SMA crossover system using 5, 10, 50, and 250 day averages for delivery trading.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Moving Average Conversion",
            "description": "SMA crossover system using 5, 10, 50, and 250 day moving averages.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "MF": {
        title: "Mutual Funds | Let Money Earn",
        description: "Learn mutual fund basics, how they work, and key investment factors.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Mutual Funds Basics",
            "description": "Mutual fund basics, working, and key investment factors.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "types-of-fund": {
        title: "Types of Mutual Funds | Let Money Earn",
        description: "Explore equity, debt, hybrid, and solution-oriented mutual fund types in India.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Types of Mutual Funds",
            "description": "Equity, debt, hybrid, and solution-oriented mutual fund types in India.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "contact": {
        title: "Contact | Let Money Earn",
        description: "Get in touch with Ratnesh Kumar Singh for guidance and enrollment.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact",
            "url": "https://www.letmoneyearn.in/pages/contact.html"
        }
    },
    "momentum-investing": {
        title: "Momentum Investing | Let Money Earn",
        description: "Sharpe Ratio momentum strategy using Nifty 500 ranking and monthly rebalancing.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Momentum Investing",
            "description": "Sharpe Ratio momentum strategy with Nifty 500 ranking and monthly rebalancing.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "bori-system": {
        title: "Bori System (LIFO) | Let Money Earn",
        description: "Rule-based algorithmic trading using LIFO discipline for crude oil futures.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Bori System (LIFO)",
            "description": "LIFO-based algorithmic trading strategy for crude oil futures.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "0dte-option-selling": {
        title: "0DTE Option Selling | Let Money Earn",
        description: "Same-day expiry options selling strategy with strict risk controls.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "0DTE Option Selling",
            "description": "Expiry-day options selling strategy with theta decay capture and risk management.",
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "review": {
        title: "Reviews | Let Money Earn",
        description: "Read and share reviews about Let Money Earn.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Reviews",
            "url": "https://www.letmoneyearn.in/pages/review.html"
        }
    },
    "portfolio-beta": {
        title: "Portfolio Beta Calculator | Let Money Earn",
        description: "Calculate your portfolio beta vs Nifty 50. Understand your portfolio's volatility and risk relative to the market index.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Portfolio Beta Calculator",
            "description": "Calculate portfolio beta relative to Nifty 50 index",
            "applicationCategory": "FinanceApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
            },
            "provider": {
                "@type": "Organization",
                "name": "Let Money Earn",
                "url": "https://www.letmoneyearn.in/"
            }
        }
    },
    "calculators": {
        title: "Financial Calculators | Let Money Earn",
        description: "Interactive SIP, lump sum, tax, and retirement calculators.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Financial Calculators",
            "description": "Collection of financial planning calculators",
            "applicationCategory": "FinanceApplication"
        }
    }
};

// Collapsible calculators logic
function setupCalculatorCollapse() {
    const btns = document.querySelectorAll('.collapse-btn');
    btns.forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        if (!targetId) return;
        btn.addEventListener('click', function() {
            const content = document.getElementById(targetId);
            const isActive = btn.classList.contains('active');
            if (isActive) {
                btn.classList.remove('active');
                content.classList.remove('active');
            } else {
                document.querySelectorAll('.collapse-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.collapse-content').forEach(c => c.classList.remove('active'));
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
            }
        });
    });
}

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
        const fv = amount * Math.pow(1 + rate / 100, years);
        const gain = fv - amount;
        resultDiv.innerHTML =
            `<div>Invested Amount: <b>₹${amount.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
            `<div>Estimated Value: <b>₹${fv.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
            `<div>Estimated Gain: <b>₹${gain.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
    };
}

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
        const lumpFV = lump * Math.pow(1 + rate / 100, years);
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
        let hraExempt = 0;
        if (hra > 0 && rent > 0) {
            hraExempt = Math.max(0, Math.min(hra, rent - 0.1 * income));
        }
        let max80C = 150000;
        let max80D = (age === 'senior' || age === 'super') ? 50000 : 25000;
        let ded80C = Math.min(deduction80C, max80C);
        let ded80D = Math.min(medical, max80D);
        let totalDed = ded80C + ded80D + pf + hraExempt;
        if (isNaN(income) || isNaN(deduction80C) || isNaN(medical) || isNaN(hra) || isNaN(rent) || isNaN(pf) || income < 0 || deduction80C < 0 || medical < 0 || hra < 0 || rent < 0 || pf < 0 || totalDed > income) {
            resultDiv.textContent = 'Please enter valid values.';
            return;
        }
        const taxableOld = Math.max(0, income - totalDed);
        let slabsOld;
        if (age === 'normal' || age === 'huf') {
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
        if ((age === 'normal' && taxableOld <= 500000) || (age === 'senior' && taxableOld <= 500000) || (age === 'super' && taxableOld <= 500000)) {
            taxOld = 0;
        }
        let cessOld = taxOld * 0.04;
        let totalOld = taxOld + cessOld;

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
        if (taxableNew <= 700000) {
            taxNew = 0;
        }
        let cessNew = taxNew * 0.04;
        let totalNew = taxNew + cessNew;

        resultDiv.innerHTML =
            `<div style='min-width:270px;max-width:340px;border:1px solid #ccc;padding:1em;border-radius:8px;'>
                <div style='font-weight:600;font-size:1.1em;margin-bottom:0.5em;'>Old Regime</div>
                <div>Taxable Income: <b>₹${taxableOld.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                <div>Income Tax: <b>₹${taxOld.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                <div>Health & Education Cess (4%): <b>₹${cessOld.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                <div>Total Tax Payable: <b>₹${totalOld.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>
                <div style='font-size:0.95em;color:#888;margin-top:0.5em;'>Deductions claimed: ₹${totalDed.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
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
                slab = 'Long Term';
                let taxable = Math.max(0, gain - 100000);
                tax = taxable * 0.10;
                details = `LTCG above ₹1L taxed at 10%`;
            } else {
                slab = 'Short Term';
                tax = gain * 0.15;
                details = `STCG taxed at 15%`;
            }
        } else if (type === 'debt-mf') {
            if (years >= 3) {
                slab = 'Long Term';
                tax = gain * 0.30;
                details = `LTCG taxed at slab rate (assumed 30% for demo)`;
            } else {
                slab = 'Short Term';
                tax = gain * 0.30;
                details = `STCG taxed at slab rate (assumed 30% for demo)`;
            }
        } else if (type === 'property') {
            if (years >= 2) {
                slab = 'Long Term';
                tax = gain * 0.20;
                details = `LTCG taxed at 20% (indexation not included)`;
            } else {
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
        const yearsToRetire = retireAge - age;
        const yearsRetired = life - retireAge;
        const expAtRetire = exp * Math.pow(1 + infl / 100, yearsToRetire);
        const annualExp = expAtRetire * 12;
        const r = rate / 100;
        const n = yearsRetired;
        const corpus = annualExp * ((1 - Math.pow(1 + r, -n)) / r) * (1 + r);
        resultDiv.innerHTML =
            `<div>Monthly Expenses at Retirement: <b>₹${expAtRetire.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>` +
            `<div>Years in Retirement: <b>${yearsRetired}</b></div>` +
            `<div>Required Retirement Corpus: <b>₹${corpus.toLocaleString(undefined, {maximumFractionDigits:0})}</b></div>`;
    };
}

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

function setupReviewForm() {
    const form = document.getElementById('review-form');
    const messageDiv = document.getElementById('review-message');
    if (!form) return;
    
    form.onsubmit = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const review = document.getElementById('review').value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        
        if (!name || !email || !phone || !review || !rating) {
            messageDiv.textContent = 'Please fill all fields.';
            messageDiv.style.color = '#c00';
            return;
        }
        
        messageDiv.textContent = 'Thank you for your review! It will be displayed shortly.';
        messageDiv.style.color = '#27ae60';
        
        form.reset();
        
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 5000);
    };
    
    loadReviewsFromSheet();
}

function loadReviewsFromSheet() {
    const reviewsDiv = document.getElementById('reviews');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!reviewsDiv) return;
    
    const sheetDbUrl = 'https://sheetdb.io/api/v1/1b0can2pr0h1a';
    
    fetch(sheetDbUrl)
        .then(response => response.json())
        .then(data => {
            const reviews = data.map(item => ({
                name: item.Name || '',
                email: item.Email || '',
                phone: item.Phone || '',
                review: item.Review || '',
                rating: parseInt(item.Rating) || 0,
                date: item.Date || ''
            }));
            
            let currentPage = 0;
            const reviewsPerPage = 6;
            const totalPages = Math.ceil(reviews.length / reviewsPerPage);
            
            function displayReviews() {
                const start = currentPage * reviewsPerPage;
                const end = start + reviewsPerPage;
                const pageReviews = reviews.slice(start, end);
                
                reviewsDiv.innerHTML = pageReviews.map(r => `
                    <div class="review-card">
                        <div class="review-name">${r.name}</div>
                        <div class="review-date">${r.date}</div>
                        <div class="review-text">${r.review}</div>
                        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                    </div>
                `).join('');
                
                if (prevBtn && nextBtn) {
                    prevBtn.disabled = currentPage === 0;
                    nextBtn.disabled = currentPage >= totalPages - 1;
                }
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentPage > 0) {
                        currentPage--;
                        displayReviews();
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentPage < totalPages - 1) {
                        currentPage++;
                        displayReviews();
                    }
                });
            }
            
            displayReviews();
        })
        .catch(error => {
            reviewsDiv.innerHTML = '<p>Unable to load reviews. Please try again later.</p>';
            console.error('Error loading reviews:', error);
        });
}

function updateSeo(page) {
    const baseUrl = "https://www.letmoneyearn.in";
    const config = seoConfig[page];
    const pageMeta = document.querySelector(".page-meta");
    const title = pageMeta?.getAttribute("data-page-title") || config?.title;
    const description = pageMeta?.getAttribute("data-page-description") || config?.description;

    if (title) {
        document.title = title;
    }

    const metaDescription = document.getElementById("meta-description");
    if (metaDescription && description) {
        metaDescription.setAttribute("content", description);
    }

    const canonical = document.getElementById("canonical-link");
    if (canonical) {
        const pagePath = page === "new-home" ? "/" : `/pages/${page}.html`;
        canonical.setAttribute("href", `${baseUrl}${pagePath}`);
    }

    const ogTitle = document.getElementById("og-title");
    const ogDescription = document.getElementById("og-description");
    const ogUrl = document.getElementById("og-url");
    const twitterTitle = document.getElementById("twitter-title");
    const twitterDescription = document.getElementById("twitter-description");

    if (ogTitle && title) ogTitle.setAttribute("content", title);
    if (ogDescription && description) ogDescription.setAttribute("content", description);
    if (ogUrl && canonical) ogUrl.setAttribute("content", canonical.getAttribute("href"));
    if (twitterTitle && title) twitterTitle.setAttribute("content", title);
    if (twitterDescription && description) twitterDescription.setAttribute("content", description);

    const existing = document.getElementById("structured-data");
    if (existing) {
        existing.remove();
    }

    if (config?.jsonLd) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "structured-data";
        script.text = JSON.stringify(config.jsonLd);
        document.head.appendChild(script);
    }
}

function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(res => res.text())
        .then(data => {
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = data;
            updateSeo(page);
            
            // Execute any scripts in the loaded content
            const scripts = contentDiv.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = oldScript.textContent;
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
            
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

function expandCalculator(calcId) {
    // Remove the setTimeout wrapper - elements should be available immediately
    const workspace = document.getElementById('calculator-workspace');
    const title = document.getElementById('calc-title');
    const allCalcs = document.querySelectorAll('.collapse-content');
    
    console.log('Attempting to expand calculator:', calcId);
    console.log('Found workspace:', !!workspace);
    console.log('Found title:', !!title);
    console.log('Found calculators:', allCalcs.length);
    
    if (!workspace || !title) {
        console.error('Calculator workspace not found! Elements in DOM:', {
            workspace: workspace,
            title: title,
            contentDiv: document.getElementById('content'),
            allDivs: document.querySelectorAll('div').length
        });
        
        // Try again after a delay
        setTimeout(() => {
            console.log('Retrying after delay...');
            const ws2 = document.getElementById('calculator-workspace');
            const t2 = document.getElementById('calc-title');
            console.log('Second attempt - workspace:', !!ws2, 'title:', !!t2);
            if (ws2 && t2) {
                expandCalculatorNow(calcId, ws2, t2);
            }
        }, 200);
        return;
    }
    
    expandCalculatorNow(calcId, workspace, title);
}

function expandCalculatorNow(calcId, workspace, title) {
    const calcTitles = {
        'sip-calc': 'SIP Calculator',
        'lump-calc': 'Lump Sum Calculator',
        'lumpsip-calc': 'Lump Sum + SIP Calculator',
        'tax-calc': 'Income Tax Calculator',
        'cgt-calc': 'Capital Gains Tax Calculator',
        'retire-calc': 'Retirement Corpus Calculator',
        'goal-calc': 'Goal-based Investment Calculator',
        'swp-calc': 'SWP Calculator',
        'emi-calc': 'EMI Calculator',
        'emiadd-calc': 'EMI with Additional Payment'
    };
    
    // Hide all calculators
    const allCalcs = document.querySelectorAll('.collapse-content');
    allCalcs.forEach(calc => {
        calc.classList.remove('active');
        calc.style.display = 'none';
    });
    
    // Show selected calculator
    const selectedCalc = document.getElementById(calcId);
    console.log('Found selected calculator:', !!selectedCalc);
    
    if (selectedCalc) {
        selectedCalc.classList.add('active');
        selectedCalc.style.display = 'block';
        title.textContent = calcTitles[calcId] || 'Calculator';
        workspace.style.display = 'block';
        
        console.log('Calculator should now be visible');
        
        // Initialize calculator handlers
        setupCalculatorHandlers(calcId);
        
        // Scroll to calculator
        setTimeout(() => {
            workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        console.error('Selected calculator element not found:', calcId);
    }
}

function setupCalculatorHandlers(calcId) {
    console.log('Setting up handlers for:', calcId);
    
    // Specific setups - no need to reset inputs
    switch (calcId) {
        case 'sip-calc':
            setupSIPCalculator();
            break;
        case 'lump-calc':
            setupLumpCalculator();
            break;
        case 'lumpsip-calc':
            setupLumpSIPCalculator();
            break;
        case 'emi-calc':
            setupEMICalculator();
            break;
        case 'emiadd-calc':
            setupEMIAddCalculator();
            break;
        case 'tax-calc':
            setupTaxCalculator();
            break;
        case 'cgt-calc':
            setupCGTCalculator();
            break;
        case 'goal-calc':
            setupGoalCalculator();
            break;
        case 'retire-calc':
            setupRetireCalculator();
            break;
        case 'swp-calc':
            setupSWPCalculator();
            break;
    }
}

// Expose functions globally
window.expandCalculator = expandCalculator;
window.loadPage = loadPage;

// Handle hash navigation for direct links
function handleHashNavigation() {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    if (hash) {
        // Map of hash routes to page names
        const routes = {
            'portfolio-beta': 'portfolio-beta',
            'portfolio-beta-guide': 'portfolio-beta-guide',
            'calculators': 'calculators',
            'about': 'about',
            'home': 'new-home',
            // Add more routes as needed
        };
        
        const page = routes[hash] || 'new-home';
        loadPage(page);
    } else {
        loadPage('new-home');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Handle initial hash or load home page
    handleHashNavigation();
    
    // Listen for hash changes (back/forward buttons)
    window.addEventListener('hashchange', handleHashNavigation);

    const menuToggle = document.querySelector('.menu-toggle');
    const topnav = document.querySelector('.topnav');
    if (menuToggle && topnav) {
        menuToggle.addEventListener('click', function() {
            const isOpen = topnav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        topnav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (topnav.classList.contains('open')) {
                    topnav.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});
