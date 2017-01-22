import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BrewdogAPI from './../api/brewdog';

export default class extends React.Component {

    /**
     * @param query
     * @returns {{beer: Object}}
     */
    static async getInitialProps({query}) {
        const id = query.id;
        const res = await BrewdogAPI.getBrewDetails(id);

        return {beer: res.data};
    }

    /**
     * @inheritDoc
     */
    render() {
        console.log(this.props.beer);
        return (
            <div>
                <Head>
                    <title>League Table</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.1/build/pure-min.css"/>
                </Head>

                <div className="pure-g">
                    <div className="pure-u-8-24"></div>
                    <div className="pure-u-4-24">
                        <h2>{this.props.beer.name}</h2>
                        <h3>{this.props.beer.tagline}</h3>
                    </div>
                    <div className="pure-u-12-24">
                        <img src={this.props.beer.image_url}/>
                        <p>{this.props.beer.description}</p>

                        <ul>
                            {this.props.beer.food_pairing.map((food, i) => {
                                return (
                                    <li>
                                        {food}
                                    </li>
                                );
                            })}
                        </ul>
                        <Link href="/">To catalog</Link>
                    </div>
                </div>
            </div>
        )
    }
}