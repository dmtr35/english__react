import React, { useContext, useState } from 'react'
import { Container, Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts"
import { registration, login } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'


const Auth = observer(() => {
    const navigate = useNavigate()
    const { user } = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)

                if (data) {
                    user.setIsAuth(true)
                    document.location.href = SHOP_ROUTE
                    // navigate(SHOP_ROUTE)
                }
            } else {
                data = await registration(email, password)
                if (data === "Пользователь был успешно зарегистрирован") {
                    navigate(LOGIN_ROUTE)
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш email...'
                        value={email}
                        onInput={e => setEmail(e.target.value)}
                    />
                </Form>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш password...'
                        value={password}
                        onInput={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                        {isLogin ?
                            <div>
                                нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        {isLogin ?
                            <Button
                                variant={"success"}
                                onClick={() => click(email, password)}
                            >
                                {"Войти"}
                            </Button>
                            :
                            <Button
                                variant={"outline-success"}
                                onClick={() => click(email, password)}
                            >
                                {"Регистрация"}
                            </Button>}
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})


export default Auth