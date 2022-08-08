import React from 'react'
import { useHistory } from 'react-router-dom'

import Cart from '../../assets/cart.png'
import Person from '../../assets/person.png'
import { useUser } from '../../hooks/UserContext'
import {
    Container,
    ContainerLeft,
    PageLink,
    ContainerRight,
    ContainerText,
    Line,
    PageLinkExit
} from './styles'

export function Header() {
    const { logout, userData } = useUser()
    const {
        push,
        location: { pathname }
    } = useHistory()

    const logoutUser = () => {
        logout()
        push('/login')
    }
    return (
        <Container>
            <ContainerLeft>
                <PageLink onClick={() => push('/')} isActive={pathname === '/'}>
                    Home
                </PageLink>
                <PageLink
                    onClick={() => push('/produtos')}
                    isActive={pathname.includes('produtos')}
                >
                    Ver Produtos
                </PageLink>
            </ContainerLeft>

            <ContainerRight>
                <PageLink onClick={() => push('/carrinho')}>
                    <img src={Cart} alt="carrinho" />
                </PageLink>
                <Line></Line>
                <PageLink>
                    <img src={Person} alt="person" />
                </PageLink>

                <ContainerText>
                    <p>Olá, {userData.name}</p>
                    <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
                </ContainerText>
            </ContainerRight>
        </Container>
    )
}
