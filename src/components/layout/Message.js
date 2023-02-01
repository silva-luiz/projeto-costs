import {useState, useEffect} from 'react'

import styles from './Message.module.css'

function Message({ type, msg }){

    const [visible, setVisible] = useState(false) //começa não exibindo a mensagem

    useEffect(() => {

        if(!msg){ //se não tem mensagem: visibilidade = false ( não exibe ), retorna e encerra tudo
            setVisible(false)
            return
        }

        setVisible(true) //se tem mensagem: visibilidade = true

        const timer = setTimeout(() => { //começa o timer de 3 segundos
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer) //após os 3 segundos (3000 ms) o timer é limpo

    }, [msg])

    return(
       <>
            {visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
       </>
    )
}

export default Message