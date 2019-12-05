const added = document.querySelector('#added');
const dataDiv = document.querySelector('#data');
const subButton = document.querySelector('#sub');
const delButton = document.querySelector('#idDel');
const selectCities = document.querySelector("#cit");
const selectVoc = document.querySelector("#voc");
const failedAlert = document.querySelector('#failed');


const nameField = document.querySelector('#nam');
const levelField = document.querySelector('#lev');
const vocationField = document.querySelector('#voc');
const cityfield = document.querySelector('#cit');
const sextField = document.querySelector('#sex');

const alphaOrder = document.querySelector('#alphaOrder');
const levelOrder = document.querySelector('#levelOrder');
const cityOrder = document.querySelector('#cityOrder');


const deleteRecord = (id) =>{
    const id_ = id.trim();
    fetch(`/delete_player?id=${id_}`, {
        method: "DELETE",
    }).then(res=>res.text())
    .then(text=>{
        if(text === 'false'){
            showErrorAlert('Id does not exist');
        }else{
            getPlayers();
            showSuccessAlert('Player successfully deleted!');
        }
        
    });
}

const renderData = () => {
    
    if(!state.render){
        dataDiv.innerHTML = "Could not load data from server. Schema may have not matched."
    }else{
        const tableHeader = `
    <div class="title">
            <h2 class="display-2">Players List</h2>
        </div>
        <div class="row">
            <div class="col">
                <p>id</p>
            </div>
            <div class="col">
                <p>Player Name</p>
            </div>
            <div class="col">
                <p>Level</p>
            </div>
            <div class="col">
                <p>vocation</p>
            </div>
            <div class="col">
                <p>city</p>
            </div>
            <div class="col">
                <p>sex</p>
            </div>
        </div>
    
    `;
    const p = [...state.players];

    switch(state.selectedOrder) {
        case order.ALPHABETICAL:
            p.sort((p1, p2)=> (p1.name > p2.name) - (p1.name < p2.name));
            break;
        case order.LEVEL:
            p.sort((p1, p2)=> p2.level - p1.level);
            break;
        case order.CITY:
            p.sort((p1, p2)=> (p1.city > p2.city) - (p1.city < p2.city));
            break;
    }

    dataDiv.innerHTML =  tableHeader + p.map(({id, name, level, vocation, city, sex}) =>`
        <div class="row">
            <div class="col">${id}</div>
            <div class="col">${name}</div>
            <div class="col">${level}</div>
            <div class="col">${vocation}</div>
            <div class="col">${city}</div>
            <div class="col">${sex}</div>
            <div class="col"><button type="button" onclick="trigerModal('${id}')" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-info btn-lg" id="${id}">Update</button></div>
            <div class="col"><button type="button" onclick="deleteRecord('${id}')" data-toggle="modal"  class="btn btn-danger btn-info btn-lg">Delete</button></div>
        </div>
    `).reduce((acc,item)=>acc + item, '');
    }  

    selectCities.innerHTML = state.cities.map(city=>`
        <option>${city}</option>
        `).reduce((acc, item)=>acc + item), '';
    
    selectVoc.innerHTML = state.vocations.map(vocation=>`
    <option>${vocation}</option>
    `).reduce((acc, item)=>acc + item), '';
}


alphaOrder.addEventListener('click', ()=>{
    if(state.selectedOrder != order.ALPHABETICAL){
        state.selectedOrder = order.ALPHABETICAL;
        renderData();
    }
    
});

levelOrder.addEventListener('click', ()=>{
    if(state.selectedOrder != order.LEVEL){
        state.selectedOrder = order.LEVEL;
        renderData();
    }
    
});

cityOrder.addEventListener('click', ()=>{
    if(state.selectedOrder != order.CITY){
        state.selectedOrder = order.CITY;
        renderData();
    }
});



const showElement = (el)=>{
    el.classList.remove('hide');
}

const hideElement = (el)=>{
    el.classList.add('hide');
}

const showAndHide = el =>{
    showElement(el);
    setTimeout(()=>{
        hideElement(el);
    }, 10000);
}
const showSuccessAlert = msg =>{
    added.innerHTML = msg;
    showAndHide(added);
}

const showErrorAlert = msg =>{
    failedAlert.innerHTML = msg;
    showAndHide(failedAlert);
}

                    
const getPlayers = () => {
    fetch('/players')
    .then(response=>response.text())
    .then(text => {      
        const {data, render} = JSON.parse(text);
        state.render = render
        state.players = [...data];
        renderData();
    });
}

                

fetch('/cities')
    .then(response=> response.text())
    .then(json=>{
        state.cities = JSON.parse(json);
    });

fetch('/vocations')
    .then(response=> response.text())
    .then(json=>{
        state.vocations = JSON.parse(json);
});
         

                    
subButton.addEventListener('click', ()=>{
    const form = new Form(
        document.querySelector('#nam').value.trim(),
        document.querySelector('#lev').value.trim(),
        document.querySelector('#voc').value.trim(),
        document.querySelector('#cit').value.trim(),
        document.querySelector('#sex').value.trim(),
    );

    fetch('/create_player', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(form)
    }).then(res=>res.text())
    .then(text=>{
        if(text === 'true'){
            showSuccessAlert("Player added successfully. Please, scroll table to see the record in the last row");
            getPlayers();
        }else{
            showErrorAlert("Schema does not match or something else went wrong");
        }      
    });
});



const checkEnablingButton = () => {
    buttonToEnable = subButton;
    const form = new Form(
        nameField.value.trim(),
        levelField.value.trim(),
        vocationField.value.trim(),
        cityfield.value.trim(),
        sextField.value.trim()
    );
    const warning = document.querySelector('#warning-sub');
    
    if(form.isValid()){
        hideElement(warning);
        subButton.disabled = false;
    }else{
        showElement(warning)
        subButton.disabled = true;
    }
}

nameField.addEventListener('keyup', checkEnablingButton);
levelField.addEventListener('keyup', checkEnablingButton);
levelField.addEventListener('click', checkEnablingButton);
levelField.addEventListener('change', checkEnablingButton);
vocationField.addEventListener('change', checkEnablingButton);
cityfield.addEventListener('change', checkEnablingButton);
sextField.addEventListener('change', checkEnablingButton);






getPlayers();
                
