import React, { useRef, useCallback, useState } from 'react';
import { TextInput, Alert, Keyboard } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Header from '../../components/Header';
import Input from '../../components/Input';
import TypeSelector from '../../components/TypeSelector';
import Navigator from '../../components/Navigator';

import { Container, Content, Title, Button, ButtonText } from './styles';

import api from '../../services/api';

const FormPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const valueInputRef = useRef<TextInput>(null);
  const categoryInputRef = useRef<TextInput>(null);

  const [showNavigation, setShowNavigation] = useState(true);

  const navigator = useNavigation();

  const handleFormSubmit = useCallback(
    async (data: FormData) => {
      await api.post('transactions', data);

      Alert.alert(
        'Transação realizada com sucesso!',
        'Você pode verificar as informações dela na página inicial!',
      );

      navigator.navigate('Dashboard');
    },
    [navigator],
  );

  Keyboard.addListener('keyboardDidShow', () => setShowNavigation(false));
  Keyboard.addListener('keyboardDidHide', () => setShowNavigation(true));

  return (
    <>
      <Container>
        <Header small />

        <Content>
          <Title>Enter new transaction</Title>

          <Form ref={formRef} onSubmit={handleFormSubmit}>
            <Input
              name="title"
              placeholder="Name"
              returnKeyType="next"
              onSubmitEditing={() => valueInputRef.current?.focus()}
            />
            <Input
              ref={valueInputRef}
              name="value"
              placeholder="Cost"
              returnKeyType="next"
              onSubmitEditing={() => categoryInputRef.current?.focus()}
            />
            <TypeSelector name="type" />
            <Input
              ref={categoryInputRef}
              name="category"
              placeholder="Category"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              <ButtonText>Enter</ButtonText>
            </Button>
          </Form>
        </Content>
        <Navigator currentPage="FormPage" />
      </Container>
    </>
  );
};

export default FormPage;
