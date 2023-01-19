/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from '@/styles/Details.module.css'
import Link from 'next/link'

//it returns an object that has different paths 
//that should be generated and are specified by params
//in this case id
export async function getStaticPaths(){
    const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`)
    const pokemon = await resp.json()

    return{
        paths: pokemon.map((pokemon) => ({
            params: {id:pokemon.id.toString()}
        })),
        fallback:false
    }
}

export async function getStaticProps({params}){

    const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`)

    return{
        props:{
            pokemon: await resp.json()
        }
    }
}

export default function Details({pokemon}){



    return (
        <div>
            <Head>
                {pokemon.name}
            </Head>
            <div>
                <Link href="/">
                    Back to Home
                </Link>
            </div>
            <div className={styles.layout}>
                <div>
                <img className={styles.picture} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
                </div>
                <div>
                    <div className={styles.name}>{pokemon.name}</div>
                    <div className={styles.type}>{pokemon.type.join(', ')}</div>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>

                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map(({name, value}) => (
                                <tr key={name}>
                                    <td className={styles.attribute}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}