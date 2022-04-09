import instance from "../configurations/axios.config";

export const ShipService = {
    getShips: function() {
        return instance.get("Ship");
    },

    addShip: function(ship) {
        return instance.post("Ship", ship);
    },

    updateShip: function(ship) {
        return instance.put(`Ship/${ship.id}`, ship)
    },

    deleteShip: function(shipId) {
        return instance.delete(`Ship/${shipId}`)
    }
}