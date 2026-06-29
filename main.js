
import { tasks, renderTasks, addTask, deleteTask, toggleTask, setFilter } from './taskManager.js';

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

Sortable.create(taskList, {
    handle: '.drag-handle',   // 只有点击这个元素才能触发拖拽
    animation: 150,           // 拖拽时的动画时长（毫秒）
    ghostClass: 'ghost-item', // 拖拽时占位元素的 CSS 类名
    
    // 拖拽结束时的回调函数
    onEnd: function(evt) {
        // evt.oldIndex: 拖拽前的位置
        // evt.newIndex: 拖拽后的位置
        
        // 1. 从原位置取出被拖拽的任务
        const movedTask = tasks.splice(evt.oldIndex, 1)[0];
        // 2. 将其插入到新位置
        tasks.splice(evt.newIndex, 0, movedTask);
        
        // 3. 将更新后的顺序保存到 localStorage
        localStorage.setItem('myTasks', JSON.stringify(tasks));
        
        console.log(`任务从位置 ${evt.oldIndex} 移动到了 ${evt.newIndex}`);
    }
});