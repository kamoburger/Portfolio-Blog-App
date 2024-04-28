import sx from "./Header.module.css"
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faFilePen, faHouse } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div className={sx.container}>
            <Link href={"/"} className={sx.logo}>
                <FontAwesomeIcon icon={faBlog} className={sx.fablog}/>
                <p>PortFolio</p>
            </Link>
            <div className={sx.rightLayout}>
                <Link href={"/"} className={sx.home}>
                    <div className={sx.border}></div>
                    <FontAwesomeIcon icon={faHouse} className={sx.faHouse}/>
                    <p>HOME</p>
                </Link>
                <Link href={"/post"} className={sx.post}>
                    <div className={sx.border}></div>
                    <FontAwesomeIcon icon={faFilePen} className={sx.faFilePen}/>
                    <p className={sx.form}>投稿フォーム</p>
                    <div className={sx.border}></div>
                </Link>
            </div>
        </div>
    )
}

export default Header