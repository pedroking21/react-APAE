// Importa o tipo JSX do React para tipar corretamente o retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o componente Welcome
import estilo from './Welcome.module.css';

// Declara o componente funcional Welcome, que retorna uma estrutura JSX
function Welcome(): JSX.Element {
    return (
        // Elemento principal da página com classe de estilo personalizada
        <main className={estilo.principal}>
            {/* Mensagem de boas-vindas ao usuário */}
            <section className={estilo.margem}>
            <h1>MEDCLINIC</h1>
            </section>
            {/* Mensagem orientando o usuário a fazer login */}
            <section className={estilo.texto}>
            <p>Com humanização e </p>
            <p>inteligência tecnológica </p>
            <p>para cuidar com maior </p>
            <p>qualidade do seu paciente</p>
            </section>
        </main>
    );

};
      

// Exporta o componente para que possa ser utilizado em outras partes do projeto
export default Welcome;
