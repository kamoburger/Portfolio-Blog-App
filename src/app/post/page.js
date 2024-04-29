"use client";
import sx from "../../styles/post.module.css"
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBars, faUser, faCircleExclamation, faPen } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons';
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Post() {

    const initialValues = {title: "", content: ""};
    const initialErrors = {title: "", content: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrors);
    const [isSubmit, setIsSubmit] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [isFetched, setIsFetched] = useState(false)

    const router = useRouter();

    useEffect (() => {

        if (Object.keys(formErrors).length === 0 && isSubmit === true) {

            setIsSubmit(false)
            setFormValues(initialValues);
            post()

        } 

        setIsFetched(true)

    }, [toggle])

    useEffect (() => {
        if (isSubmit){
            setFormErrors(validate(formValues));
        }
    }, [formValues])

    const handleChange = (e) => {
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

        const result = window.confirm(`本当に投稿しますか？`);
        if (result) {
            setFormValues(formValues)
            const url = "https://cf483374.cloudfree.jp/backend/api/store";
            const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: formValues.title, content: formValues.content })
            };

            fetch(url, options).then((res) => {
                if (res.status !== 200) {
                    throw new Error;
                } else {
                    const flashMassage = {flashMassage: "ブログを投稿しました", status: "success"}
                    const URLflashMassage = new URLSearchParams(flashMassage)
                    router.push(`/?${URLflashMassage}`);
                }
            }).catch(() => {
                const flashMassage = {flashMassage: "ブログの投稿に失敗しました", status: "failure"}
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
        } else if (values.title.length > 15) {
            errors.title = "タイトルは15字以内で入力してください"
        }
        if (!values.content) {
            errors.content = "本文を入力してください";
        } else if (values.content.length < 10) {
            errors.content = "本文は10字以上で入力してください"
        } else if (values.content.length > 150) {
            errors.content = "本文は150字以下で入力してください"
        }
        return errors
    }

    return(
        <><title>【ポートフォリオサイト】ブログ投稿</title>
        <main className={sx.main}>
            <div className={sx.header}>
                <Header></Header>
            </div>
            {isFetched ? <>
                <div className={sx.container}>
                    <div className={sx.blogTitle}>
                        <FontAwesomeIcon icon={faBars} className={sx.faBars}/>
                        <h1 className={sx.h1}>ブログ投稿</h1>
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
                </div></> : <p></p>}
            <Footer></Footer>
        </main></>
    );
}