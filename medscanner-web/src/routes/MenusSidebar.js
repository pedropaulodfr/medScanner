import Home from "../pages/Home"
import CartaoControle from "../pages/CartaoControle";

var menus = [
    {
        path: "/home",
        name: "Home",
        icon: "bi bi-house",
        component: Home
      },
      {
        path: "/card",
        name: "Cartão de Controle",
        icon: "bi bi-card-list",
        component: CartaoControle
      },
]

export default menus;
