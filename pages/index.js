import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect ,useState} from 'react'
import Link from 'next/link'


//Client Side Rendering
//In next js you are always doing server side rendering 
//but we can choose to write client side rendering in pages like this
//where we can stall the rendering util you get to the client
//That might be good choice for some usecases 
//like ecommerce app we can use cart and checkout page which are compeltely
//dynamic and where we not get any benefit of server side rendering


export default function Home() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    async function getPokemon(){
      const resp = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')
      setPokemon(await resp.json())
    }
    getPokemon()
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
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
