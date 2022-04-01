import axios from "axios";
import Item from "../models/Item";
import QueryStringParams from "../models/QueryStringParams";

//this pulls whichever url is not commented out in the .env.local file.
const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getShoutouts = async (
  params: QueryStringParams
): Promise<Item[]> => {
  return (await axios.get(baseURL, { params })).data;
};

//this function uses the async await format and return a promise of type item.
//this is diff than above the promise is diff because we are adding 1 json object here. above we are returning an array.
export const addShoutout = async (shoutout: Item): Promise<Item> => {
  return (await axios.post(baseURL, shoutout)).data;
};

export const deleteShoutout = async (id: string): Promise<void> =>
  (await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)).data;

//you should put router and service side by side when working in here.
//we want to make functions that hit router end points.
//is there a package that allows me to make http requests succinctly? AXIOS!

//now we build our base components
