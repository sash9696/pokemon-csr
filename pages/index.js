/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'


//Server Side Rendering

  //fetch at server side time
  //requests goes and it gathers up the data
  //and then returnns an objet that has props in it
  //and then these props are send to react components to render data


  //when we make a request to the home page
  //that calls getServerSideProps first then will are getting
  //all that data in props and the we pass it to the component
  //for rendering

  //we can also combine it with client side for some part of data
  //that can be requested on client after the page loads

  //so now everything is written on the server side
  //and then going over the client
  //so in terms of network traffic, its really great
  //beacuse all of the network connection to liek your backend services
  //databases etc thats all happening on the server side
  //so its super efficient and customers bandwidth is not
  //wasted by having them go back to apis
  export async function getServerSideProps(){
    const resp = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')

    return {
      props: {
        pokemon: await resp.json()
      }
    }
  }


export default function Home({pokemon}) {



 
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.grid}>
        {pokemon?.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                
                    <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
                    <h3>{pokemon.name}</h3>
                 
              </Link>

          </div>
        ))
      }</div>
 
    </div>
  )
}
