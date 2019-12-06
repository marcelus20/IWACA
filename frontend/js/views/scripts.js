const controller = Controller.init();


const added = document.querySelector('#added');
const dataDiv = document.querySelector('#fetch-data');
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


const renderData = ()=>{
    
    if(!state.render){
        dataDiv.innerHTML = "Could not load data from server. Schema may have not matched."
    }else{
   
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
    added.innerHTML = msg;
    showAndHide(added);
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
                
