import React , { useState } from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link , useHistory } from 'react-router-dom'

import api from '../../services/api'

import HeroesImg from '../../assets/heroes.png'
import LogoImg from '../../assets/logo.svg'

export default function Logon(){
  const history = useHistory()
  const [ id , setId] = useState('')
  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('sessions', { id })

      localStorage.setItem('ongId',id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch(err){
      alert('Falha no Login')
    }
  }
  return(
    <div className="logon-container">
      <section className="form">
        <img src={LogoImg} alt="Logo"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
          placeholder="Sua ID"
          value={id}
          onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>

      </section>

      <img src={HeroesImg} alt="Heroes" />
    </div>
  )
}