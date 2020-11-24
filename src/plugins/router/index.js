import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Login from "@/views/Login";
import Chamados from "@/views/Chamados";
import Navbar from "@/components/Navbar";
import Util from "@/plugins/Util";
import Tratar from "@/views/Tratar";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    components: {
      default: Home,
      menu: Navbar,
    },
    props: true
  },
  {
    path: "/Chamados",
    name: "Chamados",
    components: {
      default: Chamados,
      menu: Navbar,
    },
    props: true
  },
  {
    path: "/Tratar",
    name: "Tratar",
    components: {
      default: Tratar,
      menu: Navbar,
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
  let usuarioManut = Util.getInfoUsuario();
  let isAuthenticated = null;

  if (usuarioManut) {
    isAuthenticated = usuarioManut.token;
  }

  if (to.name !== 'Login' && !isAuthenticated) {
    Vue.toasted.error("Usuario nao esta logado");
    next({name: 'Login'})
  } else {
    next()
  }
})

export default router;
