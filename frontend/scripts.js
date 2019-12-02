const added = document.querySelector('#added');
const dataDiv = document.querySelector('#data');
const subButton = document.querySelector('#sub');
const delButton = document.querySelector('#idDel');
const selectCities = document.querySelector("#cit");
const selectVoc = document.querySelector("#voc");
const failedAlert = document.querySelector('#failed');

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
        dataDiv.innerHTML = tableHeader + JSON.parse(text).map(player=>`
            <div class="row">
                <div class="col">${player.id}</div>
                <div class="col">${player.name}</div>
                <div class="col">${player.level}</div>
                <div class="col">${player.vocation}</div>
                <div class="col">${player.city}</div>
                <div class="col">${player.sex}</div>
            </div>
        `).reduce((acc,item)=>acc + item, '')   
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
    const form = {};
    form["name"] = document.querySelector('#nam').value.trim();
    form["level"] = document.querySelector('#lev').value.trim();
    form["vocation"] = document.querySelector('#voc').value.trim();
    form["city"] = document.querySelector('#cit').value.trim();
    form["sex"] = document.querySelector('#sex').value.trim();

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
    const id = document.querySelector('#idDelete').value.trim();
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

getPlayers();
                
