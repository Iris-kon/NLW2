import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/161b3f31756ca104e9979b902a4ac939cf4f01a8_full.jpg" alt="Thiago" />
                <div>
                    <strong>Thiago</strong>
                    <span>Biologia</span>
                </div>
            </header>

            <p>
                Palavras no aleatorio te troxeram aqui.
            <br /><br />
            Agora voce vai apreender com fuciona a genetica.
        </p>

            <footer>
                <p>
                    Preço/Hora
                <strong>R$ 50,00</strong>
                </p>

                <button>
                    <img src={whatsappIcon} alt="whatsapp" />
                Entrar em contato
            </button>
            </footer>
        </article>
    )
}

export default TeacherItem