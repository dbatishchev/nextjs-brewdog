import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout'
import BrewdogAPI from './../api/brewdog';

export default class extends React.Component {

    /**
     * @returns {{data: Object[]}}
     */
    static async getInitialProps({query}) {
        let page = query.page || 1;
        let countPerPage = 10;

        const res = await BrewdogAPI.getBrewList(page, countPerPage);

        return {
            page: page,
            countPerPage: countPerPage,
            data: res.data,
        };
    }

    /**
     * @inheritDoc
     */
    render () {
        const nextPage = 1 + +this.props.page;
        return (
            <Layout>
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
                <Link href={`/?page=${nextPage}`}>Next page</Link>
            </Layout>
        );
    }
}