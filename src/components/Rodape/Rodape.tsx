import { JSX } from 'react';
import estilo from './Rodape.module.css';

function Rodape(): JSX.Element {
  return (
    <footer className={estilo.rodape}>
      <div className={estilo.coluna}>
        <h1>MEDCLINIC</h1>
        <h5>CLÍNICA MÉDICA</h5>
      </div>

      <div className={estilo.colunaIcones}>
        <div>
        <img src="/src/assets/whatsapp.png" alt="whatsapp" />
          <p>16 9234-1908</p>
        </div>
        <div>
          <img src="/src/assets/instagram.png" alt="instagram" />
          <p>MedClinic</p>
        </div>
        <div>
          <img src="/src/assets/email.png" alt="email" />
          <p>MedClinicCentroMedico@gmail.com</p>
        </div>
        <div>
          <img src="/src/assets/facebook.png" alt="facebook" />
          <p>MedClinic Centro Médico</p>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;
