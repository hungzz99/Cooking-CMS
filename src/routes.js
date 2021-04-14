import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import PromotionalList from "./views/RecipesManager";
import AddNewRecipes from "./views/AddNewRecipes";
import Detail from "./views/Detail";
import Update from "../src/views/Update";
import {Undefine} from "./layouts";
import login from "../src/views/Login";
import privateComponet from "../src/components/PrivateComponent/PrivateComponent";

export default [
  {
    path: "/",
    exact: true,
    layout: Undefine,
    component: () => { return (<Redirect to="/recipes-manager" />) }
  },
  {
    path: "/login",
    layout: Undefine,
    component: privateComponet(login)
  },
  {
    path: "/recipes-manager",
    layout: DefaultLayout,
    component: privateComponet(PromotionalList)
    // component: PromotionalList
  },
  {
    path: "/add-new-recipes",
    layout: DefaultLayout,
    component: privateComponet(AddNewRecipes)
  },
  {
    path: "/details/:id",
    layout: DefaultLayout,
    component: privateComponet(Detail)
  },
  {
    path: "/update/:id",
    layout: DefaultLayout,
    component: privateComponet(Update)
  }
];
