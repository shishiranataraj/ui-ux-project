import React, { useRef, useCallback, useState } from 'react';
import { TextInput, Alert, Keyboard } from 'react-native';
import { AsyncStorage } from 'react-native';


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
      console.log(data);
      const {title, type, value} = data;

      let income:any = await AsyncStorage.getItem('income')|| 0;
      let outcome:any = await AsyncStorage.getItem('outcome') || 0;
      const tsx = await AsyncStorage.getItem('transactions') || '[]';
      let transactions = JSON.parse(tsx);
      income = parseInt(income);
      outcome = parseInt(outcome);

      switch(type) {
        case 'INCOME': 
          income += parseInt(value);
          break;
        case 'OUTCOME':
          outcome += parseInt(value);
          break;
        
        default:
          break;
      }

      transactions = [...transactions, {title, type, value}];
      
      await AsyncStorage.setItem('income', income + '');
      await AsyncStorage.setItem('outcome', outcome + '');
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      navigator.navigate('Dashboard');
    },
    [navigator],
  );

  Keyboard.addListener('keyboardDidShow', () => setShowNavigation(false));
  Keyboard.addListener('keyboardDidHide', () => setShowNavigation(true));

  const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
}
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
            <Input
              ref={valueInputRef}
              name="type"
              placeholder="Type"
              returnKeyType="next"
              onSubmitEditing={() => categoryInputRef.current?.focus()}
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
