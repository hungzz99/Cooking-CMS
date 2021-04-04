import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import PromotionalList from "../src/views/PromotionalList";
import AddNewPromotional from "../src/views/AddNewPromotional";
import ReportInformation from "../src/views/ReportInformation";
// import UserProfileLite from "../src/views/UserProfileLite";
import Detail from "./views/Detail";
import Update from "../src/views/Update";
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/promotional-list" />
  },
  {
    path: "/promotional-list",
    layout: DefaultLayout,
    component: PromotionalList
  },
  {
    path: "/add-new-promotional",
    layout: DefaultLayout,
    component: AddNewPromotional
  },
  {
    path: "/report-information",
    layout: DefaultLayout,
    component: ReportInformation
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
  // {
  //   path: "/user-profile-lite",
  //   layout: DefaultLayout,
  //   component: UserProfileLite
  // }
];
