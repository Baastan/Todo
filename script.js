let main = document.createElement('main');
main.className = 'container';

document.body.prepend(main);

let prodjekName = document.createElement('h1');
prodjekName.innerHTML = "Планирования дня";
main.append(prodjekName);

let listBlock = document.createElement('div');
listBlock.className = ('mainBlock');
main.append(listBlock);

let firstDiv = document.createElement('div');
listBlock.append(firstDiv);

let texIn = document.createElement('input')
texIn.className = 'texIn'
texIn.setAttribute('placeholder', 'Введите ваш план...')
firstDiv.append(texIn)


let setDate = document.createElement('input')
setDate.setAttribute('type', 'date')
firstDiv.append(setDate)

let addBtn = document.createElement('button')
addBtn.innerHTML = 'Добавить план'
addBtn.id = 'AddBtn'
firstDiv.append(addBtn)

let list = document.createElement('ul');
listBlock.append(list)

let todosArray = localStorage.getItem('todos')==null ?
    []
    : [...JSON.parse(localStorage.getItem('todos'))]



const addTodo =()=> {
    let newTask = texIn.value;
    let date = setDate.value;

    if (newTask != '') {
        todosArray.push({
            text: newTask,
            checked: false,
            date
        })

        localStorage.setItem('todos', JSON.stringify(todosArray))
   
        texIn.value = '';
        setDate.value = '';
        renderTodoItem()
    }

}

const completeTodo =(e)=> {
    // e.target.parentNode.classList.toggle('done')
    let todoTemporary = [...todosArray]
    let index = e.target.parentNode.id

    let objectElement = todoTemporary[index].checked

    todoTemporary[index].checked = !objectElement
    localStorage.setItem('todos', JSON.stringify(todosArray))   


    let isDone = e.target.parentNode.classList.contains('done')

    isDone ?
    e.target.parentNode.classList.remove('done'):
    e.target.parentNode.classList.add('done')
}

const deleteTodo =(e)=>{ 
    //console.log(e.target.parentNode)
    // e.target.parentNode.remove(e.parentNode)
    let index = e.target.parentNode.id
    todosArray.splice(index, 1)

    localStorage.setItem('todos', JSON.stringify(todosArray))
    renderTodoItem()

}

addBtn.addEventListener('click', addTodo)

const renderTodoItem =()=>{
    list.innerHTML = ''
    todosArray.map((todo, id)=>{

        let li = document.createElement('li');
        li.className = todo.checked ? 'taskItem done': 'taskItem'
        li.id=id

        let doneBtn = document.createElement('img');
        doneBtn.src = "check-img.png";
        doneBtn.className = 'btn';
        doneBtn.addEventListener('click', completeTodo);


        let deleteBtn = document.createElement('img');
        deleteBtn.src = "delete-img-red.png";
        deleteBtn.className = 'btn2';
        deleteBtn.addEventListener('click', deleteTodo);


        let label = document.createElement('label');
        label.append(todo.text + " - " + todo.date);
        li.append(label);
        li.append(doneBtn);
        li.append(deleteBtn);
        list.append(li);      
    })

}
renderTodoItem()
