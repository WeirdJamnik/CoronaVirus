import React from 'react'
import Card from './Card'
import NumberFormat from 'react-number-format'

const CovidSwiat = (props) => {
    const {
        totalConfirmed,
        totalRecovered,
        totalDeaths,
        country
    } = props;

    return (
        <div>
            <div>
                <h1 style={{textTransform: 'capitalize'}}>{country === '' ? 'World Wide Corona Report': country}
                </h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Card>
                        <span>Liczba zarażonych</span><br />
                        <span>{<NumberFormat 
                        value={totalConfirmed} 
                        displayType={'text'}
                        thousandSeparator={true}
                        />}
                        </span>
                    </Card>
                    <Card>
                        <span>Liczba wyzdrowiałych</span><br />
                        <span>{<NumberFormat 
                        value={totalRecovered} 
                        displayType={'text'}
                        thousandSeparator={true}
                        />}
                        </span>
                    </Card>
                    <Card>
                        <span>Liczba śmierci</span><br />
                        <span>{<NumberFormat 
                        value={totalDeaths} 
                        displayType={'text'}
                        thousandSeparator={true}
                        />}
                        </span>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default CovidSwiat