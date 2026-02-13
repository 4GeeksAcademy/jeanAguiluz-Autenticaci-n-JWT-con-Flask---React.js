import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: "logout" });
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JWT Authentication</span>
				</Link>
				<div className="ml-auto">
					{store.token ? (
						<>
							<Link to="/private" className="me-3">
								<button className="btn btn-warning">Área privada</button>
							</Link>
							<button className="btn btn-danger" onClick={handleLogout}>
								Cerrar Sesión
							</button>
						</>
					) : (
						<>
							<Link to="/signup" className="me-3">
								<button className="btn btn-secondary">Registro</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-success">Iniciar sesión</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
