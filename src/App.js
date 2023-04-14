import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
// import { ApolloProvider } from "react-apollo";
import SongsList from "./components/SongsList";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongDetail from "./components/SongDetail";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import  Dashboard  from "./components/Dashboard";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: [<Header />, <SongsList />],
  },
  {
    path: "/lyrics",
    element: <AddSong />,
  },
  {
    path: "/song",
    element: <SongDetail />,
  },
  {
    path: "/login",
    element: [<Header />, <LoginForm />],
  },
  {
    path: "/signup",
    element: [<Header />, <SignUpForm />],
  },
  {
    path: "/dashboard",
    element: [<Header />, <Dashboard />],
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <Header /> */}
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
