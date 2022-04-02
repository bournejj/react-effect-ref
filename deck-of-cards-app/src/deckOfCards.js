import React, {useEffect, useState, useRef} from "react";
import {v4 as uuid} from 'uuid';
import axios from "axios";
import Card from "./Card.js";
import { getDefaultNormalizer } from "@testing-library/react";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";


const DeckOfCards = () => {
    // const [cards, setCards] = useState("");

    const deckId = useRef();
  const [cards, setCards] = useState([])
    const [card, setCard] = useState("")



    


    useEffect(() => {
  async function init() {
    await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(res => {
          deckId.current = res.data.deck_id
          console.log(deckId.current)
          
          
          
          
      })

      

  }
  init();
}, [])


  
  async function deal() {
  
     await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`).then(res => {
        deckId.current = res.data.deck_id
        setCard(res.data.cards[0])
        console.log(res.data.cards[0].suit)
        setCards(cards => [...cards, res.data.cards[0]])
        
       
        console.log(cards)
        
     
        
        
        
    })
  

    

}

// const Timer = () => {
//     const [seconds, setSeconds] = useState(0);
//     useEffect(() => {
//          setInterval(() => {
//              setSeconds(seconds => seconds + 1)
//          }, 1000)
        
//     }, [])
//     return <h1>{seconds}</h1>

// }

   
    return (
        <div>
            <h3>Deck of Cards</h3>

            <button onClick={() => deal( setInterval(deal(), 100000))}> Deal</button>
            
            
           
            <div>

                {cards.map((c) => (
                <h3>{c.value} - {c.suit}</h3>
                
                
                 )) }

            

            

           
                
                
                
           
               
                
            </div>
            




        </div>
    );
}

export default DeckOfCards;