import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BrewdogAPI from './../api/brewdog';

export default class extends React.Component {

    /**
     * @constructor
     * @inheritDoc
     */
    constructor(props){
        super(props);
        this.page = 1;
        this.countPerPage = 2;
        this.loadMore = this.loadMore.bind(this);
    }

    /**
     * @returns {{data: Object[]}}
     */
    static async getInitialProps() {
        // todo this.page is undefined
        const res = await BrewdogAPI.getBrewList(this.page, this.countPerPage);

        return {data: res.data};
    }

    /**
     * @param e
     */
    async loadMore(e) {
        e.preventDefault();
        this.page++;
        const res = await BrewdogAPI.getBrewList(this.page, this.countPerPage);
        this.setProps(prevState => ({
            data: prevState.data.concat(res.data)
        }));
    }

    /**
     * @inheritDoc
     */
    render () {
        return (
            <div>
                <Head>
                    <title>Brewdog catalog</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.1/build/pure-min.css" />
                </Head>
                <div className="pure-g">
                    <div className="pure-u-1-3"></div>
                    <div className="pure-u-1-3">
                        <h1>Brewdog catalog</h1>
                        <ul>
                            {this.props.data.map((beer, i) => {
                                return (
                                    <li>
                                        {beer.name}
                                        <Link href={`/details?id=${beer.id}`}>More...</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <a href="#" onClick={this.loadMore}>
                    Load More
                </a>
            </div>
        );
    }
}