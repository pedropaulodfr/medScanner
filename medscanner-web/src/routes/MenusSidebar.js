import Home from "../pages/Home"
import CartaoControle from "../pages/CartaoControle";
import Dashboard from "../pages/Dashboard";

var menus = [
    {
        path: "/home",
        name: "Home",
        icon: "bi bi-house",
        component: Home
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "bi bi-ui-checks-grid",
        component: Dashboard
      },
      {
        path: "/card",
        name: "Cartão de Controle",
        icon: "bi bi-card-list",
        component: CartaoControle
      },
]

export default menus;
