import Navegacao from '../../components/Navegacao/Navegacao';
import { useState, useEffect } from 'react';
import UsuarioRequests from '../../fetch/UsuarioRequests';
import CardUsuario from '../../components/CardUsuario/CardUsuario';
import Button from 'react-bootstrap/Button';
import styles from './Usuario.module.css';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4;

    useEffect(() => {
        const fetchUsuarios = async () => {
            const listaUsuarios = await UsuarioRequests.listarUsuarios();
            setUsuarios(listaUsuarios);
        };

        fetchUsuarios();
    }, []);

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const usuariosExibidas = usuarios.slice(indiceInicial, indiceFinal);
    const totalPaginas = Math.ceil(usuarios.length / itensPorPagina);

    const proximaPagina = () => {
        if (indiceFinal < usuarios.length) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    return (
        <>
            <Navegacao />
            <div className={styles.cardsContainer}>
                {usuariosExibidas.map(usuario => (
                    <CardUsuario key={usuario.id} usuario={usuario} className={styles.cards} />
                ))}
            </div>
            <div className={styles.paginacao}>
                <Button onClick={paginaAnterior} disabled={paginaAtual === 1} className={styles.botao}>
                    {<GrFormPrevious className={styles.iconBotao} />}
                </Button>
                <Button onClick={proximaPagina} disabled={indiceFinal >= usuarios.length} className={styles.botao}>
                    {<GrFormNext className={styles.iconBotao} />}
                </Button>
            </div>
            <p style={{ textAlign: 'center' }}>Página {paginaAtual} de {totalPaginas}</p>
        </>
    );
}

export default Usuario;
