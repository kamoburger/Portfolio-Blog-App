"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBars, faUser, faCircleExclamation, faBlog, faCircleInfo, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons';
import sx from "../styles/Home.module.css"
import Header from '@/components/Header/Header';
import Link from 'next/link';
import { Router, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import Footer from '@/components/Footer/Footer';

import { useSearchParams } from "next/navigation";

export default function Index() {

    const router = useRouter()

    const searchParams = useSearchParams()
    const flashMassage = searchParams.get("flashMassage")
    const status = searchParams.get("status")

    const [data, setData] = useState([])
    const [deleteToggle, setDeleteToggle] = useState(false)
    const [isFetched, setIsFetched] = useState(false)
    const [isFailured, setIsFailured] = useState(false)

    useEffect(() => {

        fetch("https://cf483374.cloudfree.jp/backend/api/blogs")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch(() => setIsFailured(true))
        .finally(() => {
            setIsFetched(true)
        });
        
    }, [deleteToggle])

    const handleReload = (e) => {
        e.preventDefault();
        window.location.reload()
    } 

    return (
        <><title>【ポートフォリオサイト】ブログ一覧</title>
        <main className={sx.main}>
            <div className={sx.header}>
                <Header></Header>
            </div>
            {isFailured ? 
                <><div className={sx.container}>
                            <div className={sx.blogTitle}>
                                <FontAwesomeIcon icon={faBars} className={sx.faBars}/>
                                <h1 className={sx.h1}>ブログ一覧</h1>
                            </div>
                            <div className={sx.failureMassage}>
                                <div className={sx.failureWrapper}>
                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                    <p className={sx.resultMassage}>ブログの取得に失敗しました</p>
                                </div>
                            </div>
                            <Link href={"/"} className={sx.blog} onClick={(e) => handleReload(e)}>
                                <div className={sx.dbError}>
                                    <h1 className={sx.dbErrorMessage}>データベースに接続できませんでした</h1>
                                </div>
                                <div className={sx.dbSub}>
                                    <h2 className={sx.dbSubMessage}>以下の手順をお試しください</h2>
                                </div>
                                <p className={sx.infoMessage}>お使いのブラウザの <FontAwesomeIcon icon={faRotateRight} /> 再読み込みボタン、もしくはこのセクションをクリックしてページを再読み込みを行ってください</p>
                                <div className={sx.underUi}>
                                    <div className={sx.toDetail}>
                                        <FontAwesomeIcon icon={faArrowRight} className={sx.faArrowRight}/>
                                        <p>クリックしてページを再読み込み</p>
                                    </div>
                                </div>
                            </Link>
                </div></> : <p></p>}
            {data.length !== 0 && !isFailured ? (
                <div className={sx.container}>
                    <div className={sx.blogTitle}>
                        <FontAwesomeIcon icon={faBars} className={sx.faBars}/>
                        <h1 className={sx.h1}>ブログ一覧</h1>
                    </div>
                    {searchParams.size !== 0 ? 
                        status === "success" ? (
                            <div className={sx.successMassage}>
                                <div className={sx.successWrapper}>
                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                    <p className={sx.resultMassage}>{flashMassage}</p>
                                </div>
                            </div>
                        ) : <p></p> : 
                    <p></p>}

                    {searchParams.size !== 0 ? 
                        status === "failure" ? (
                            <div className={sx.failureMassage}>
                                <div className={sx.failureWrapper}>
                                    <FontAwesomeIcon icon={faCircleExclamation} className={sx.faCircleExclamation}/>
                                    <p className={sx.resultMassage}>{flashMassage}</p>
                                </div>
                            </div>
                        ) : <p></p> : 
                    <p></p>}
                    
                    {data.length !== 0 ? data.map((flag) => {

                        const updated_at = new Date(flag.updated_at)
                        const year = updated_at.getFullYear().toString()
                        const month = updated_at.getMonth().toString()
                        const date = updated_at.getDate().toString()
                        const hour = updated_at.getHours().toString().padStart(2, "0")
                        const minutes = updated_at.getMinutes().toString().padStart(2, "0")

                        return (
                            <Link href={`/detail/${flag.id}`} key={flag.id} className={sx.blog}>
                                <div className={sx.topUi}>
                                    <div className={sx.user}>
                                        <FontAwesomeIcon icon={faUser} className={sx.faUser}/>
                                        <p>名無しのユーザー</p>
                                    </div>
                                    <p>{`ID:${flag.id}`}</p>
                                </div>
                                <h2 className={sx.title}>{flag.title}</h2>
                                <p className={sx.content}>{flag.content.length > 50 ? (flag.content.substring(0, 50) + "…") : (flag.content)}</p>
                                <div className={sx.underUi}>
                                    <div className={sx.date}>
                                        <FontAwesomeIcon icon={faClock} className={sx.faClock}/>
                                        <p>{`${year}年${Number(month) + 1}月${date}日 ${hour}:${minutes}`}</p>
                                    </div>
                                    <div className={sx.toDetail}>
                                        <FontAwesomeIcon icon={faArrowRight} className={sx.faArrowRight}/>
                                        <p className={sx.detailMessage}>記事をクリックして詳細へ</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : <p></p>}
                </div>
                ) : isFetched && !isFailured ? 
                        <div className={sx.container}>
                            <div className={sx.blogTitle}>
                                <FontAwesomeIcon icon={faBars} className={sx.faBars}/>
                                <h1 className={sx.h1}>ブログ一覧</h1>
                            </div>
                            <div className={sx.failureMassage}>
                                <div className={sx.failureWrapper}>
                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                    <p className={sx.resultMassage}>ブログが投稿されていません</p>
                                </div>
                            </div>
                            <Link href={`/post`} className={sx.blog}>
                                <div className={sx.welcome}>
                                    <h1 className={sx.welcomeMessage}>PortFolioへようこそ！</h1>
                                </div>
                                <div className={sx.recomend}>
                                    <h2 className={sx.recomendMessage}>まずはブログを投稿しましょう！</h2>
                                </div>
                                <p className={sx.infoMessage}>ページ上部の「投稿フォーム」、もしくはこのセクションをクリックしてブログの投稿を始めましょう！</p>
                                <div className={sx.underUi}>
                                    <div className={sx.toDetail}>
                                        <FontAwesomeIcon icon={faArrowRight} className={sx.faArrowRight}/>
                                        <p>クリックして投稿を始める</p>
                                    </div>
                                </div>
                            </Link>
                        </div> : <p></p>
                }

            <Footer></Footer>
        </main></>
    )
}