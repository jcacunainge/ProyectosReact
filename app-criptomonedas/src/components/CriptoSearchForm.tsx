import { ChangeEvent, useState } from "react"
import { currencies } from "../data"
import { useCryptoStore } from "../store/store.cripto"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

export default function CriptoSearchForm() {

    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)
    const [pair, setPair] = useState<Pair>({
        currency:"",
        criptocurrency:''
    })

    const [error, setError ] = useState('')
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    } 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(Object.values(pair).includes('')){
            setError('Todos los Campos son obligatorios')
            return
        }
        setError('')
        fetchData(pair)
    }
    return (
        <form className="form"
        onSubmit={ handleSubmit }
        >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda:</label>
                <select
                    name="currency"
                    id="currency"
                    onChange={ handleChange}
                    value={pair.currency}
                >
                    <option value=""> -- Seleccione -- </option>
                    {currencies.map(currencies => (
                        <option key={currencies.code} value={currencies.code}>{currencies.name}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="currency">Criptomoneda:</label>
                <select
                    name="criptocurrency"
                    id="criptocurrency"
                    onChange={ handleChange }
                    value={pair.criptocurrency}
                >
                    <option
                        value=""
                    > -- Seleccione --
                    </option>
                    {cryptocurrencies.map(cryto => (
                        <option
                            value={cryto.CoinInfo.Name}
                            key={cryto.CoinInfo.Name}>{cryto.CoinInfo.FullName}</option>
                    ))}
                </select>
            </div>
            <input className="btn" type="submit" value="Cotizar" />
        </form>
    )
}
