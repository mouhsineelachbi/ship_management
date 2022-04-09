import instance from "../configurations/axios.config";

export const ShipService = {
    getShips: function() {
        return instance.get("Ship");
    },

    addShip: function(ship) {
        return instance.post("Ship", ship);
    },

    deleteShip: function(shipId) {
        return instance.delete(`Ship/${shipId}`)
    }
}