import { Card } from "@/types/card";
import { storageGet, storageSet, storageRemove } from "@/lib/safeStorage";
const maxCards = 3

export function getCards(email: string): Card[] {
    const saved = storageGet(`cards_${email}`, null);
    if(saved) {
        return saved;
    } else {
        return []
    }
}

export function saveCards(email: string, cards: Card[]): void {
    storageSet(`cards_${email}`, cards);
}

export function addCard(email: string, card: Omit<Card, "id" | "balance">): boolean {
    const cards = getCards(email);

    if(cards.length >= maxCards) {
        return false;
    }
    const isDuplicate = cards.some((c) => {
        return c.cardNumber === card.cardNumber
    })
    if(isDuplicate) {
        return false
    }
    const newCard: Card = {
        ...card, id: Date.now().toString(), balance: 1000
    }
    cards.push(newCard)
    saveCards(email, cards)
    return true;
}

export function deductBalance(email: string, cardId: string, amount: number): boolean {
    const cards = getCards(email);
    const card = cards.find((card) => {
        return card.id === cardId
    })

    if(!card || card.balance < amount) {
        return false;
    }
    card.balance = card.balance - amount;
    saveCards(email, cards);

    return true;
}

export function deleteCard(email: string, cardId:string):void {
    const cards = getCards(email).filter((card) => {
        return card.id !== cardId;
    })
    saveCards(email, cards)
}