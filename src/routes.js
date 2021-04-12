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
import privateComponet from "../src/components/PrivateComponent/PrivateComponent"
export default [
  {
    path: "/",
    exact: true,
    layout: Undefine,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: Undefine,
    component: login
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
    component: AddNewRecipes
  },
  {
    path: "/details",
    layout: DefaultLayout,
    component: Detail
  },
  {
    path: "/update",
    layout: DefaultLayout,
    component: Update
  }
];
