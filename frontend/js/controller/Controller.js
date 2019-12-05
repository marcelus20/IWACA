

class Controller {

    static controller;

    constructor(){
        this.getVocations();
        this.getCities();

    }

    static init() {
        if (this.controller == null) this.controller = new Controller();
        else return this.controller;
        return this.controller;
    }

    getPlayers (){
        fetch('/players')
        .then(response=>response.text())
        .then(text => {      
            const {data, render} = JSON.parse(text);
            state.render = render
            state.players = [...data];
            renderData();
        });
    }

    getCities(){
        fetch('/cities')
        .then(response=> response.text())
        .then(json=>{
            state.cities = JSON.parse(json);
        });
    }

    getVocations(){
        fetch('/vocations')
            .then(response=> response.text())
            .then(json=>{
                state.vocations = JSON.parse(json);
        });
    }

    createPlayers(form){
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
                    this.getPlayers();
                }else{
                    showErrorAlert("Schema does not match or something else went wrong");
                }      
            });
    }

    deleteRecord(id){
        const id_ = id.trim();
        fetch(`/delete_player?id=${id_}`, {
            method: "DELETE",
        }).then(res=>res.text())
        .then(text=>{
            if(text === 'false'){
                showErrorAlert('Id does not exist');
            }else{
                this.getPlayers();
                showSuccessAlert('Player successfully deleted!');
            }       
        });
    }


    update_player(player){
        fetch('/update_player',{
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            method:'PUT',
            body:JSON.stringify(player),
        }).then(res=>res.text())
                .then(text=>{
                    if('true'){
                        showSuccessAlert("Player updated sucesssfuly");
                        this.getPlayers();
                    }else{
                        showErrorAlert("Something went wrong. Deletion did not complete");
                    }
                });
        modal.style.display = "none";
    }




    
}




