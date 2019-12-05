const trigerModal = (id) =>{
    
    const n = document.querySelector('#namModal');
    const l = document.querySelector('#levModal');
    const v = document.querySelector('#vocModal');
    const c = document.querySelector('#citModal');
    const s = document.querySelector('#sexModal');

    const subModal = document.querySelector('#subModal');
    
    const checkValidation = () =>{
        const form = new Form(
            n.value.trim(),
            l.value.trim(),
            v.value.trim(),
            c.value.trim(),
            s.value.trim()
        );

        if(form.isValid()){
            subModal.disabled = false;
            
        }else{
            subModal.disabled = true;
        }
    }

    const {name, level, vocation, city, sex} = state.players.filter(p=>p.id == id)[0];

    n.value = name;
    l.value = level;
    v.innerHTML = state.vocations.map(v_=>`<option>${v_}</option>`);
    v.value = vocation;
    c.innerHTML = state.cities.map(c_=>`<option>${c_}</option>`);
    c.value = city
    s.value = sex

    checkValidation();


    n.addEventListener('keyup', checkValidation);
    l.addEventListener('keyup', checkValidation);
    v.addEventListener('keyup', checkValidation);
    c.addEventListener('keyup', checkValidation);
    s.addEventListener('keyup', checkValidation);


    // Get the modal
    var modal = document.querySelector("#myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

}