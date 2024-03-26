import { useContext, useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import menus from "../../routes/MenusSidebar";
import { useAuth } from "../../contexts/Auth/AuthContext";

import "./Sidebar.css";
import Loading from "../Loading/Loading";

function Sidebar({ sidebarStatus }) {
  const auth = useAuth();

  const [sidebarClose, setSidebarClose] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    window.location.href = "/private";
  };

  const handleLogout = async () => {
    setLoading(true);
    await auth.logout();
  };

  const handleHome = async (path) => {
    //await auth.signout();
    window.location.href = path;
  };

  const handleSidebarStatus = () => {
    console.log("aqui");
    setSidebarClose(!sidebarClose);
    sidebarStatus(!sidebarClose);
  };

  const handleDashboard = (async) => {
    window.location.href = "/private";
  };

  return (
    <div className="container-fluid col-auto">
      {loading && <Loading />}
      {!sidebarClose ? (
        <div className="row">
          <div className="bg-dark col-auto min-vh-100 d-flex justify-content-between flex-column">
            <div className="">
              <div className="sidebar-cabecalho">
                <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-4 mt-3">
                  <span
                    style={{ margin: "15px" }}
                    className="ms-4 fs-4 d-none d-sm-inline"
                  >
                    Painel
                  </span>
                </a>
                <CloseButton variant="white" onClick={handleSidebarStatus} />
              </div>
              <hr className="text-secondary d-none d-sm-block" />
              <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                {menus.map((menu, key) => {
                  {console.log(menu);}
                  return (<li className="nav-item text-while fs-4 my-1 py-2 py-sm-0">
                    <a
                      onClick={() => handleHome(menu.path)}
                      className="nav-link text-white fs-5"
                      aria-current="page"
                    >
                      <i className={menu.icon}></i>
                      <span className="ms-3 d-none d-sm-inline">{menu.name}</span>
                    </a>
                  </li>)
                })}
              </ul>
            </div>
            <div class="dropdown open">
              <a
                class="text-decoration-none text-white dropdown-toggle p-3"
                type="button"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
                <span className="ms-2 d-none d-sm-inline">Meu Perfil</span>
              </a>
              <div class="dropdown-menu item" aria-labelledby="triggerId">
                {true ? (
                  <>
                    <a class="dropdown-item" href="#">
                      Perfil
                    </a>
                    <a class="dropdown-item" onClick={handleLogout}>
                      Sair
                    </a>
                  </>
                ) : (
                  <a class="dropdown-item" onClick={handleLogin}>
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <i
            class="bi bi-list"
            style={{ fontSize: "2em", color: "#fff", cursor: "pointer" }}
            onClick={handleSidebarStatus}
          ></i>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
