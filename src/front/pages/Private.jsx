import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Cargando contenido privado...");
    const [loading, setLoading] = useState(true);

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (!store.token) {
            navigate("/login");
            return;
        }

        const fetchPrivateData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/private`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${store.token}`,
                    },
                });

                const data = await response.json();
                setLoading(false);

                if (response.ok) {
                    setMessage(`${data.msg} | Usuario: ${data.user.email}`);
                    return;
                }

                dispatch({ type: "logout" });
                setMessage(data.msg || "Token inválido o expirado. Redirigiendo a Login.");
                navigate("/login");
            } catch (error) {
                console.error("Error al obtener datos privados:", error);
                setMessage("Error de red al conectar con el servidor.");
                setLoading(false);
            }
        };

        fetchPrivateData();
    }, [store.token, navigate, dispatch, BASE_URL]);

    return (
        <div className="container mt-5 text-center">
            <div className="alert alert-warning">
                <strong>PÁGINA PROTEGIDA</strong>
                <p>Solo los usuarios autenticados pueden ver este contenido.</p>
            </div>

            <div className="card shadow p-4">
                <h2>{loading ? "Verificando credenciales..." : "Mensaje del servidor"}</h2>
                <hr />
                <p className={`lead ${!loading && message.includes("Acceso autorizado") ? "text-success" : "text-danger"}`}>
                    {message}
                </p>

                <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/")}>
                    Volver al Home
                </button>
            </div>
        </div>
    );
};
