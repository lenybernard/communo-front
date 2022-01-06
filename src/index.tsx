import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index as MaterialIndex } from "./routes/materials";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import MaterialShow from "./routes/materials/show";
import {I18nextProvider} from "react-i18next";
import i18n from "./translations";
import Home from "./routes/home";
import Login from "./components/molecules/Login/login";
import 'react-toastify/dist/ReactToastify.css';
import "./style/index.scss"

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/api/graphql',
    cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ApolloProvider client={client}>
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Home modalComponent={<Login/>} />} />
                    <Route path="login" element={<Login />} />
                    <Route path="materials" element={<MaterialIndex />}>
                    </Route>
                    <Route path="materials/:id" element={<MaterialShow />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </I18nextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
