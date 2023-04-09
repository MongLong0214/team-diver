import Head from "next/head"
import Layout from "@/components/Layout"
import styles from '@/styles/Home.module.css'

const main = (): JSX.Element => {
  return <>
    <Head>
      <title>Team Diver</title>
    </Head>
    <main>
      <Layout />
    </main>
  </>
}

export default main