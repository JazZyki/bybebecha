// google-reviews

//https://www.pavecycles.cz/user/documents/pave_template/google-reviews.json
async function loadRandomReviews() {
    const url = 'https://www.pavecycles.cz/user/documents/pave_template/google_reviews.json'; // Zde doplňte URL k vašemu JSONu
    const container = document.getElementById('google-reviews');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Nepodařilo se načíst data');

        const reviews = await response.json();

        // 1. Zamíchání pole (Fisher-Yates algoritmus) a výběr prvních 4
        const shuffled = reviews.sort(() => 0.5 - Math.random());
        const selectedReviews = shuffled.slice(0, 4);

        // 2. Vykreslení do kontejneru
        container.innerHTML = selectedReviews.map(review => `
        <div class="review-card">
          <div class="review-header">
            <strong>${review.author}</strong>
          </div>
          <div class="review-meta"><span class="rating">${'★'.repeat(review.rating)}</span> ${review.period} • přes ${review.source}</div>
          <p class="review-text">${review.text}</p>
        </div>
      `).join('');

    } catch (error) {
        console.error('Chyba při načítání recenzí:', error);
        container.innerHTML = '<p>Recenze se nepodařilo načíst.</p>';
    }
}

// Spuštění po načtení DOMu
document.addEventListener('DOMContentLoaded', loadRandomReviews);