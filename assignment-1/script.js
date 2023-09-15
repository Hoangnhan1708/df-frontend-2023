// Your JS code goes here
// Your JS code goes here

const $ =document.querySelector.bind(document);
const $$ =document.querySelectorAll.bind(document);

const deleteModal = $('.js-modal__delete-book');
const closeDeleteModal = $('.js-delete-book__close-btn')

const addBtn = $('.search-container__add-book-btn');
const addModal = $('.modal__add-book');
const closeAddModal = $('.add-book__close-btn')
const searchInput = $('.search-container__input');

var indexDelete;


const table = $('.table');

var nameArray =['Refactoring', 'Designing Data-Intensive Application','The Phoenix Project'];
var authorArray = ['Martin Fowler','Martin Kleppman','Gene Kim'];
var topicArray = ['Programming','Database','DevOps'];



searchInput.oninput =function(event){
    if(event.target.value){
        table.innerHTML = `
        <tr class="table__heading">
            <th class="name-heading heading">Name</th>
            <th class="author-heading heading">Author</th>
            <th class="topic-heading heading">Topic</th>
            <th class="action-heading heading">Action</th>
        </tr>
        `
        for(var i = 0;i< nameArray.length ; i++){
            var name = nameArray[i].toLowerCase();
            
            if(name.includes(event.target.value.toLowerCase())){
                table.innerHTML = table.innerHTML + `
                <tr data-index ='${i}'>
                    <td class="name-data">${nameArray[i]}</td>
                    <td class="author-data">${authorArray[i]}</td>
                    <td class="topic-data">${topicArray[i]}</td>
                    <td class="action-data js-action-data" data-index ="${i}">Delete</td>
                </tr>
            `
            handleDelete();
            }
            
        }
    
    }
    else{
        render();
    }
    

}

closeDeleteModal.onclick = function(){
    deleteModal.classList.remove('open')
}

addBtn.onclick = function(){
    addModal.classList.add('open')
}

closeAddModal.onclick = function(){
    addModal.classList.remove('open')
}

function submitForm(event){
    event.preventDefault();
    var bookName = $('#book-name').value;
    var authorName = $('#author-name').value;
    var topicName = $('#topic-name').value;

    nameArray.push(bookName);
    authorArray.push(authorName);
    topicArray.push(topicName);
    
    localStorage.setItem('list-book-name', JSON.stringify(nameArray));
    localStorage.setItem('list-author-name', JSON.stringify(authorArray));
    localStorage.setItem('list-topic-name', JSON.stringify(topicArray));
    
    nameArray = JSON.parse(localStorage.getItem('list-book-name'));
    authorArray = JSON.parse(localStorage.getItem('list-author-name'));
    topicArray = JSON.parse(localStorage.getItem('list-topic-name'));

    addModal.classList.remove('open');
    
    render();
}

function render(){
    if(JSON.parse(localStorage.getItem('list-book-name'))){
        nameArray = JSON.parse(localStorage.getItem('list-book-name'));
        authorArray = JSON.parse(localStorage.getItem('list-author-name'));
        topicArray = JSON.parse(localStorage.getItem('list-topic-name'));
    }
    table.innerHTML = `
    <tr class="table__heading">
        <th class="name-heading heading">Name</th>
        <th class="author-heading heading">Author</th>
        <th class="topic-heading heading">Topic</th>
        <th class="action-heading heading">Action</th>
    </tr>
    `
    
    for(var i =0; i < nameArray.length ; i++){
        table.innerHTML = table.innerHTML + `
            <tr data-index ='${i}'>
                <td class="name-data">${nameArray[i]}</td>
                <td class="author-data">${authorArray[i]}</td>
                <td class="topic-data">${topicArray[i]}</td>
                <td class="action-data js-action-data" data-index ="${i}">Delete</td>
            </tr>
        `
    }
    
    handleDelete();
}

function handleDelete(){
    const deleteBtns = $$('.js-action-data');
    for(const deleteBtn of deleteBtns){
        deleteBtn.onclick = function(){
            deleteModal.classList.add('open');
            indexDelete =this.dataset.index;
        }
    }
    
    const confirmDeleteBtn =$('.delete-book__action-delete');
    const confirmCancelBtn = $('.delete-book__action-cancel');

    confirmDeleteBtn.onclick = function(){
        nameArray.splice(indexDelete,1);
        authorArray.splice(indexDelete,1);
        topicArray.splice(indexDelete,1);

        localStorage.setItem('list-book-name', JSON.stringify(nameArray));
        localStorage.setItem('list-author-name', JSON.stringify(authorArray));
        localStorage.setItem('list-topic-name', JSON.stringify(topicArray));
        
        nameArray = JSON.parse(localStorage.getItem('list-book-name'));
        authorArray = JSON.parse(localStorage.getItem('list-author-name'));
        topicArray = JSON.parse(localStorage.getItem('list-topic-name'));

        deleteModal.classList.remove('open');
    
        render();
    }

    confirmCancelBtn.onclick = function(){
        deleteModal.classList.remove('open')
    }
}
render()

