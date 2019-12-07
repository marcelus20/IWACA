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