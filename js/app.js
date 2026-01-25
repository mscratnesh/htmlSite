function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(res => res.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
            if (page === 'review') {
                setupReviewForm();
            }
        })
        .catch(() => {
            document.getElementById("content").innerHTML = "<h3>Error loading page</h3>";
        });
}


window.onload = () => loadPage('home');

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
