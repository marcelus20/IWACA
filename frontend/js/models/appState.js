/**
 * This is the front end state. When info comes from the server, 
 * the state object should be populated with the players, city, vocations.
 * This way, data can be rerendered or sorted easily just by changing the state.
 */

const order = {
    ALPHABETICAL: "ALPHABETICAL",
    LEVEL: "LEVEL",
    CITY: "CITY"
}

const actions = {
    UPDATING: 'UPDATING',
    INSERTING:'INSERTING'
}


const state = {
    selectedOrder: order.ALPHABETICAL,
    render:false,
    players:[],
    cities:[],
    vocations:[],
    action: actions.INSERTING
};