import { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Accordion from "react-bootstrap/Accordion";
import menus from "../../routes/MenusSidebar";
import { useAuth } from "../../contexts/Auth/AuthContext";

import "./Sidebar.css";
import Loading from "../Loading/Loading";
import Logo from "../../assets/medscan-min-white.png";

function Sidebar({ sidebarStatus }) {
  const auth = useAuth();

  const [sidebarClose, setSidebarClose] = useState(false);

  const [loading, setLoading] = useState(false);

  // Estado que controla o Accordion
  const [activeKey, setActiveKey] = useState("1")
  const toggleAccordion = () => {
    setActiveKey(activeKey == "1" ? "0" : "1"); 
  }

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
          <div
            className="col-auto min-vh-100 d-flex justify-content-between flex-column"
            style={{ backgroundColor: "#008952" }}
          >
            <div className="">
              <div className="sidebar-cabecalho">
                <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-4 mt-3">
                  <span
                    style={{ margin: "15px" }}
                    className="ms-4 fs-4 d-none d-sm-inline"
                  >
                    <img src={Logo} style={{ maxWidth: "70px" }}></img>
                  </span>
                </a>
                <CloseButton variant="white" onClick={handleSidebarStatus} />
              </div>
              <hr className="text-white d-none d-sm-block" />
              <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                {menus.map((menu, key) => {
                  if (!menu.submenus) {
                    if (!menu.modulo || menu?.modulo?.filter(f => f == auth._user.perfil).length > 0) {
                      return (
                        <li key={key} className="nav-item text-while fs-4 my-1 py-2 py-sm-0">
                          <a
                            onClick={() => handleHome(menu.path)}
                            className="nav-link text-white fs-5"
                            aria-current="page"
                          >
                            <i className={menu.icon}></i>
                            <span className="ms-3 d-none d-sm-inline">
                              {menu.name}
                            </span>
                          </a>
                        </li>
                      );
                    }
                  } else {
                    if (!menu.modulo || menu?.modulo?.filter(f => f == auth._user.perfil).length > 0) {
                      return (
                        <Accordion
                          key={key}
                          activeKey={activeKey}
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Accordion.Item
                            eventKey="0"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Accordion.Header onClick={() => toggleAccordion("0")}>
                              <i className={menu.icon}></i>
                              <span className="ms-3 fs-5 d-none d-sm-inline">
                                {menu.name}
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              {menu.submenus.map((submenu, key) => {
                                if (!submenu.modulo || submenu?.modulo?.filter(f => f == auth._user.perfil).length > 0) {
                                  return (
                                    <li key={key} className="nav-item text-while fs-4 my-1 py-2 py-sm-0">
                                      <a
                                        onClick={() => handleHome(submenu.path)}
                                        className="nav-link text-white fs-5 p-2"
                                        aria-current="page"
                                      >
                                        <i className={submenu.icon}></i>
                                        <span className="ms-3 d-none d-sm-inline">
                                          {submenu.name}
                                        </span>
                                      </a>
                                    </li>
                                  );
                                }
                              })}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
                    }
                  }
                })}
              </ul>
            </div>
            <div className="dropdown open">
              <a
                className="text-decoration-none text-white dropdown-toggle p-3"
                type="button"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
                <span className="ms-2 d-none d-sm-inline">Meu Perfil</span>
              </a>
              <div className="dropdown-menu item" aria-labelledby="triggerId">
                {true ? (
                  <>
                    <a className="dropdown-item" href="#">
                      Perfil
                    </a>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Sair
                    </a>
                  </>
                ) : (
                  <a className="dropdown-item" onClick={handleLogin}>
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
            className="bi bi-list"
            style={{ fontSize: "2em", color: "#fff", cursor: "pointer" }}
            onClick={handleSidebarStatus}
          ></i>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
