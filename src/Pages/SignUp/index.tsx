import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  Container,
  AnimationContainer,
  Content,
  Header,
  ImageLogin,
} from './styles';

import pokeballLogo from '../../assets/images/pokeball.svg';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Insira um nome.'),
        email: Yup.string().required('Insira um e-mail.').email(),
        password: Yup.string()
          .required()
          .matches(
            /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[0-9]){2})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            `A senha deve conter pelo menos 6 caracteres, 
            uma letra maiúscula, uma letra minúscula, 
            2 números e uma caractere especial.`,
          ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <ImageLogin />
      <Content>
        <AnimationContainer>
          <Header>
            <img src={pokeballLogo} alt="pokeball" />
            <div>
              <h1>POKEDEX</h1>
            </div>
          </Header>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para o Login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
