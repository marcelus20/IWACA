



$(document).ready(()=>{

    const images             = {
        "knight"         :"/api/v2/image/5e9a66dfd62b4567d4dd66f9",
        "paladin"        :"/api/v2/image/5e9a66f8d62b4567d4dd66fb",
        "sorcerer"       :"/api/v2/image/5e9a6711d62b4567d4dd66fe",
        "druid"          :"/api/v2/image/5e9a6701d62b4567d4dd66fc",
        "elite knight"   :"/api/v2/image/5e9a66ead62b4567d4dd66fa",
        "royal paladin"  : "/api/v2/image/5e9a66d1d62b4567d4dd66f8",
        "master sorcerer": "/api/v2/image/5e9a6709d62b4567d4dd66fd",
        "elder druid"    : "/api/v2/image/5e9a66bfd62b4567d4dd66f7"
    }
    const orders             = {
        NAME:"name",
        LEVEL:"level",
        CITY:"city"
    }
    const state              = {
        order   : orders.NAME,
        players : [],
    }
    const controller         = Controller.init();
    const tableBody          = $('#fetch-data');
    const spinner            = $('#spinner');
    const failedAlert        = $('#failed-alert');
    const sucessAlert        = $('#sucess-alert');
    const sortByName         = $('#by-name');
    const sortByLevel        = $('#by-level');
    const sortByCity         = $('#by-city');
    const registerPlayer     = $('#register-player');
    const vocationsSelect    = $('#vocations-select');
    const citiesSelect       = $('#cities-select');
    const backdrop           = $('#formBackdrop');
    const createPlayerButton = $('#createPlayerButton');
    const closeBackDrop      = $(`#closebackdrop`);
    const nameInput          = $('#name');
    const levelInput         = $('#level-input');
    const sexF               = $('#Sex-0');
    const sexM               = $('#Sex-1');
    const playerIdInput      = $('#playerIdInput');

    closeBackDrop.click(()=>{
        hide(backdrop);
    });
    createPlayerButton.click(()=>{
        playerIdInput.val('');
        show(backdrop)
    });
    registerPlayer.submit(e=>{
        e.preventDefault();
        e.stopPropagation();
        show(spinner)
        const name = nameInput.val();
        const level = levelInput.val();
        const sex = $("#register-player input[type='radio']:checked").val();
        const vocation = vocationsSelect.val();
        const city = citiesSelect.val();
        const player = new Player(null, name, level, vocation, city, sex);
        
        delete player.id;

        if(playerIdInput.val().length > 0){
            //update
            controller.updatePlayer(player, playerIdInput.val(), player_=>{
                main();
                hide(spinner);
            });
        }else{
            //create
            controller.createPlayer(JSON.stringify(player), player_=>{
                main();
                hide(spinner);
            });
        }
        hide(backdrop);
    });
    sortByName.on('click', ()=>{
        state.order = orders.NAME;
        render();
    })
    sortByLevel.on('click', ()=>{
        state.order = orders.LEVEL;
        render();
    });
    sortByCity.on('click', ()=>{
        state.order = orders.CITY;
        render();
    });
    const clearTable         = () => {
        tableBody.html("");
    }
    const sortPlayers        = (p1, p2) => {
        switch (state.order){
            case orders.NAME:
                //Ascending alphabetical order
                if(p1.name < p2.name){
                    return -1;
                }else{
                    return 1;
                }
            case orders.LEVEL:
                //Descending Order
                if(p1.level > p2.level){
                    return -1
                }else{
                    return 1;
                }
            case orders.CITY:
                //Alphabetical ascending order
                if(p1.name < p2.name){
                    return -1;
                }else{
                    return 1;
                }
            default:
                return -1;
        }

    }
    //shorten a string to a length of 10. It will be used to display the ID.
    const shortenId          = (id) => {
        return id.substring(0,10) + "...";
    }
    const hide               = (jqueryObject) => {
        jqueryObject.addClass("hide");
    }
    const show               = (jqueryObject) => {
        jqueryObject.removeClass("hide");
    }
    const render = () => {
        const players = [...state.players];
        const vocations = [...state.vocations];
        const cities = [...state.cities];

        vocations.forEach(vocation=>vocationsSelect.append(`<option value="${vocation._id}">${vocation.name}</option>`));
        cities.forEach(city=>citiesSelect.append(`<option value="${city._id}">${city.name}</option>`));

        clearTable();
        players.forEach(p=>{
            delete p.__v;
            const tr = $(`<tr id="row_${p._id}"></tr>`);
            Object.keys(p).forEach(key=>{
                
                if(key == "vocation"){
                    tr.append(`<td>${state.vocations.find(vocation=>vocation._id == p[key]).name}</td>`);
                    tr.append(`<td><img src="${images[state.vocations.find(vocation=>vocation._id == p[key]).name]}" /></td>`);
                }else if(key == "city"){
                    tr.append(`<td>${state.cities.find(city=>city._id == p[key]).name}</td>`);
                }else{
                    tr.append(`<td>${key=="_id"?shortenId(p[key]):p[key]}</td>`);
                }

                
            });
            //adding editing icon
            const editingIcon = $(`
            <td id="edit_${p._id}" class="hide">
                <svg id="edit${p._id}" class="pointer bi bi-pencil" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                </svg>
            <td>
            `);
            
            //adding trash can icon
            const trashIcon = $(`
            <td id="remove_${p._id}" class="hide">
                <svg id="trash${p._id}" class="pointer bi bi-trash-fill" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
                </svg>
            </td>
            `);

            editingIcon.hover(()=>{
                $(`#edit${p._id}`).width("2em").height("2em");
            },()=>{
                $(`#edit${p._id}`).width("1.5em").height("1.5em");
            });

            trashIcon.hover(()=>{
                $(`#trash${p._id}`).width("2em").height("2em");
            },()=>{
                $(`#trash${p._id}`).width("1.5em").height("1.5em");
            });

            

            trashIcon.on('click', ()=>{
                show(spinner);
                controller.deletePlayer(p._id,()=>{
                    controller.getPlayers(players=>{
                        main();
                        hide(spinner);
                    });
                })
            });

            editingIcon.click(()=>{
                show(backdrop);
                playerIdInput.val(p._id);
                nameInput.val(p.name);
                levelInput.val(p.level);
                $("#register-player input[type='radio']:checked").val(p.sex);
                vocationsSelect.val(p.vocation);
                citiesSelect.val(p.city);
            });

            //assigning listener hover to row
            tr.hover(()=>{
                    show(editingIcon);
                    show(trashIcon);
                },()=>{
                    hide(editingIcon);
                    hide(trashIcon)
            });
            tr.append(editingIcon);
            tr.append(trashIcon);

            tableBody.append(tr);
        })
    }
    const main = () => {
        show(spinner);
        controller.getPlayers(players=>{
            state.players = [...players];
            controller.getCities(cities=>{
                state.cities = [...cities];
                controller.getVocations(vocations=>{
                    state.vocations = [...vocations];
                    render();
                    hide(spinner);
                });
            });    
        });
    }
    main();
});




// const controller = Controller.init();



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
                
