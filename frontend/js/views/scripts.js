
/**
 * Felipe Mantovani 2017192
 */

/**
 * All of these commands are to be issued whenever the full html document code has completely loaded. 
 */
$(document).ready(()=>{


    /**
     * Enum for sorting the list of players
     */
    const orders             = {
        NAME:"name",
        LEVEL:"level",
        CITY:"city"
    }

    /**
     * State object. 
     * This object later on is to be dynamically populated by the js with the vocations, cities and images arrays
     */
    const state              = {
        order   : orders.NAME,
        players : [],
    }

    /**
     * Declaration and instantiation of the frontend songleton controller classess
     */
    const controller         = Controller.init();
    const cityController     = CityController.getInstance();
    const vocationController = VocationController.getInstance();
    const imageController    = ImageController.getInstance();
    /**
     * Declaration of the DOM elements needed to manipulate
     */
    const tableBody          = $('#fetch-data'); // the tbody tag
    const spinner            = $('#spinner'); // the spinner div
    const sortByName         = $('#by-name'); // The sort by name radio button
    const sortByLevel        = $('#by-level'); // The sort by level radio button
    const sortByCity         = $('#by-city'); // The sort by city radio button
    const registerPlayer     = $('#register-player'); //The register player div
    const vocationsSelect    = $('#vocations-select'); //the input select where vocations will be populated
    const citiesSelect       = $('#cities-select'); // the input select for cities data population
    const backdrop           = $('#formBackdrop'); // the backdrop for the modal of the creating player form
    const createPlayerButton = $('#createPlayerButton'); // The create Table nav option
    const closeBackDrop      = $(`#closebackdrop`); // the close backdrop html svg tag
    const closeBackDrop2     = $(`#closebackdrop2`); // the close backdrop html svg tag for the form of vocations
    const nameInput          = $('#name'); // player name input
    const levelInput         = $('#level-input'); // level input
    const sexF               = $('#Sex-0'); // sex F radio button
    const sexM               = $('#Sex-1'); // sex M radio button
    const playerIdInput      = $('#playerIdInput'); // id input (invisible all the time)
    const registerVocCity    = $('#registeVocation-city'); //nav option to open the vocation form
    const formBackdrop2      = $('#formBackdrop2'); // the backdrop div for the modal form 2
    const createVocCity      = $('#createVocCity'); // the create city nav option
    const vocCityradios      = $('#vocation-cityRadios'); // The voc or city form for radio buttons
    const vocCityName        = $('#cityVocName'); // city name input
    const citiesBody         = $('#citiesBody'); // cities body of the table <tbody>
    const vocationsBody      = $('#vocationsBody'); // the body of the vocations table <tbody>
    const imagesData         = $('#imagesData'); // div where images will appear
    const imaging            = $('#imaging'); // nav option for uploading or deleting image
    const sendImage          = $('#sendImage'); // form for uploading images
    const imageInput         = $('#imageInput'); //input for uploading image
    const closebackdrop3     = $('#closebackdrop3'); // backdrop for the image form
    const successAlert       = $('#sucessAlert'); // alert div success
    const warningAlert       = $('#warningAlert'); // alert div warning

    /**
     * Makes visible the alert div
     * @param {JqueryObject} alert 
     */
    const showAlert          = (alert) => {
        console.log(alert);
        show(alert);
        setTimeout(()=>{
            hide(alert);
        },7000)
    }
    

    /**
     * makes backdrop modal invisible
     */
    closebackdrop3.click(()=>{
        hide($('#formBackdrop3'));
    });

    /**
     * uses the imageController to send the image request to API when form is submitted
     */
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

    

    /**
     * uses either vocationController or cityController to send voations or city objects by request to API
     * For the creation/update of city or vocation, the same form will be used, so this function will handle both. 
     */
    registerVocCity.submit((e)=>{
        e.preventDefault();
        e.stopPropagation();
        const idInput =$('#cityVocID');
        console.log(idInput.val());
        show(spinner);
        const record = {
            "name": vocCityName.val()
        };

        /**
         * Getting the value of the radio button selected Either City or Vocation. 
         */
        const cityVoc = $("#registeVocation-city input[type='radio']:checked").val();
        
        switch (cityVoc){
            /**
            * If vocation is selected, handle vocation
            */
            case "vocation":
                //create vocation
                if(idInput.val() != ""){
                    /**
                     * Update it if the invisible ID input is not empty
                     */
                    vocationController.updateVocation(record, idInput.val(),res=>{
                        /**
                         * Success handler. 
                         */
                        console.log(res);
                        main();
                        hide(spinner);
                        showAlert(successAlert);
                    }, e=>{
                        /**Error handler */
                        main();
                        hide(spinner);
                        showAlert(warningAlert);
                    });
                }else{
                    /**
                     * Creates a brand new Vocation if the ID input is cleared, but first, give this vocation the default image, since it's been created by the user
                     */
                    vocationController.defaultVocationRelated(res=>{
                        /**
                         * Success handling. res is expected to be an object with a "default" key. 
                         * This key is crutial to identify if this Vocation is default by the system or not. 
                         */
                        record.image = res["default"];
                        /**
                         * After having retrieved the default image, send everything to to the create routing
                         * first param is the ID, second is the callback, 
                         */
                        vocationController.createVocation(JSON.stringify(record), (res)=>{
                            /**
                             * Success handling
                             */
                            main();
                            hide(spinner);
                            showAlert(successAlert);
                        },e=>{
                            /**
                             * Error handling
                             */
                            main();
                            hide(spinner);
                            showAlert(warningAlert);
                        });
                    });
                }
                //hide spinner
                hide(spinner);
                break;
            /**
             * Case the city is selected to upload or create
             */
            case "city":
                if(idInput.val() != ""){
                    /**
                     * If the ID input is populated, update the existing city
                     */
                    cityController.updateCity(record, idInput.val(),res=>{
                        /**
                         * Success handling
                         */
                        console.log(res);
                        main();
                        hide(spinner);
                        showAlert(successAlert);
                    }, e=>{
                        /**
                         * Error handling
                         */
                        main();
                        hide(spinner);
                        showAlert(warningAlert);
                    });
                }else{
                    /**
                     * If ID input is an empty string, then create a brand new City
                     */
                    cityController.createCity(JSON.stringify(record), (res)=>{
                        /**
                         * Success handling
                         */
                        console.log(res);
                        main();
                        hide(spinner);
                        showAlert(successAlert);
                    },e=>{
                        /**
                         * Error handling
                         */
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
        /**
         * Make both radio button available. Because, when City is being updated, the vocation radio is disable to avoid inserting a new vocation when you 
         * actually meant to update an existing city. Same likewise.
         */
        $("#vocation-cityRadios-0").prop("disabled", false);
        $("#vocation-cityRadios-0").prop("disabled", false);
    });
    
    /**
     * Listener to hide the backdrop
     */
    closeBackDrop2.click(()=>{
        hide(formBackdrop2);
    });

    /**
     * Listener for the opening a modal backdrop modal form
     */
    createVocCity.click(()=>{
        console.log('hello');
        $('#cityVocName').val('');
        show(formBackdrop2);
    });

    /**
     * Listener for hiding the backdrop
     */
    closeBackDrop.click(()=>{
        hide(backdrop);
    });

    /**
     * Listener to open the create player modal form. Set some fields to an empty string. 
     */
    createPlayerButton.click(()=>{
        playerIdInput.val('');
        nameInput.val("");
        levelInput.val("");
        show(backdrop)
    });
    /**
     * Listener for the register player form when submitted. 
     */
    registerPlayer.submit(e=>{
        e.preventDefault();
        e.stopPropagation();
        show(spinner)
        /**
         * Transfer value of input fields to variables
         */
        const name = nameInput.val();
        const level = levelInput.val();
        const sex = $("#register-player input[type='radio']:checked").val();
        const vocation = vocationsSelect.val();
        const city = citiesSelect.val();
        const player = new Player(null, name, level, vocation, city, sex);
        /**
         * Instantiate user object, but delete the id filed, since it will be automatically generated by the mongo DB
         */
        delete player.id;

        /**
         * if the invisible ID input is not an empty string, means that should update rather than create
         */
        if(playerIdInput.val().length > 0){
            //update
            controller.updatePlayer(player, playerIdInput.val(), player_=>{
                /**
                 * success handling
                 */
                main();
                hide(spinner);
                showAlert(successAlert);
            }, e=>{
                /**
                 * Error Handling
                 */
                main();
                hide(spinner);
                showAlert(warningAlert);
            });
        }else{
            //create
            controller.createPlayer(JSON.stringify(player), player_=>{
                /**
                 * Success handling
                 */
                main();
                hide(spinner);
                showAlert(successAlert);
            },e=>{
                /**
                 * Error Handling
                 */
                main();
                hide(spinner);
                showAlert(warningAlert);
            });
        }
        /**
         * Hide the modal
         */
        hide(backdrop);
    });
    /**
     * Listener to the radio sort
     */
    sortByName.on('click', ()=>{
        state.order = orders.NAME;
        render();
    })
    /**
     * Listener to the radio sort
     */
    sortByLevel.on('click', ()=>{
        state.order = orders.LEVEL;
        render();
    });
    /**
     * Listener to the radio sort
     */
    sortByCity.on('click', ()=>{
        state.order = orders.CITY;
        render();
    });
    /**
     * This clears the HTML elements (tables body )to an empty string. 
     */
    const clearTable         = () => {
        tableBody.html("");
        citiesBody.html('');
        vocationsBody.html('');
        imagesData.html('');
    }
    /**
     * compares to pawers by their attributes, either name, level or city. 
     * This function is to be used by the sort function
     * @param {Player} p1 
     * @param {Player} p2 
     */
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
    
    /**
     * shorten a string to a length of 10. It will be used to display the ID. 
     * @param {String} id 
     */
    const shortenId          = (id) => {
        return id.substring(0,10) + "...";
    }
    /**
     * Hides a jquery object by adding the class "hide" to it. "
     * @param {JqueryObject} jqueryObject 
     */
    const hide               = (jqueryObject) => {
        jqueryObject.addClass("hide");
    }
    /**
     * shows a jqueryObject by removing the class hide
     * @param {JqueryObject} jqueryObject 
     */
    const show               = (jqueryObject) => {
        jqueryObject.removeClass("hide");
    }
    /**
     * loads all the components of the state and update the HTML DOM accordingly.
     */
    const render = () => {
        clearTable();//clears the html table bodies
        /**
         * Initializes
         */
        const players = [...state.players].sort(sortPlayers);
        const vocations = [...state.vocations];
        const cities = [...state.cities];
        const images = [...state.images];


 
        /**
         * For each image in the state, start converting it to HTML elements
         */
        images.forEach(image=>{
            const imageDiv = $('<div class="imageBlock" ></div>'); 
            //Makes mouse cursor prohibited symbol
            const notAllowedDiv = $(`#deleteWarning`);
            //creates the trash icon
            const trashIcon = $(`
            <svg id="trash${image._id}" class="pointer bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
            </svg>   
            `);
            
            //if image is content related, you won't be allowed to delete it. 
            imageController.isVocationRelated(image._id, res=>{

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
            

            /**
             * Load the images based on the image ID
             */
            const imageElement = `<img height="75px" width="75px" src="/api/v2/image/${image._id}"/>`;
            /**
             * Add child components. 
             */
            imageDiv.append(`<label>${shortenId(image.originalName)}</label>`)
            imageDiv.append(trashIcon);
            imageDiv.append(imageElement);
            hide(notAllowedDiv);
            imagesData.append(imageDiv);
        });

        /**
         * clears the vocation and cities select input form fields
         */
        vocationsSelect.html("");
        citiesSelect.html("");
        vocations.forEach(vocation=>{
            /**
             * FOr each vocation in the state object, start converting data to HTML component
             */
            const tdId = $(`<td>${shortenId(vocation._id)}</td>`);
            const tdName = $(`<td>${vocation.name}</td>`);
            const tr = $(`<tr id=${vocation._id}></tr>`);
            /**
             * Editing Icon declaration
             */
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

             //validate default vocation. If it is default, the trashicon should not work
            vocationController.checkIfVocationIsDefault(vocation._id, res=>{
                console.log(res);
                if(res["defaultVocation"]){
                    //editing and deleting won't be available
                    editingIcon.children('svg').addClass('not-allowed');
                    trashIcon.children('svg').addClass('not-allowed')
                    tr.hover(()=>{
                        show(editingIcon);
                        show(trashIcon);
                    },()=>{
                        hide(editingIcon);
                        hide(trashIcon)
                    });
                }else{
                    //before editting and delleting availability, we need to prevent user to delete 
                    //a vocation that a player is associated with. If there is any association, player should not be able to delete
                    tr.hover(()=>{
                        /**
                         * Success handling
                         */
                        show(editingIcon);
                        show(trashIcon);
                    },()=>{
                        /**
                         * Error handling
                         */
                        hide(editingIcon);
                        hide(trashIcon)
                    });
                    vocationController.isAssociatedWithAPlayer(vocation._id, res=>{

                        //if there is no assiciation, make available the deleting
                        /**
                         * You cannot delete an associated vocation. Meaning that while a player is using that vocation, vocation cannot be deleted. 
                         */
                        if(!res["association"]){//if there is NOT association
                            trashIcon.on('click', ()=>{
                                show(spinner);
                                /**
                                 * Make deletetion available to user
                                 */
                                vocationController.deleteVocation(vocation._id,(res)=>{
                                    /**
                                     * Success Handling
                                     */
                                    console.log(res);
                                    main();
                                    hide(spinner);
                                    showAlert(successAlert);
                                }, e=>{
                                    /**
                                     * Error Handling
                                     */
                                    main();
                                    hide(spinner);
                                    showAlert(warningAlert);
                                    })
                            });
                            
                            
                        }else{// if there is no assiciation
                            /**
                             * Make the trash icon with no listener, besides, make mouse cursor with the prohibited sign
                             */
                            trashIcon.children('svg').addClass('not-allowed');
                        }
                        /**
                         * Make editing icon available regardless from being associated or not. 
                         */
                        editingIcon.click(()=>{
                            show(formBackdrop2);
                            $("#vocation-cityRadios-0").prop("checked", true);
                            $("#vocation-cityRadios-1").prop("disabled", true);
                            vocCityName.val(vocation.name);
                            $('#cityVocID').val(vocation._id);
                        });
                    });
                }
            });

            /**
             * Adding listener to editing icon
             */
            editingIcon.hover(()=>{
                $(`#edit${vocation._id}`).width("1.6em").height("1,6em");
            },()=>{
                $(`#edit${vocation._id}`).width("1.5em").height("1.5em");
            });

            /**
             * Adding listener to trashIcon
             */
            trashIcon.hover(()=>{
                $(`#trash${vocation._id}`).width("1,6em").height("1.6em");
            },()=>{
                $(`#trash${vocation._id}`).width("1.5em").height("1.5em");
            });

            
            /**
             * Addind everything as child component of table row
             */
            tr.append(tdId);
            tr.append(tdName);
            tr.append(editingIcon);
            tr.append(trashIcon);
            vocationsBody.append(tr)
            vocationsSelect.append(`<option value="${vocation._id}">${vocation.name}</option>`)
    
        });
        /**
         * handling city now
         */
        cities.forEach(city=>{
            //for each city in the state object, start manipulating the HTML
            const tdId = $(`<td>${shortenId(city._id)}</td>`);
            const tdName = $(`<td>${city.name}</td>`);
            const tr = $(`<tr id=${city._id}></tr>`);
            /**
             * 
             * Adding editing icon
             */
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

            /**
             * Adding listener to editing icon
             */
            editingIcon.hover(()=>{
                $(`#edit${city._id}`).width("2em").height("2em");
            },()=>{
                $(`#edit${city._id}`).width("1.5em").height("1.5em");
            });

            /**
             * Listener to trashIcon
             */
            trashIcon.hover(()=>{
                $(`#trash${city._id}`).width("1.6em").height("1.6em");
            },()=>{
                $(`#trash${city._id}`).width("1.5em").height("1.5em");
            });

            //checking if a player is using this city
            cityController.cityIsAssociatedWithAPlayer(city._id, res=>{
                
                if(!res["association"]){
                    //if not associated, enable click event
                    trashIcon.on('click', ()=>{
                        show(spinner);
                        cityController.deleteCity(city._id,(res)=>{
                            console.log(res);
                            main();
                            hide(spinner);
                            
                        })
                    });

                    
                }else{
                    //if associated, not allowed
                    // editingIcon.children('svg').addClass('not-allowed');
                    trashIcon.children('svg').addClass('not-allowed');
                }

            });
            /**
             * Adding click listener to editing icon
             */
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
            /**
             * Adding everything as a child component
             */
            tr.append(tdId);
            tr.append(tdName);
            tr.append(editingIcon);
            tr.append(trashIcon);
            citiesBody.append(tr)            
            citiesSelect.append(`<option value="${city._id}">${city.name}</option>`)
        });

    /**
     * Handling players now 
     */           
    players.forEach(p=>{
        /**
         * For each player in the state, start manipulating HTML DOM with the data
         */
            if(p != undefined){
                delete p.__v;
                const tr = $(`<tr id="row_${p._id}"></tr>`);
                /**
                 * 
                 */
                Object.keys(p).forEach(key=>{
                    console.log(p);
                    if(key == "vocation"){ // checking if it's turn of manupulting the vocation key. 
                        /**
                         * I need to replace the vocation ID from the player attribute to the actual vocation name by finding it in the state.vocations object
                         */
                        tr.append(`<td>${state.vocations.find(vocation=>vocation._id == p[key]).name}</td>`);
                        /**
                         * Load the correspondent image of the vocation by calling the routing
                         */
                        tr.append(`<td><img src="/api/v2/correspondentImage/${p.vocation}" /></td>`);
                    }else if(key == "city"){
                        /**
                         * If city, it is required to replace the city ID from the player attribute to the actual name. This will be acomplished
                         * by finding the city in the state object with the same ID and getting the name correspondent to that ID. 
                         */
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

                /**
                 * Addin listener to the icons 
                 */
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

                

                /**
                 * Adding click handlers
                 */
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
            }
        })
        
    }
    /**
     * This function will carry out the refresh of all HTML components without having to reload the whole page. 
     */
    const main = () => {
        show(spinner);
        //Sends request to player
        controller.getPlayers(players=>{
            state.players = [...players]; // populating the players with the response
            cityController.getCities(cities=>{//sending request to cities routing
                state.cities = [...cities]; // populating cities state object with the response
                vocationController.getVocations(vocations=>{//sending request to vocations
                    state.vocations = [...vocations];//populate state.vocation object wth the response taken
                    imageController.getImages(images=>{//sends the request to images 
                        state.images = [...images]; // Populates the state image object
                        console.log(images);
                        render(); // render everything in the DOM. 
                        hide(spinner);
                    });
                });
            });    
        });
    }
    /**
     * Call main when page is loaded
     */
    main();

    /**
     * show the images manipulation modal
     */
    const showImages = () => {
        show($('#formBackdrop3'));
    }

    /**
     * hide images modal
     */
    const hideImages = () => {
        hide($('#formBackdrop3'));
    }

    /**
     * Addin listener to show image modal whenever the nav bar option is clicked
     */
    imaging.click(showImages);
});