


$(document).ready(()=>{

    const images = {
        "knight":"/api/v2/image/5e9a66dfd62b4567d4dd66f9",
        "paladin":"/api/v2/image/5e9a66f8d62b4567d4dd66fb",
        "sorcerer":"/api/v2/image/5e9a6711d62b4567d4dd66fe",
        "druid":"/api/v2/image/5e9a6701d62b4567d4dd66fc",
        "elite knight":"/api/v2/image/5e9a66ead62b4567d4dd66fa",
        "royal paladin":"/api/v2/image/5e9a66d1d62b4567d4dd66f8",
        "master sorcerer":"/api/v2/image/5e9a6709d62b4567d4dd66fd",
        "elder druid": "/api/v2/image/5e9a66bfd62b4567d4dd66f7"
    }

    const order = {
        NAME:"NAME",
        LEVEL:"LEVEL",
        CITY:"CITY"
    }
    

    const state = {
        order   : order.NAME,
        players : [],
    }

    const controller = Controller.init();
    
    const tableBody = $('#fetch-data');

    
    const render = () => {
        state.players.forEach(p=>{
            console.log(p);
            const tr = $(`<tr id="${p._id}"></tr>`);
            Object.keys(p).forEach(key=>{
                
                tr.append(`<td>${p[key]}</td>`);
                if(key == "vocation"){
                    tr.append(`<td><img src="${images[p[key]]}" /></td>`);
                }
            });
            tableBody.append(tr);
        })
    }
    
    controller.getPlayers(players=>{
        state.players = [...players];
        render();
    });



});




// const controller = Controller.init();


// const failedAlert = document.querySelector('#failed-alert');
// const sucessAlert = document.querySelector('#sucess-alert');
// const dataDiv = document.querySelector('#fetch-data');
// const nameWarning = document.querySelector("#name-warning");
// const levelWarning = document.querySelector("#level-warning");
// const nameInput = document.querySelector("#name-input");
// const levelInput = document.querySelector("#level-input");
// const createPlayerButton = document.querySelector('#create-player-button');
// const updatePlayerButton = document.querySelector('#update-player-button');
// const form_ = document.querySelector('#form');
// const selectCities = document.querySelector("#city-select");
// const selectVoc = document.querySelector("#vocation-select");
// const selectSex = document.querySelector("#sex-select");
// const formTitle = document.querySelector('#form-title');
// const idInput = document.querySelector('#id-input');
// const alphaOrder = document.querySelector('#by-name');
// const levelOrder = document.querySelector('#by-level');
// const cityOrder = document.querySelector('#by-city');

// const images = {
//     "knight":"img/Fire_Sword.gif",
//     "paladin":"img/Guardcatcher.gif",
//     "sorcerer":"img/Wand_of_Decay.gif",
//     "druid":"img/Moonlight_Rod.gif",
//     "elite knight":"img/Golden_Helmet.gif",
//     "royal paladin":"img/Crossbow_of_Carving_(Overcharged).gif",
//     "master sorcerer":"img/Sudden_Death_Rune.gif",
//     "elder druid": "img/Blue_Robe.gif"
// }

// const openModal = () =>{
//     if(state.action == actions.INSERTING){
//         showElement(createPlayerButton);
//         hideElement(updatePlayerButton);
//     }else{
//         showElement(updatePlayerButton);
//         hideElement(createPlayerButton);
//     }
//     document.getElementById('id01').style.display='block';
//     validateForm();

// }

// const closeModal = () => {
//     document.getElementById('id01').style.display='none'
//     state.action = actions.INSERTING;
//     form_.reset()
// }


// const validateForm = () =>{
//     if(nameInput.value.length >= 3){
//         hideElement(nameWarning);
//         if(Number.parseInt(levelInput.value) > 0 && Number.parseInt(levelInput.value) <= 1000){
//             try{
//                 createPlayerButton.disabled = false;
//             }catch(e){}
//             try{
//                 updatePlayerButton.disabled = false;
//             }catch(e){}
            
//         } 
//     }else{
//         try{createPlayerButton.disabled = true;}catch(e){}
//         try{updatePlayerButton.disabled = true;}catch(e){}
//         showElement(nameWarning);
//     }

//     if(Number.parseInt(levelInput.value) > 0 && Number.parseInt(levelInput.value) <= 1000){
//         hideElement(levelWarning);
//         if (nameInput.value.length >= 3){
//             try{createPlayerButton.disabled = false;}catch(e){}
//             try{updatePlayer.disabled = false;}catch(e){}
//         } 

//     }else{
//         createPlayerButton.disabled = true;
//         updatePlayerButton.disabled = true;
//         showElement(levelWarning);
//     }
// }



// const fillFormWithPlayerDetails = id_ =>{
//     state.action = actions.UPDATING;
//     openModal();

//     const {id, name, level, vocation, city, sex} = state.players.filter(player=>player.id == id_)[0];

//     idInput.value = id;
//     nameInput.value = name;
//     levelInput.value = level;
//     selectVoc.value = vocation;
//     selectCities.value = city;
//     selectSex.value = sex;
// }

// const renderData = ()=>{
    
    
//     dataDiv.innerHTML = "";

//     const p = [...state.players];

//     console.log(p);

//     switch(state.selectedOrder) {
//         case order.ALPHABETICAL:
//             p.sort((p1, p2)=> (p1.name > p2.name) - (p1.name < p2.name));
//             break;
//         case order.LEVEL:
//             p.sort((p1, p2)=> p2.level - p1.level);
//             break;
//         case order.CITY:
//             p.sort((p1, p2)=> (p1.city > p2.city) - (p1.city < p2.city));
//             break;
    

//     dataDiv.innerHTML += p.map(({_id, name, level, vocation, city, sex}) =>`
//         <tr>
//             <td class="col">${_id}</td>
//             <td>${name}</td>
//             <td>${level}</td>
//             <td>${vocation}</td>
//             <td><img src="${images[vocation]}"/></td>
//             <td>${city}</td>
//             <td>${sex}</td>
//             <td><button class="btn btn-primary" onclick="fillFormWithPlayerDetails('${_id}')" lg>Update</button><td>
//             <td"><button class="btn btn-danger lg" onclick="controller.deletePlayer('${_id}', renderData)">Delete</button></div>
//         </div>
//     `).reduce((acc,item)=>acc + item, '');
// }  


// updatePlayerButton.addEventListener('click', e=>{
//     e.preventDefault();
//     e.stopImmediatePropagation();

//     const form = new Form(
//         nameInput.value.trim(),
//         levelInput.value.trim(),
//         selectVoc.value.trim(),
//         selectCities.value.trim(),
//         selectSex.value.trim()
//     );

//     const id = idInput.value.trim();

//     if(form.isValid()){
//         closeModal();
//         const {name, level, vocation, city, sex} = form;
//         const player = new Player(id, name, level, vocation, city, sex);
//         console.log(idInput.value);
//         controller.updatePlayer(player, renderData);
//     }

// })

// createPlayerButton.addEventListener('click', e=>{
//     e.preventDefault();
//     e.stopImmediatePropagation();

//     const form = new Form(
//         nameInput.value.trim(),
//         levelInput.value.trim(),
//         selectVoc.value.trim(),
//         selectCities.value.trim(),
//         selectSex.value.trim()
//     );

//     if(form.isValid()){
//         closeModal();
//         controller.createPlayer(form, renderData); 
//     }
// });


// nameInput.addEventListener('keyup', validateForm);
// levelInput.addEventListener('keyup', validateForm);
// selectSex.addEventListener('click', validateForm);
// selectCities.addEventListener('click', validateForm);
// selectVoc.addEventListener('click', validateForm);

// const populateCity = () =>{
//         selectCities.innerHTML = state.cities.map(city=>`
//         <option>${city}</option>
//         `).reduce((acc, item)=>acc + item), '';
// }

// const populateVocation = () => {
//     selectVoc.innerHTML = state.vocations.map(vocation=>`
//         <option>${vocation}</option>
//         `).reduce((acc, item)=>acc + item), '';
// }

//     controller.getCities(populateCity);

//     controller.getVocations(populateVocation);  
// }

// alphaOrder.addEventListener('click', ()=>{
//     if(state.selectedOrder != order.ALPHABETICAL){
//         state.selectedOrder = order.ALPHABETICAL;
//         renderData();
//     }
    
// });

// levelOrder.addEventListener('click', ()=>{
//     if(state.selectedOrder != order.LEVEL){
//         state.selectedOrder = order.LEVEL;
//         renderData();
//     }
    
// });

// cityOrder.addEventListener('click', ()=>{
//     if(state.selectedOrder != order.CITY){
//         state.selectedOrder = order.CITY;
//         renderData();
//     }
// });

// const showElement = (el)=>{
//     el.classList.remove('hide');
// }

// const hideElement = (el)=>{
//     el.classList.add('hide');
// }

// const showAndHide = el =>{
//     showElement(el);
//     setTimeout(()=>{
//         hideElement(el);
//     }, 10000);
// }
// const showSuccessAlert = msg =>{
//     sucessAlert.innerHTML = msg;
//     showAndHide(sucessAlert);
// }

// const showErrorAlert = msg =>{
//     failedAlert.innerHTML = msg;
//     showAndHide(failedAlert);
// }


// controller.getPlayers(renderData);
                
