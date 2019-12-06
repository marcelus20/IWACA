const controller = Controller.init();


const sucessAlert = document.querySelector('#sucess-alert');
const dataDiv = document.querySelector('#fetch-data');
const subButton = document.querySelector('#sub');
const delButton = document.querySelector('#idDel');



const nameWarning = document.querySelector("#name-warning");
const levelWarning = document.querySelector("#level-warning");
const nameInput = document.querySelector("#name-input");
const levelInput = document.querySelector("#level-input");
const createPlayerButton = document.querySelector('#create-player-button');
const form_ = document.querySelector('#form');
const selectCities = document.querySelector("#city-select");
const selectVoc = document.querySelector("#vocation-select");
const radioM = document.querySelector("#radio-m");
const radioF = document.querySelector("#radio-f");
const sex = radioM.checked?radioM:radioF;




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
                <td><button class="btn btn-primary" lg>Update</button><td>
                <td"><button class="btn btn-danger lg">Delete</button></div>
            </div>
        `).reduce((acc,item)=>acc + item, '');
}  





form_.addEventListener('submit', (e)=>{
    e.preventDefault();
     e.stopImmediatePropagation();

    const form = new Form(
        nameInput.value.trim(),
        levelInput.value.trim(),
        selectVoc.value.trim(),
        selectCities.value.trim(),
        sex.value.trim()
    );

    if(form.isValid()){
        document.getElementById('id01').style.display='none';
        controller.createPlayers(form, renderData);
        
    }
});



nameInput.addEventListener('keyup', ()=>{
    if(nameInput.value.length >= 3){
        hideElement(nameWarning);
        if(Number.parseInt(levelInput.value) > 0 && Number.parseInt(levelInput.value) <= 1000) createPlayerButton.disabled = false;
    }else{
        createPlayerButton.disabled = true;
        showElement(nameWarning);
    }
});

levelInput.addEventListener('keyup', ()=>{
    if(Number.parseInt(levelInput.value) > 0 && Number.parseInt(levelInput.value) <= 1000){
        hideElement(levelWarning);
        if (nameInput.value.length >= 3) createPlayerButton.disabled = false;
    }else{
        createPlayerButton.disabled = true;
        showElement(levelWarning);
    }
});












const failedAlert = document.querySelector('#failed-alert');

const nameField = document.querySelector('#nam');
const levelField = document.querySelector('#lev');
const vocationField = document.querySelector('#voc');
const cityfield = document.querySelector('#cit');
const sextField = document.querySelector('#sex');

const alphaOrder = document.querySelector('#alphaOrder');
const levelOrder = document.querySelector('#levelOrder');
const cityOrder = document.querySelector('#cityOrder');




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



/*
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

*/

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

                    
    /*                
subButton.addEventListener('click', ()=>{
    const form = new Form(
        document.querySelector('#nam').value.trim(),
        document.querySelector('#lev').value.trim(),
        document.querySelector('#voc').value.trim(),
        document.querySelector('#cit').value.trim(),
        document.querySelector('#sex').value.trim(),
    );

        controller.createPlayers(form, ()=>renderData());
});

*/

/*
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

*/


controller.getPlayers(renderData);
                
