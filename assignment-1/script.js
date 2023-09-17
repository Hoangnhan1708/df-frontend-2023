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

var books = [
    {
        name : 'Refactoring',
        author :'Martin Fowler',
        topic : 'Programming'
    },
    {
        name : 'Designing Data-Intensive Application',
        author :'Martin Kleppman',
        topic : 'Database'
    },{
        name : 'The Phoenix Project',
        author :'Gene Kim',
        topic : 'DevOps'
    },
]




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
        for(var i = 0;i< books.length ; i++){
            var name = books[i].name.toLowerCase();
            
            if(name.includes(event.target.value.toLowerCase())){
                table.innerHTML = table.innerHTML + `
                <tr data-index ='${i}'>
                    <td class="name-data">${books[i].name}</td>
                    <td class="author-data">${books[i].author}</td>
                    <td class="topic-data">${books[i].topic}</td>
                    <td class="action-data js-action-data" data-index ="${i}">Delete</td>
                </tr>
            `
            handleDelete();
            }
            
        }
        console.log(event.target.value);
    
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


    books.push({name : bookName ,author : authorName , topic :topicName});

    
    localStorage.setItem('list-book', JSON.stringify(books));
    

    
    books = JSON.parse(localStorage.getItem('list-book'));
    


    addModal.classList.remove('open');
    
    render();
}

function render(){
    if(JSON.parse(localStorage.getItem('list-book'))){
        books = JSON.parse(localStorage.getItem('list-book'));
    }
    table.innerHTML = `
    <tr class="table__heading">
        <th class="name-heading heading">Name</th>
        <th class="author-heading heading">Author</th>
        <th class="topic-heading heading">Topic</th>
        <th class="action-heading heading">Action</th>
    </tr>
    `
    
    for(var i =0; i < books.length ; i++){
        table.innerHTML = table.innerHTML + `
            <tr data-index ='${i}'>
                <td class="name-data">${books[i].name}</td>
                <td class="author-data">${books[i].author}</td>
                <td class="topic-data">${books[i].topic}</td>
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
        books.splice(indexDelete,1);

        localStorage.setItem('list-book', JSON.stringify(books));
        

        
        books = JSON.parse(localStorage.getItem('list-book'));

        deleteModal.classList.remove('open');
    
        render();
    }

    confirmCancelBtn.onclick = function(){
        deleteModal.classList.remove('open')
    }
}
render()

