import { useMemo } from "react"
import { useCryptoStore } from "../store/store.cripto"

export default function CryptoPriceDisplay() {
    const result = useCryptoStore((state) => state.result)

    const hasResult = useMemo(() => !Object.values(result).includes(''), [result])

    // console.log(hasResult)

    return (
        <div className="result-wrapper">

            {hasResult && (
                <>
                    <div className="content-2">
                        <h2>Cotización</h2>
                        <div className="result">
                            <img src={`https://cryptocompare.com/${result.IMAGEURL}`}></img>
                            <div>
                                <p>El precio es de: <span>{result.PRICE}</span></p>
                                <p>El precio es de: <span>{result.HIGHDAY}</span></p>
                                <p>El precio es de: <span>{result.LOWDAY}</span></p>
                                <p>El precio es de: <span>{result.CHANGEPCT24HOUR}</span></p>
                                <p>El precio es de: <span>{result.LASTUPDATE}</span></p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}

