document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.querySelector(".to-do");
    const taskInput = document.getElementById("task");
    const taskPriority = document.getElementById("task-priority");
    const taskList = document.getElementById("task-list");


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (taskInput.value.trim() === '') return; 

        const newTask = {
            text: taskInput.value,
            priority: Number(taskPriority.value),
            completed: false 
        };

        tasks.push(newTask); 
        taskInput.value = ''; 
        
        renderTasks(); 
    });

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.sort((a, b) => b.priority - a.priority);

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task-item");
            
            if (task.priority === 3) li.classList.add("priority-high");
            else if (task.priority === 2) li.classList.add("priority-medium");
            else li.classList.add("priority-low");

            if (task.completed) {
                li.classList.add("completed");
            }

            const span = document.createElement("span");
            span.classList.add("task-text");
            span.textContent = task.text;
            li.appendChild(span);

            const buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("task-buttons");

            const doneButton = document.createElement("button");
            doneButton.textContent = '✓';
            doneButton.classList.add("done-btn");
            doneButton.addEventListener('click', () => {
                task.completed = !task.completed; 
                renderTasks(); 
            });

            const editButton = document.createElement("button");
            editButton.textContent = '✏️';
            editButton.classList.add("edit-btn");
            editButton.addEventListener('click', () => {
                const newText = prompt("Редактировать задачу:", task.text);
                if (newText !== null && newText.trim() !== "") {
                    task.text = newText.trim();
                    renderTasks();
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-btn");
            deleteButton.textContent = '🗑️';
            
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks(); 
            });

            buttonsDiv.appendChild(doneButton);
            buttonsDiv.appendChild(editButton);
            buttonsDiv.appendChild(deleteButton);
            li.appendChild(buttonsDiv);
            taskList.appendChild(li);
        });


        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    renderTasks();
});