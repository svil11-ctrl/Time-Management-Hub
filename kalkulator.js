document.addEventListener('DOMContentLoaded', () => {
    const calcButton = document.getElementById('calc-prod-btn');
    const resultContainer = document.getElementById('result-container');
    const prodText = document.getElementById('prod-text');
    const progressBar = document.getElementById('prod-progress');

    if (!calcButton) return;

    calcButton.addEventListener('click', () => {
        const work = parseFloat(document.getElementById('work-hours').value) || 0;
        const study = parseFloat(document.getElementById('study-hours').value) || 0;
        const rest = parseFloat(document.getElementById('rest-hours').value) || 0;
        const entertainment = parseFloat(document.getElementById('entertainment-hours').value) || 0;

        const totalHours = work + study + rest + entertainment;

        if (totalHours <= 0) {
            alert('Пожалуйста, введите количество часов хотя бы для одной категории!');
            return;
        }

        if (totalHours > 24) {
            alert('В сутках всего 24 часа! Проверьте введенные данные.');
            return;
        }

        const productiveHours = work + study;
        
        const unproductiveHours = rest + entertainment;

        const productivePercent = Math.round((productiveHours / totalHours) * 100);
        const unproductivePercent = 100 - productivePercent;

        resultContainer.style.display = 'block';
        prodText.innerHTML = `
            Продуктивное время (работа и учеба): <b>${productiveHours} ч. (${productivePercent}%)</b><br>
            Непродуктивное время (отдых и развлечения): <b>${unproductiveHours} ч. (${unproductivePercent}%)</b>
        `;

        
        progressBar.style.width = `${productivePercent}%`;
        
        if (productivePercent >= 50) {
            progressBar.style.backgroundColor = '#28a745'; 
        } else {
            progressBar.style.backgroundColor = '#ffc107'; 
        }
    });
});