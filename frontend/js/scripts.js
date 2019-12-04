const added = document.querySelector('#added');
const dataDiv = document.querySelector('#data');
const subButton = document.querySelector('#sub');
const delButton = document.querySelector('#idDel');
const selectCities = document.querySelector("#cit");
const selectVoc = document.querySelector("#voc");
const failedAlert = document.querySelector('#failed');
const idField = document.querySelector('#idDelete');


const nameField = document.querySelector('#nam');
const levelField = document.querySelector('#lev');
const vocationField = document.querySelector('#voc');
const cityfield = document.querySelector('#cit');
const sextField = document.querySelector('#sex');

const alphaOrder = document.querySelector('#alphaOrder');
const levelOrder = document.querySelector('#levelOrder');
const cityOrder = document.querySelector('#cityOrder');


const render = () => {
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

    dataDiv.innerHTML =  tableHeader + p.map(player=>`
        <div class="row">
            <div class="col">${player.id}</div>
            <div class="col">${player.name}</div>
            <div class="col">${player.level}</div>
            <div class="col">${player.vocation}</div>
            <div class="col">${player.city}</div>
            <div class="col">${player.sex}</div>
        </div>
    `).reduce((acc,item)=>acc + item, '');
    
}


alphaOrder.addEventListener('click', ()=>{
    if(state.selectedOrder != order.ALPHABETICAL){
        state.selectedOrder = order.ALPHABETICAL;
        render();
    }
    
});

levelOrder.addEventListener('click', ()=>{
    if(state.selectedOrder != order.LEVEL){
        state.selectedOrder = order.LEVEL;
        render();
    }
    
});

cityOrder.addEventListener('click', ()=>{
    if(state.selectedOrder != order.CITY){
        state.selectedOrder = order.CITY;
        render();
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

    fetch('/players')
    .then(response=>response.text())
    .then(text => {      
        state.players = [...JSON.parse(text)];
        render();
    });
}

                

fetch('/cities')
    .then(response=> response.text())
    .then(json=>{
        selectCities.innerHTML = JSON.parse(json).map(city=>`
        <option>${city}</option>
        `).reduce((acc, item)=>acc + item), '';
    });

fetch('/vocations')
    .then(response=> response.text())
    .then(json=>{
        selectVoc.innerHTML = JSON.parse(json).map(vocation=>`
        <option>${vocation}</option>
        `).reduce((acc, item)=>acc + item), '';
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

delButton.addEventListener('click', ()=>{
    const id = idField.value.trim();
    fetch(`/delete_player?id=${id}`, {
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
});


idField.addEventListener('keyup', ()=>{
    const warningDel = document.querySelector('#warning-del');

    if(idField.value.trim().length == 20){
        hideElement(warningDel);
        delButton.disabled = false;
    }else{
        showElement(warningDel);
        delButton.disabled = true;
    }
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
                