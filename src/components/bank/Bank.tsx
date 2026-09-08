import './bank.scss';
import {useBank} from "../../hooks/useBank.ts";
import {useState} from "react";


export function Bank() {
    const {items, isLoading, error} = useBank();
    const [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
        setIsOpen(!isOpen);
    }

    if(isLoading) return <p> Your bank is loading...</p>;
    if (error) return <p> Error : {error}</p>;

    return (
        <>
        {isOpen &&
            <div className="-bank unselectable">
                <div className="bank-details">
                    <div className="header">
                        <p>YOUR BANK</p>
                        <svg onClick={handleOpen} xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                             className="bi bi-x-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </div>
                    <div className="items">
                        {items.map(({code, quantity, item}) => (
                            <div className="bank-item" key={code}>
                                <div className="item-hover">{item?.name ?? code} x{quantity}</div>
                                <img src={`https://play.artifactsmmo.com/images/items/${code}.png`} alt={`${code}`} />
                                <div className="item-quantity">{quantity}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }
            <div className="-bank not-open" onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
                </svg>
                <p>BANK</p>
            </div>
        </>
    );
}