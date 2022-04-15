import { applyMiddleware, createStore } from "redux";
import images from "./features/images";
import thunk from "redux-thunk";

export const store = createStore(images, applyMiddleware(thunk));
