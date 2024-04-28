"use client";
import sx from "../../../styles/edit.module.css";
import Header from '@/components/Header/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBars, faUser, faCircleExclamation, faPen } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons';
import Footer from "@/components/Footer/Footer";

import { useSearchParams } from "next/navigation";

export default function Edit({params}) {

    const router = useRouter();
    const id = params.id

    const searchParams = useSearchParams();
    const title = searchParams.get("title");
    const content = searchParams.get("content");
    

    const initialValues = {title: "", content: ""};
    const initialErrors = {title: "", content: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrors);
    const [isSubmit, setIsSubmit] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFetched, setIsFetched] = useState(false)

    useEffect (() => {

        if (id && isLoaded === false) {
            setFormValues({title: title, content: content})
            setIsLoaded(true)
        }

        if (Object.keys(formErrors).length === 0 && isSubmit === true) {

            setIsSubmit(false)
            setFormValues(initialValues);
            post()

        }

        setIsFetched(true)

    }, [toggle, id])

    useEffect (() => {
        if (isSubmit){
            setFormErrors(validate(formValues));
        }
    }, [formValues])

    const handleChange = (e) => {
        // console.log(e.target);
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        setIsSubmit(true)
        setFormErrors(validate(formValues));
        setToggle((toggle) => !toggle)
    }

    const post = async() => {

        const result = window.confirm(`本当に更新しますか？`);
        if (result) {
            setFormValues(formValues)
            const url = `https://cf483374.cloudfree.jp/backend/api/update/${id}`;
            const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: formValues.title, content: formValues.content })
            };

            fetch(url, options).then((res) => {
                if (res.status !== 200) {
                    throw new Error("データベースに接続できませんでした");
                } else {
                    const flashMassage = {flashMassage: "ブログを更新しました", status: "success"}
                    const URLflashMassage = new URLSearchParams(flashMassage)
                    router.push(`/?${URLflashMassage}`);
                }
            }).catch(() => {
                const flashMassage = {flashMassage: "ブログの更新に失敗しました", status: "failure"}
                const URLflashMassage = new URLSearchParams(flashMassage)
                router.push(`/?${URLflashMassage}`);
            });
        } else {
            setFormValues(formValues)
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = "タイトルを入力してください";
        }
        if (!values.content) {
            errors.content = "本文を入力してください";
        } else if (values.content.length < 10) {
            errors.content = "本文は10字以上で入力してください"
        }
        return errors
    }

    return (
        <><title>【ポートフォリオサイト】ブログ編集</title>
        <main className={sx.main}>
            <div className={sx.header}>
                <Header></Header>
            </div>
            {isFetched && isLoaded ? <>
                <div className={sx.container}>
                    <div className={sx.blogTitle}>
                        <FontAwesomeIcon icon={faBars} className={sx.faBars}/>
                        <h1 className={sx.h1}>ブログ更新</h1>
                    </div>
                    <div className={sx.blog}>
                        <div className={sx.title}>
                            <FontAwesomeIcon icon={faPen} className={sx.faPen}/>
                            <p className={sx.titleText}>タイトル</p>
                            <p>15文字以内</p>
                        </div>
                        <input type="text" name="title" placeholder="タイトル" onChange={(e) => handleChange(e)} value={formValues.title} className={sx.inputTitle}/>
                        {isSubmit && formErrors.title ? 
                            <div className={sx.failureWrapper}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                <p className={sx.resultMassage}>{formErrors.title}</p>
                            </div> : <p></p>}
                        <div className={sx.content}>
                            <FontAwesomeIcon icon={faPen} className={sx.faPen}/>
                            <p className={sx.contentText}>本文</p>
                            <p>10文字以上150文字以内</p>
                        </div>
                        <textarea name="content" cols="30" rows="10" placeholder="入力してください" onChange={(e) => handleChange(e)} value={formValues.content} className={sx.inputContent} wrap="hard"></textarea>
                        {isSubmit && formErrors.content ? 
                            <div className={sx.failureWrapper}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                <p className={sx.resultMassage}>{formErrors.content}</p>
                            </div> : <p></p>}
                        <Link href={"/"} className={sx.post} onClick={(e) => handleSubmit(e)}>
                            <p>投稿する</p>
                        </Link>
                        <Link href={"/"} className={sx.exit}>
                            <p>戻る</p>
                        </Link>
                    </div>
                </div>
            {isFetched && isLoaded ? <Footer></Footer> : <p></p>} </> : <p></p>}
        </main></>
    )
}
