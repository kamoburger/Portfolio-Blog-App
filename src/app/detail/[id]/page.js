"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBars, faUser, faCircleExclamation, faArrowLeft, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons';
import Header from '@/components/Header/Header';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import sx from "../../../styles/detail.module.css"
import Footer from '@/components/Footer/Footer';

export default function Detail({params}) {

    const [data, setData] = useState({})
    const [fetchFailure, setFetchFailure] = useState(false)
    const [isFetched, setIsFetched] = useState(false)

    const id = params.id

    useEffect(() => {

        if (id) {
            fetch(`https://cf483374.cloudfree.jp/backend/api/blog/${id}`)
                .then((res) => res.json())
                .then((json) => {
                    setData(json);
                })
                .catch(() => setFetchFailure(true))
                .finally(() => {
                    setIsFetched(true)
                });
        }

    }, [id])

    const handleEdit = async (e) => {

        e.preventDefault();

        const body = { title: data.title, content: data.content }
        router.push({ pathname: `/edit/${id}`, query: body });

    }

    const handleDelete = async (e, id, title) => {

        e.preventDefault();

        const result = window.confirm(`記事「${title}」を削除してもよろしいですか？`);

        if (result) {

            const url = `https://cf483374.cloudfree.jp/backend/api/delete/${id}`;

            await fetch(url, { method: 'POST' })
                .then((res) => {
                    if (res.status === 200) {
                        const flashMassage = { flashMassage: "ブログを削除しました", status: "success" }
                        router.push({ pathname: "/", query: flashMassage }, "/");
                    } else {
                        throw new Error;
                    }
                })
                .catch(() => {
                    const flashMassage = { flashMassage: "ブログの削除に失敗しました", status: "failure" }
                    router.push({ pathname: "/", query: flashMassage }, "/");
                });

        } else {
            return
        }
    }

    return (
        <><title>【ポートフォリオサイト】ブログ詳細</title>
        <main className={sx.main}>
            <div className={sx.header}>
                <Header></Header>
            </div>
            {(() => {
                if (Object.keys(data).length !== 0) {

                    const updated_at = new Date(data.updated_at)
                    const year = updated_at.getFullYear().toString()
                    const month = updated_at.getMonth().toString()
                    const date = updated_at.getDate().toString()
                    const hour = updated_at.getHours().toString().padStart(2, "0")
                    const minutes = updated_at.getMinutes().toString().padStart(2, "0")

                    return (
                        <div className={sx.container}>
                            <div className={sx.blogTitle}>
                                <FontAwesomeIcon icon={faBars} className={sx.faBars}/>
                                <h1 className={sx.h1}>ブログ詳細</h1>
                            </div>
                            {Object.keys(data).length >= 4 ?
                                <div className={sx.blog}>
                                    <div className={sx.topUi}>
                                        <div className={sx.user}>
                                            <FontAwesomeIcon icon={faUser} className={sx.faUser}/>
                                            <p>名無しのユーザー</p>
                                        </div>
                                    <p>{`ID:${data.id}`}</p>
                                    </div>
                                    <h2 className={sx.title}>{data.title}</h2>
                                <p className={sx.content}>{data.content}</p>
                                <div className={sx.underUi}>
                                    <div className={sx.date}>
                                        <FontAwesomeIcon icon={faClock} className={sx.faClock}/>
                                        <p>{`${year}年${Number(month) + 1}月${date}日 ${hour}:${minutes}`}</p>
                                    </div>
                                    <div className={sx.toDetail}>
                                        <Link href={"/"} className={sx.return}>
                                            <FontAwesomeIcon icon={faArrowLeft} className={sx.faArrowLeft}/>
                                            <p>戻る</p>
                                        </Link>
                                        <Link href={"/"} onClick={(e) => handleEdit(e)} className={sx.edit}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={sx.faPenToSquare}/>
                                            <p>編集</p>
                                        </Link>
                                        <Link href={"/"} onClick={(e) => handleDelete(e, data.id, data.title)} className={sx.detele}>
                                            <FontAwesomeIcon icon={faTrash} className={sx.faTrash}/>
                                            <p>削除</p>
                                        </Link>
                                    </div>
                                </div>
                            </div> :
                                (
                                    <div>
                                        <p>記事が見つからなかった…</p>
                                        <Link href={"/"}>戻る</Link>
                                    </div>
                                )}
                        </div>
                    )

                } else if (fetchFailure) {
                    return (
                        <div>
                            <p>ブログを取得できませんでした</p>
                            <Link href={"/"}>戻る</Link>
                        </div>
                    )
                } else {
                    return <p></p>
                }
            })()}
            {isFetched && isFetched ? <Footer></Footer> : <p></p>}
        </main></>
    )
}
