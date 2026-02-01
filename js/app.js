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
                { "@type": "Service", "name": "Insurance & Bonds" },
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
                { "@type": "Service", "name": "Insurance & Bonds" },
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
};

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
            document.getElementById("content").innerHTML = data;
            updateSeo(page);
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

document.addEventListener('DOMContentLoaded', function() {
    loadPage('new-home');

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
