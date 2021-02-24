import data from "./geoJSON.json";

export const getApiData = () => {
        data.features = data.features
        .slice(0, 10)
        return data;
};


/*
 Comments:
    query page at server link:
    https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0//query
    
    Has many properties and couldn't figure out all the PARAMS in given link:
    https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson

    ends with:
    /query?where=1=1&outFields=*&outSR=4326&f=pgeojson

    so:
    where=1=1
    outFields=*
    outSR=4326
    f=pgeojson
    */