import React from 'react'
import sx from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faFilePen, faHouse } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <div className={sx.footer}>
        <div className={sx.wrapper}>
            <div className={sx.logo}>
                <FontAwesomeIcon icon={faBlog} className={sx.fablog}/>
                <p className={sx.logoText}>PortFolio</p>
            </div>
            <div className={sx.border}></div>
            <p className={sx.copy}>Copyright (C) PortFolio</p>
        </div>
    </div>
  )
}

export default Footer