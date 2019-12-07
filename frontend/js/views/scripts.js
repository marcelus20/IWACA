const controller = Controller.init();


const failedAlert = document.querySelector('#failed-alert');
const sucessAlert = document.querySelector('#sucess-alert');
const dataDiv = document.querySelector('#fetch-data');
const nameWarning = document.querySelector("#name-warning");
const levelWarning = document.querySelector("#level-warning");
const nameInput = document.querySelector("#name-input");
const levelInput = document.querySelector("#level-input");
const createPlayerButton = document.querySelector('#create-player-button');
const updatePlayerButton = document.querySelector('#update-player-button');
const form_ = document.querySelector('#form');
const selectCities = document.querySelector("#city-select");
const selectVoc = document.querySelector("#vocation-select");
const selectSex = document.querySelector("#sex-select");
const formTitle = document.querySelector('#form-title');
const idInput = document.querySelector('#id-input');
const alphaOrder = document.querySelector('#by-name');
const levelOrder = document.querySelector('#by-level');
const cityOrder = document.querySelector('#by-city');



const openModal = () =>{
    if(state.action == actions.INSERTING){
        showElement(createPlayerButton);
        hideElement(updatePlayerButton);
    }else{
        showElement(updatePlayerButton);
        hideElement(createPlayerButton);
    }
    document.getElementById('id01').style.display='block';
    validateName();
    validateLevel();
}

const closeModal = () => {
    document.getElementById('id01').style.display='none'
    state.action = actions.INSERTING;
    form_.reset()
}


const validateName = () =>{
    if(nameInput.value.length >= 3){
        hideElement(nameWarning);
        if(Number.parseInt(levelInput.value) > 0 && Number.parseInt(levelInput.value) <= 1000){
            try{
                createPlayerButton.disabled = false;
            }catch(e){}
            try{
                updatePlayerButton.disabled = false;
            }catch(e){}
            
        } 
    }else{
        try{createPlayerButton.disabled = true;}catch(e){}
        try{updatePlayerButton.disabled = true;}catch(e){}
        showElement(nameWarning);
    }
}

const validateLevel = ()=>{
    if(Number.parseInt(levelInput.value) > 0 && Number.parseInt(levelInput.value) <= 1000){
        hideElement(levelWarning);
        if (nameInput.value.length >= 3){
            try{createPlayerButton.disabled = false;}catch(e){}
            try{updatePlayer.disabled = false;}catch(e){}
        } 

    }else{
        createPlayerButton.disabled = true;
        updatePlayerButton.disabled = true;
        showElement(levelWarning);
    }
}


const fillFormWithPlayerDetails = id_ =>{
    state.action = actions.UPDATING;
    openModal();

    const {id, name, level, vocation, city, sex} = state.players.filter(player=>player.id == id_)[0];

    idInput.value = id;
    nameInput.value = name;
    levelInput.value = level;
    selectVoc.value = vocation;
    selectCities.value = city;
    selectSex.value = sex;
}

const renderData = ()=>{
    
    if(!state.render){
        dataDiv.innerHTML = "Could not load data from server. Schema may have not matched."
    }else{
        dataDiv.innerHTML = "";
    
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

        dataDiv.innerHTML += p.map(({id, name, level, vocation, city, sex}) =>`
            <tr>
                <td class="col">${id}</td>
                <td>${name}</td>
                <td>${level}</td>
                <td>${vocation}</td>
                <td>${city}</td>
                <td>${sex}</td>
                <td><button class="btn btn-primary" onclick="fillFormWithPlayerDetails('${id}')" lg>Update</button><td>
                <td"><button class="btn btn-danger lg" onclick="controller.deletePlayer('${id}', renderData)">Delete</button></div>
            </div>
        `).reduce((acc,item)=>acc + item, '');
}  


updatePlayerButton.addEventListener('click', e=>{
    e.preventDefault();
    e.stopImmediatePropagation();

    const form = new Form(
        nameInput.value.trim(),
        levelInput.value.trim(),
        selectVoc.value.trim(),
        selectCities.value.trim(),
        selectSex.value.trim()
    );

    const id = idInput.value.trim();

    if(form.isValid()){
        closeModal();
        const {name, level, vocation, city, sex} = form;
        const player = new Player(id, name, level, vocation, city, sex);
        console.log(idInput.value);
        controller.updatePlayer(player, renderData);
    }

})

createPlayerButton.addEventListener('click', e=>{
    e.preventDefault();
    e.stopImmediatePropagation();

    const form = new Form(
        nameInput.value.trim(),
        levelInput.value.trim(),
        selectVoc.value.trim(),
        selectCities.value.trim(),
        selectSex.value.trim()
    );

    if(form.isValid()){
        closeModal();
        controller.createPlayer(form, renderData); 
    }
});


nameInput.addEventListener('keyup', validateName);

levelInput.addEventListener('keyup', validateLevel);

const populateCity = () =>{
        selectCities.innerHTML = state.cities.map(city=>`
        <option>${city}</option>
        `).reduce((acc, item)=>acc + item), '';
}

const populateVocation = () => {
    selectVoc.innerHTML = state.vocations.map(vocation=>`
        <option>${vocation}</option>
        `).reduce((acc, item)=>acc + item), '';
}

    controller.getCities(populateCity);

    controller.getVocations(populateVocation);  
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
    sucessAlert.innerHTML = msg;
    showAndHide(sucessAlert);
}

const showErrorAlert = msg =>{
    failedAlert.innerHTML = msg;
    showAndHide(failedAlert);
}


controller.getPlayers(renderData);
                
