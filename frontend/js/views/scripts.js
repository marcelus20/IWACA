
/**
 * Felipe Mantovani 
 */


$(document).ready(()=>{

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
    const cityController     = CityController.getInstance();
    const vocationController = VocationController.getInstance();
    const imageController    = ImageController.getInstance();
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
    const closeBackDrop2     = $(`#closebackdrop2`);
    const nameInput          = $('#name');
    const levelInput         = $('#level-input');
    const sexF               = $('#Sex-0');
    const sexM               = $('#Sex-1');
    const playerIdInput      = $('#playerIdInput');
    const registerVocCity    = $('#registeVocation-city');
    const formBackdrop2      = $('#formBackdrop2');
    const createVocCity      = $('#createVocCity');
    const vocCityradios      = $('#vocation-cityRadios');
    const vocCityName        = $('#cityVocName');
    const citiesBody         = $('#citiesBody');
    const vocationsBody      = $('#vocationsBody');
    const imagesData         = $('#imagesData');
    const imaging            = $('#imaging');
    const sendImage          = $('#sendImage');
    const imageInput         = $('#imageInput');
    const closebackdrop3     = $('#closebackdrop3');
    const successAlert       = $('#sucessAlert');
    const warningAlert       = $('#warningAlert');

    const showAlert          = (alert) => {
        console.log(alert);
        show(alert);
        setTimeout(()=>{
            hide(alert);
        },7000)
    }
    

    closebackdrop3.click(()=>{
        hide($('#formBackdrop3'));
    });

    sendImage.submit((e)=>{
        e.preventDefault();
        e.stopPropagation();
        const form = $('#sendImage')[0];
        const data = new FormData(form);
        imageController.createImage(data, (sucess=>{
            main();
        }),(e=>{
            console.log(e);
            main();
        }));
        
    });

    

    
    registerVocCity.submit((e)=>{
        e.preventDefault();
        e.stopPropagation();
        const idInput =$('#cityVocID');
        console.log(idInput.val());
        show(spinner);
        const record = {
            "name": vocCityName.val()
        };

        const cityVoc = $("#registeVocation-city input[type='radio']:checked").val();
        switch (cityVoc){
            case "vocation":
                //create vocation
                if(idInput.val() != ""){
                    vocationController.updateVocation(record, idInput.val(),res=>{
                        console.log(res);
                        main();
                        hide(spinner);
                        showAlert(successAlert);
                    }, e=>{
                        main();
                        hide(spinner);
                        showAlert(warningAlert);
                    });
                }else{
                    vocationController.createVocation(JSON.stringify(record), (res)=>{
                        main();
                        hide(spinner);
                        showAlert(successAlert);
                    },e=>{
                        main();
                        hide(spinner);
                        showAlert(warningAlert);
                    });
                }
                hide(spinner);
                break;
            case "city":
                if(idInput.val() != ""){
                    cityController.updateCity(record, idInput.val(),res=>{
                        console.log(res);
                        main();
                        hide(spinner);
                        showAlert(successAlert);
                    }, e=>{
                        main();
                        hide(spinner);
                        showAlert(warningAlert);
                    });
                }else{
                    cityController.createCity(JSON.stringify(record), (res)=>{
                        console.log(res);
                        main();
                        hide(spinner);
                        showAlert(successAlert);
                    },e=>{
                        main();
                        hide(spinner);
                        showAlert(warningAlert);
                    });
                }
                
                break;
            default:
                console.log(cityVoc);
                break;
        }
        idInput.val("");
        hide(formBackdrop2);
        $("#vocation-cityRadios-0").prop("disabled", false);
        $("#vocation-cityRadios-0").prop("disabled", false);
    });
    
    closeBackDrop2.click(()=>{
        hide(formBackdrop2);
    });

    createVocCity.click(()=>{
        console.log('hello');
        $('#cityVocName').val('');
        show(formBackdrop2);
    });

    closeBackDrop.click(()=>{
        hide(backdrop);
    });
    createPlayerButton.click(()=>{
        playerIdInput.val('');
        nameInput.val("");
        levelInput.val("");
        vocation = vocationsSelect.val("");
        citiesSelect.val("");
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
                showAlert(successAlert);
            }, e=>{
                main();
                hide(spinner);
                showAlert(warningAlert);
            });
        }else{
            //create
            controller.createPlayer(JSON.stringify(player), player_=>{
                main();
                hide(spinner);
                showAlert(successAlert);
            },e=>{
                main();
                hide(spinner);
                showAlert(warningAlert);
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
        citiesBody.html('');
        vocationsBody.html('');
        imagesData.html('');
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
                if(p1.city > p2.city){
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
        clearTable();
        const players = [...state.players].sort(sortPlayers);
        const vocations = [...state.vocations];
        const cities = [...state.cities];
        const images = [...state.images];

 
        images.forEach(image=>{
            const imageDiv = $('<div class="imageBlock" ></div>'); 
            const notAllowedDiv = $(`#deleteWarning`);
            const trashIcon = $(`
            <svg id="trash${image._id}" class="pointer bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
            </svg>   
            `);
            
            //if image is content related, you won't be allowed to delete it. 
            imageController.isVocationRelated(image._id, res=>{
                console.log(res);
                if(res["vocationRelated"]){
                    trashIcon.addClass('not-allowed');
                    trashIcon.hover(()=>{
                        show(notAllowedDiv);
                    }, ()=>{
                        hide(notAllowedDiv);
                    });
                }else{
                    //Add an event click to delete if it is content related.
                    trashIcon.click(()=>{
                    show(spinner);
                    imageController.deleteImage(image._id, res=>{
                        main();
                    },e=>{
                        console.log(e);
                    });
                });
                }
            });
            

            
            const imageElement = `<img height="50px" width="50px" src="/api/v2/image/${image._id}"/>`;
            imageDiv.append(`<label>${shortenId(image.originalName)}</label>`)
            imageDiv.append(trashIcon);
            imageDiv.append(imageElement);
            hide(notAllowedDiv);
            

            imagesData.append(imageDiv);
        });

        vocationsSelect.html("");
        citiesSelect.html("");
        vocations.forEach(vocation=>{
            const tdId = $(`<td>${shortenId(vocation._id)}</td>`);
            const tdName = $(`<td>${vocation.name}</td>`);
            const tr = $(`<tr id=${vocation._id}></tr>`);
            


             const editingIcon = $(`
            <td id="edit_${vocation._id}" class="hide">
                <svg id="edit${vocation._id}" class="pointer bi bi-pencil" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                </svg>
            <td>
            `);
            
            //adding trash can icon
            const trashIcon = $(`
            <td id="remove_${vocation._id}" class="hide">
                <svg id="trash${vocation._id}" class="pointer bi bi-trash-fill" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
                </svg>
            </td>
            `);

            editingIcon.hover(()=>{
                $(`#edit${vocation._id}`).width("2em").height("2em");
            },()=>{
                $(`#edit${vocation._id}`).width("1.5em").height("1.5em");
            });

            trashIcon.hover(()=>{
                $(`#trash${vocation._id}`).width("2em").height("2em");
            },()=>{
                $(`#trash${vocation._id}`).width("1.5em").height("1.5em");
            });

            

            trashIcon.on('click', ()=>{
                show(spinner);
                vocationController.deleteVocation(vocation._id,(res)=>{
                    console.log(res);
                    main();
                    hide(spinner);
                    showAlert(successAlert);
                }, e=>{
                    main();
                    hide(spinner);
                    showAlert(warningAlert);
                })
            });

            editingIcon.click(()=>{
                show(formBackdrop2);
                $("#vocation-cityRadios-0").prop("checked", true);
                $("#vocation-cityRadios-1").prop("disabled", true);
                vocCityName.val(vocation.name);
                $('#cityVocID').val(vocation._id);
            });

            //assigning listener hover to row
            tr.hover(()=>{
                    show(editingIcon);
                    show(trashIcon);
                },()=>{
                    hide(editingIcon);
                    hide(trashIcon)
            });
            tr.append(tdId);
            tr.append(tdName);
            
            tr.append(editingIcon);
            tr.append(trashIcon);
            vocationsBody.append(tr)
            
            
            vocationsSelect.append(`<option value="${vocation._id}">${vocation.name}</option>`)
    
        });
        cities.forEach(city=>{
            const tdId = $(`<td>${shortenId(city._id)}</td>`);
            const tdName = $(`<td>${city.name}</td>`);
            const tr = $(`<tr id=${city._id}></tr>`);
            


             const editingIcon = $(`
            <td id="edit_${city._id}" class="hide">
                <svg id="edit${city._id}" class="pointer bi bi-pencil" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                </svg>
            <td>
            `);
            
            //adding trash can icon
            const trashIcon = $(`
            <td id="remove_${city._id}" class="hide">
                <svg id="trash${city._id}" class="pointer bi bi-trash-fill" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
                </svg>
            </td>
            `);

            editingIcon.hover(()=>{
                $(`#edit${city._id}`).width("2em").height("2em");
            },()=>{
                $(`#edit${city._id}`).width("1.5em").height("1.5em");
            });

            trashIcon.hover(()=>{
                $(`#trash${city._id}`).width("2em").height("2em");
            },()=>{
                $(`#trash${city._id}`).width("1.5em").height("1.5em");
            });

            

            trashIcon.on('click', ()=>{
                show(spinner);
                cityController.deleteCity(city._id,(res)=>{
                    console.log(res);
                    main();
                    hide(spinner);
                    
                })
            });

            editingIcon.click(()=>{
                show(formBackdrop2);
                $("#vocation-cityRadios-1").prop("checked", true);
                $("#vocation-cityRadios-0").prop("disabled", true);
                vocCityName.val(city.name);
                $('#cityVocID').val(city._id);
            });

            //assigning listener hover to row
            tr.hover(()=>{
                    show(editingIcon);
                    show(trashIcon);
                },()=>{
                    hide(editingIcon);
                    hide(trashIcon)
            });
            tr.append(tdId);
            tr.append(tdName);
            
            tr.append(editingIcon);
            tr.append(trashIcon);
            citiesBody.append(tr)

            
            citiesSelect.append(`<option value="${city._id}">${city.name}</option>`)
        });

           
    players.forEach(p=>{
            delete p.__v;
            const tr = $(`<tr id="row_${p._id}"></tr>`);
            Object.keys(p).forEach(key=>{
                if(key == "vocation"){
                    tr.append(`<td>${state.vocations.find(vocation=>vocation._id == p[key]).name}</td>`);
                    console.log(p.vocation);
                    tr.append(`<td><img src="/api/v2/correspondentImage/${p.vocation}" /></td>`);
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
                    main();
                    hide(spinner);
                    showAlert(sucessAlert);
                },e=>{
                    main();
                    hide(spinner);
                    showAlert(warningAlert);
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
            cityController.getCities(cities=>{
                state.cities = [...cities];
                vocationController.getVocations(vocations=>{
                    state.vocations = [...vocations];
                    imageController.getImages(images=>{
                        state.images = images;
                        console.log(images);
                        render();
                        hide(spinner);
                    });
                });
            });    
        });
    }
    main();

    const showImages = () => {
        show($('#formBackdrop3'));
    }

    const hideImages = () => {
        hide($('#formBackdrop3'));
    }

    imaging.click(showImages);
});