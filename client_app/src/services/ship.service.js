import apiClient from '../helper/api.client';

export const ShipService = {
    getShips: function() 
    {
        return apiClient().get("Ship");
    },

    addShip: function(ship) 
    {
        return apiClient().post("Ship", ship);
    },

    updateShip: function(ship) 
    {
        return apiClient().put(`Ship/${ship.id}`, ship)
    },

    deleteShip: function(shipId) 
    {
        return apiClient().delete(`Ship/${shipId}`)
    },

    deleteShips: function(ships)
    {
        return apiClient().delete("Ship/deleteShips", {data: ships})
    }
}