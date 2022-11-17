import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:4000"
});

export const createSignin = async (email, password) => {
    return api.post(`/signin`, {email, password})
};

export const getStats = async () => {
    return api.get("/stats")
}

//USUARIOS

export const getUser = async () => {
    return api.get("/users")
}

export const postUser = (values) => {
    return api.post('/users', {values})
}

//ARTIGOS

export const postArticles = async (name, content, categoryId , userId) => {
    return api.post("/articles", {name, content, categoryId , userId})
}

export const getArticles = async () => {
    return api.get("/articles")
}

export const getArticlesID = async (id) => {
    return api.get(`/articles/${id}`)
}

//CATEGORIAS

export const getCategories = async () => {
    return api.get("/categories")
}

export const baseApiUrll = "http://localhost:4000" //está sendo usado na home

export const showError = (e) => {
    if(e && e.responde && e.responde.data) {
        console.log({msg : e.responde.data})
    } else if (typeof e === 'string') {
        console.log({ msg : e })
    }
}