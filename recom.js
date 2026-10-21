document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    const russianQuotes = [
        { text: "Время — это самая ценная вещь, которую человек может потратить.", author: "Теофраст" },
        { text: "Нельзя вернуть две вещи: упущенное время и сказанное слово.", author: "Народная мудрость" },
        { text: "Ключ не в том, чтобы тратить время, а в том, чтобы инвестировать его.", author: "Стивен Кови" },
        { text: "Действие — это главный ключ к любому успеху.", author: "Пабло Пикассо" },
        { text: "Успех — это сумма небольших усилий, повторяющихся изо дня в день.", author: "Роберт Кольер" },
        { text: "Тот, кто рассчитывает каждую минуту своего времени и бережет каждую крошку, поистине богат.", author: "Георг Лихтенберг" },
        { text: "Будущее создается сегодня. Завтра не наступит никогда.", author: "Омар Хайям" },
        { text: "Меньше говори, больше делай. Результаты говорят сами за себя.", author: "Народная мудрость" }
    ];

    function showRandomQuote() {
        if (!quoteText || !quoteAuthor) return;

        const randomIndex = Math.floor(Math.random() * russianQuotes.length);
        const quote = russianQuotes[randomIndex];

        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
    }

    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', showRandomQuote);
    }

    showRandomQuote();
});