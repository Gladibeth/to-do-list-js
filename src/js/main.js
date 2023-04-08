const inputAdd = document.querySelector('.inputAdd');
const buttonAdd = document.querySelector('.buttonAdd');
const buttonRemove = document.querySelectorAll('.buttonRemove');
const buttonDone = document.querySelector('.buttonDone');
const buttonEdit = document.querySelector('.buttonEdit');
let contentTask = document.querySelector('.contentTask');
const message = document.querySelector('.message');
let tasks = [];

buttonAdd.addEventListener('click', function(){
  addTask(inputAdd.value)
})

function addTask(item) {
  if (inputAdd.value === "") {
    message.innerHTML = "Por favor ingrese la tarea";
    return false;
  }

  const task = {
    id: Date.now(),
    name: item,
    completed: false,
  };

  tasks.push(task);
  addToLocalStorage(tasks)
 
  inputAdd.value = '';
}

function addToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks)
}

function renderTasks(tasks){
  contentTask.innerHTML = '';
  tasks.forEach(item => {
   
    contentTask.innerHTML += `
      <div class="flex mb-4 items-center item-taks  ${item.completed === true ? 'active' : ''} task${item.id}" id="${item.id}">
      <p class="w-full text-grey-darkest">${item.name}</p>
      
      <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green-500 hover:bg-green-500 buttonDone" onclick="doneTask(this)">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2l4 -4" />
      </svg>
      </button>

      <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-blue-500 hover:bg-blue-500 buttonEdit" onclick="editTask(this)">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-color-picker" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M11 7l6 6" />
      <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" />
    </svg>
      </button>
      <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-500 hover:text-white hover:bg-red-500 " onclick="removeTask(${item.id})">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
      </button>
  </div>
  `;
  })
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('tasks');
  if (reference) {
    tasks = JSON.parse(reference);
    renderTasks(tasks);
  }
}

getFromLocalStorage();

function removeTask(id){
  tasks = tasks.filter(item => item.id != id);
  addToLocalStorage(tasks);
}

function editTask(task) {
  const listItem = task.parentNode;
  const currentValue = listItem.querySelector('p').textContent;
  const input = document.createElement('input');
  input.value = currentValue;

  listItem.replaceChild(input, listItem.querySelector('p'));

  const saveButton = document.createElement('button');
  saveButton.setAttribute('class', 'flex-no-shrink p-2 ml-2 border-2 rounded text-red border-blue-500 hover:text-white hover:bg-blue-500 saveTask ');
  saveButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <line x1="12" y1="11" x2="12" y2="17" />
  <line x1="9" y1="14" x2="15" y2="14" />
</svg>
`;

  listItem.appendChild(saveButton);
    saveButton.onclick = function() {
      const newValue = input.value;
      const text = document.createElement('p');
      text.textContent = newValue;
      listItem.replaceChild(text, input);
      listItem.querySelector('.saveTask').remove();
      const currentIndex  = tasks.findIndex(item => item.name === currentValue);
      if (currentIndex !== -1){
        tasks[currentIndex] = {
          ... tasks[currentIndex],
          name: newValue,
        }
      }
      addToLocalStorage(tasks);
    };
  
}

function doneTask(task) {
  const parentItem = task.parentNode;
  const currentValue = parentItem.querySelector('p').textContent;
  const currentIndex  = tasks.findIndex(item => item.name === currentValue);

  if (currentIndex !== -1){
    if(parentItem.classList.contains('active')){
      tasks[currentIndex] = {
        ... tasks[currentIndex],
        completed: false,
        
      }
    }else{
      tasks[currentIndex] = {
        ... tasks[currentIndex],
        completed: true,
        
      }
    }
  }
  addToLocalStorage(tasks); 
}

