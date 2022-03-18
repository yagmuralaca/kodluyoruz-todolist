

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

loadItems();

eventListeners();

function eventListeners() {

    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAll);
}

function loadItems() {

    items = getItemsFromLS(); // Local Storage eleman alma

    items.forEach(function (item) {
        createItem(item); // items degiskenine item gondererek eleman olusturma
    });
}

// get items from local storage --> local storage'dan eleman alma

function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = []; // gelen deger yoksa items'ı diziye cevirelim
    }else{ // bir eleman varsa
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;

}
// set item to local storage 

function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item, index){
        if(item === text){
            items.splice(index,1); // 1 eleman silme
        }

    });
    localStorage.setItem('items', JSON.stringify(items));
}
function setItemToLS(text){
    items = getItemsFromLS(); // get itemsdan gelen elemanı al
    items.push(text); // listeye eleman eklensin
    localStorage.setItem('items', JSON.stringify(items)); 
}

function createItem(text) {

    // create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group';
    li.appendChild(document.createTextNode(text)); // inputtan gelen degeri ekleme

    // create a
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a); // li etiketine a ekleme
    taskList.appendChild(li); // ul etiketine li ekleme

}

function addNewItem(e) {

    if (input.value === '') {
        alert('add new item');
    }else{
        // create item
        createItem(input.value);

        // save to LS
        setItemToLS(input.value);
    }
    // clear input
    input.value = '';
    e.preventDefault();
}

function deleteItem(e) {

    if (e.target.className === 'fas fa-times') { // tıklanan elemanın classı?
        if (confirm('Silmek istediğine emin misin?')) {
            e.target.parentElement.parentElement.remove(); // iki parent yukarıya cıkıp li elemanını silmeli

            // delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }

    }
}
function deleteAll(e) {
    
    // taskList.innerHTML = ''; // butun html siler elemanlar silinir
    if (confirm('Silmek istediğine emin misin?')) {
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault(); // a href old icin
}

