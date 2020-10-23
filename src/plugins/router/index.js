import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Login from "@/views/Login";
import Navbar from "@/components/Navbar";
import CadastroUsuario from "@/views/CadastroUsuario";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/cadastro-usuario",
    name: "CadastroUsuario",
    components: {
      default: CadastroUsuario,
      menu: Navbar,
    },
    props: true
  },
  {
    path: "/home",
    name: "Home",
    components: {
      default: Navbar,
      menu: Home,
    },
    props: true
  },
  {
    path: "*",
    name: "catchAll",
    component: Login,
  }
]


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem("TOKENMANUT");
  console.log(to.name);
  if (to.name !== 'Login' && !isAuthenticated) {
    Vue.toasted.error("Usuario nao esta logado");
    next({name: 'Login'})
  } else {
    next()
  }
})

export default router;
