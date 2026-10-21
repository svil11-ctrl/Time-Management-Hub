document.addEventListener('DOMContentLoaded', () => {
    const timerTaskList = document.getElementById("timer-task-list");
    const activeTaskDisplay = document.getElementById("active-task-display");
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let activeTaskName = localStorage.getItem('activeTask') || "Задача не выбрана";

    function updateActiveTaskDisplay() {
        if (activeTaskDisplay) {
            activeTaskDisplay.innerHTML = `Активная задача: <b style="color: #0f50ba;">${activeTaskName}</b>`;
        }
    }

    function renderTimerTasks() {
        if (!timerTaskList) return;
        timerTaskList.innerHTML = '';
        
        if (tasks.length === 0) {
            timerTaskList.innerHTML = '<li><em>Список задач пуст. Добавьте задачи на странице планировщика.</em></li>';
            return;
        }

        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.classList.add("task-item");
            
            if (task.priority === 3) li.classList.add("priority-high");
            else if (task.priority === 2) li.classList.add("priority-medium");
            else li.classList.add("priority-low");

            const span = document.createElement("span");
            span.textContent = task.text;
            li.appendChild(span);

            const chooseBtn = document.createElement("button");
            chooseBtn.textContent = 'Выбрать';
            chooseBtn.classList.add("btn-select");
            chooseBtn.addEventListener('click', () => {
                activeTaskName = task.text;
                localStorage.setItem('activeTask', activeTaskName);
                updateActiveTaskDisplay();
            });

            li.appendChild(chooseBtn);
            timerTaskList.appendChild(li);
        });
    }

    updateActiveTaskDisplay();
    renderTimerTasks();

    let timerInterval;
    let totalSeconds = 25 * 60; 
    let isRunning = false;

    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const startButton = document.getElementById("start-btn");
    const pauseButton = document.getElementById("pause-btn");
    const resetButton = document.getElementById("reset-btn");
    const customMinutesInput = document.getElementById("custom-minutes");

    function updateDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        if (minutesDisplay && secondsDisplay) {
            minutesDisplay.textContent = String(minutes).padStart(2, '0');
            secondsDisplay.textContent = String(seconds).padStart(2, '0');
        }
    }

    if (customMinutesInput) {
        customMinutesInput.addEventListener('input', () => {
            if (!isRunning) {
                let userMinutes = parseInt(customMinutesInput.value);
                if (userMinutes > 0) {
                    totalSeconds = userMinutes * 60;
                    updateDisplay();
                }
            }
        });
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alert(`Время вышло! Сессия для задачи "${activeTaskName}" завершена.`);
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        let userMinutes = parseInt(customMinutesInput.value) || 25;
        totalSeconds = userMinutes * 60;
        updateDisplay();
    }

    if (startButton) startButton.addEventListener('click', startTimer);
    if (pauseButton) pauseButton.addEventListener('click', pauseTimer);
    if (resetButton) resetButton.addEventListener('click', resetTimer);

    updateDisplay();
});