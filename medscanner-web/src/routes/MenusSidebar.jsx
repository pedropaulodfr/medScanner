import Home from "../pages/Home";
import CartaoControle from "../pages/CartaoControle/CartaoControle";
import Dashboard from "../pages/Dashboard";
import Medicamentos from "../pages/Medicamentos/Medicamentos";
import TipoMedicamento from "../pages/Parametros/TipoMedicamento/TipoMedicamento";
import Unidades from "../pages/Parametros/Unidades/Unidades";
import Receituario from "../pages/Receituario/Receituario";
import Usuarios from "../pages/Usuarios/Usuarios";

var menus = [
  {
    path: "/home",
    name: "Home",
    icon: "bi bi-house",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "bi bi-ui-checks-grid",
    component: Dashboard,
  },
  {
    path: "/card",
    name: "Cartão de Controle",
    icon: "bi bi-table",
    component: CartaoControle,
  },
  {
    path: "/receituario",
    name: "Receituário",
    icon: "bi bi-card-list",
    component: Receituario,
  },
  {
    path: "/medicamentos",
    name: "Medicamentos",
    icon: "bi bi-capsule",
    component: Medicamentos,
  },
  {
    path: "/home",
    name: "Relatórios",
    icon: "bi bi-file-earmark",
    component: CartaoControle,
  },
  {
    name: "Parâmetros",
    icon: "bi bi-gear",
    modulo: ["Admin"],
    submenus: [
      {
        path: "/unidades",
        name: "Unidades",
        icon: "bi bi-rulers",
        modulo: ["Admin"],
        component: Unidades,
      },
      {
        path: "/tipoMedicamento",
        name: "Tipos",
        icon: "bi bi-capsule",
        modulo: ["Admin"],
        component: TipoMedicamento,
      },
    ]
  },
  {
    path: "/usuarios",
    name: "Usuários",
    icon: "bi bi-people",
    modulo: ["Admin"],
    component: Usuarios,
  },
];

export default menus;
