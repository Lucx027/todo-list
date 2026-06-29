// taskManager.js

// 1. 状态管理：数据与当前筛选条件
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let currentFilter = 'all'; // 默认显示全部

const taskList = document.querySelector('#taskList');

// 2. 核心渲染函数（加入了筛选逻辑）
export function renderTasks() {
    taskList.innerHTML = ''; 
    
    // 根据 currentFilter 过滤出需要显示的数组
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    // 渲染过滤后的数据
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.className = 'task-text';
        span.innerText = task.text;

        const dltBtn = document.createElement('button');
        dltBtn.className = 'delete-btn';
        dltBtn.innerText = '删除';

        li.append(span, dltBtn);
        taskList.appendChild(li);
    });
}

// 3. 封装数据操作方法
export function addTask(inputElement) {
    const text = inputElement.value.trim();
    if (!text) return;
    tasks.push({ text, completed: false });
    saveAndRender();
    inputElement.value = '';
    inputElement.focus();
}

export function deleteTask(liElement) {
    const text = liElement.querySelector('.task-text').innerText;
    tasks = tasks.filter(task => task.text !== text);
    saveAndRender();
}

export function toggleTask(liElement) {
    const text = liElement.querySelector('.task-text').innerText;
    const task = tasks.find(t => t.text === text);
    if (task) task.completed = !task.completed;
    saveAndRender();
}

// 4. 设置筛选条件
export function setFilter(filter) {
    currentFilter = filter;
    renderTasks(); // 重新渲染
}

// 5. 内部辅助函数：保存数据并重新渲染
function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}