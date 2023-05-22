import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import api from '../../services/api'
import './styles.css'

export interface Teacher {
  id: string
  subject: string
  cost: number
  users: {
    name: string
    avatar: string
    bio: string
    whatsapp: string
  }
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.users.avatar} alt={teacher.users.name} />
        <div>
          <strong>{teacher.users.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.users.bio}</p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>

        <a
          target="_blank"
          rel="noreferrer noopener"
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.users.whatsapp}`}
        >
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem
