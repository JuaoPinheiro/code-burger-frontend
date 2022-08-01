import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import LoginImg from '../../assets/burger1.svg'
import Logo from '../../assets/logo.svg'
import { Button } from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
    Container,
    LoginImage,
    ContainerItens,
    Label,
    Input,
    SignInLink,
    ErrorMessage
} from './styles'

export function Login() {
    const history = useHistory()
    const { putUserData } = useUser()

    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Digite um Email válido')
            .required('O Email é obrigatório'),
        password: Yup.string()
            .required('A senha é obrigatória')
            .min(6, 'A senha deve ter pelo menos 6 digitos')
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async clientData => {
        const { data } = await toast.promise(
            api.post('sessions', {
                email: clientData.email,
                password: clientData.password
            }),
            {
                pending: 'Verificando seus dados',
                success: 'Seja Bem-Vindo(a)!',
                error: 'Verifique seu email e senha🤯'
            }
        )

        putUserData(data)

        setTimeout(() => {
            history.push('/')
        }, 1000)
    }

    return (
        <Container>
            <LoginImage src={LoginImg} alt="burger-image" />
            <ContainerItens>
                <img src={Logo} alt="logo" />
                <h1>Login</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        {...register('email')}
                        error={errors.email?.message}
                    />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>

                    <Label>Senha</Label>
                    <Input
                        type="password"
                        {...register('password')}
                        error={errors.password?.message}
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>

                    <Button
                        type="submit"
                        style={{ marginTop: 75, marginBottom: 25 }}
                    >
                        Sign In
                    </Button>
                </form>
                <SignInLink>
                    Não possui conta?{' '}
                    <Link style={{ color: 'white' }} to="/cadastro">
                        Sign Up
                    </Link>
                </SignInLink>
            </ContainerItens>
        </Container>
    )
}
