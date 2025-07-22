// src/routes/AppRouter.jsx


import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Queries from "../Pages/Queries";
import PrivetRoutes from "../Components/Routes/PrivetRoutes";
import MyQueries from "../Pages/MyQueries";
import QuaryDetails from "../Pages/QuaryDetails";
import MyRecommendations from "../Pages/MyRecommendations";
import RecommendationsForMe from "../Pages/RecommendationsForMe";
import { createBrowserRouter } from "react-router";
import NotFound from "../Pages/NotFound";
import Addquary from "../Pages/Addquary";
import Updatequary from "../Pages/Updatequary";
import About from "../Pages/About";
import Features from "../Pages/Features";
import TermsOfUse from "../Pages/Terms/Terms";
import PrivacyPolicy from "../Pages/Privacy/PrivacyPolicy";
import BlogSection from "../Pages/Privacy/Blogs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/queries", element: <Queries /> },
      {
        path: "/add-query",
        element: (
          <PrivetRoutes><Addquary></Addquary></PrivetRoutes>


        ),
      },
      {
        path: "/my-queries",
        element: (
          <PrivetRoutes> <MyQueries /></PrivetRoutes>


        ),
      },
      {
        path: "/query/:id",
        element: (
          <PrivetRoutes> <QuaryDetails></QuaryDetails></PrivetRoutes>
        ),
        loader: ({ params }) => fetch(`https://product-reco-server.vercel.app/queries/${params.id}`)
      },

      {
        path: "/update-query/:id",
        element: <PrivetRoutes><Updatequary></Updatequary></PrivetRoutes>
      },
      {
        path: "/my-recommendations",
        element: (
          <PrivetRoutes> <MyRecommendations></MyRecommendations></PrivetRoutes>
        ),
      },
      {
        path: "/recommendations-for-me",
        element: (
          <PrivetRoutes> <RecommendationsForMe></RecommendationsForMe></PrivetRoutes>
        ),
      },
       {
        path: "/about",
        element: (
          <About></About>
        ),
      },
      {
        path: "/features",
        element: (
          <Features></Features>
        ),
      },

      {
        path: "/terms",
        element: (

          <TermsOfUse></TermsOfUse>
        ),
      },
      {
        path: "/privacy",
        element: (

          <PrivacyPolicy></PrivacyPolicy>
        ),
      },
       {
        path: "/blog",
        element: (

          <BlogSection></BlogSection>
        ),
      },
    ],
  },
]);


