import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'

import Offers from '../../assets/offers.png'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import { Container, CategoryImg, ContainerItems, Image, Button } from './styles'

export function OffersCarousel() {
    const [offers, setOffers] = useState([])

    useEffect(() => {
        async function loadOffers() {
            const { data } = await api.get('products')
            const onlyOffers = data
                .filter(product => product.offer)
                .map(product => {
                    return {
                        ...product,
                        formatedPrice: formatCurrency(product.price)
                    }
                })

            setOffers(onlyOffers)
        }

        loadOffers()
    }, [])

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 400, itemsToShow: 2 },
        { width: 600, itemsToShow: 3 },
        { width: 900, itemsToShow: 4 },
        { width: 1300, itemsToShow: 4 }
    ]
    return (
        <Container>
            <CategoryImg src={Offers} alt="Offer logo" />

            <Carousel
                itemsToShow={5}
                style={{ width: '90%' }}
                breakPoints={breakPoints}
            >
                {offers &&
                    offers.map(products => (
                        <ContainerItems key={products.id}>
                            <Image src={products.url} alt="Image product" />
                            <p>{products.name}</p>
                            <p>{products.formatedPrice}</p>
                            <Button>Peça Agora</Button>
                        </ContainerItems>
                    ))}
            </Carousel>
        </Container>
    )
}
