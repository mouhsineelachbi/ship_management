import instance from "../configurations/axios.config";

export const ShipService = {
    getShips: function(){
        return instance.get("Ship");
    }
}