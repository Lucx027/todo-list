
import { renderTasks, addTask, deleteTask, toggleTask, setFilter } from './taskManager.js';

// 1. 获取页面元素
const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');
const filterGroup = document.querySelector('.filter-group');

// 2. 绑定添加事件
addBtn.addEventListener('click', () => addTask(taskInput));
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(taskInput);
});

// 3. 事件委托：处理删除和状态切换
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteTask(e.target.closest('li'));
    }
    if (e.target.classList.contains('task-text')) {
        toggleTask(e.target.closest('li'));
    }
});

// 4. 事件委托：处理筛选按钮点击
filterGroup.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // 移除所有按钮的 active 状态，给当前点击的按钮加上
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // 获取 data-filter 属性的值，并设置筛选条件
        const filter = e.target.dataset.filter;
        setFilter(filter);
    }
});

// 5. 页面初始化渲染
renderTasks();