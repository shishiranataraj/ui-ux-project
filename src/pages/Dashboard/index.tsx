import React, { useState, useEffect, useCallback } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';

import Income from '../../assets/income.svg';
import Outcome from '../../assets/outcome.svg';
import Total from '../../assets/total.svg';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Transaction from '../../components/Transaction';
import Navigator from '../../components/Navigator';

import api from '../../services/api';

import {
  Container,
  DashboardBody,
  CardScroll,
  Title,
  TransactionList,
  Footer,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Balance {
  total: string;
  income: string;
  outcome: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadData() {
      const income = await AsyncStorage.getItem('income') || 0;
      const outcome = await AsyncStorage.getItem('outcome') || 0;
      const transactions = JSON.parse(await AsyncStorage.getItem('transactions') || []);

      setBalance({income, outcome, total: income-outcome});
      setTransactions(transactions);
    }
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const DashBoardHeader = (
    <Container>
      <Header />
      <DashboardBody>
        <CardScroll>
          <Card
            title="Credit"
            ammount={Number(balance.income)}
            icon={Income}
          />

          <Card
            title="Debit"
            ammount={Number(balance.outcome)}
            icon={Outcome}
          />

          <Card
            title="Balance"
            ammount={Number(balance.total)}
            icon={Total}
            total
          />
        </CardScroll>

        <Title>List</Title>
      </DashboardBody>
    </Container>
  );

  return (
    <>
      <TransactionList
        ListHeaderComponent={DashBoardHeader}
        ListFooterComponent={Footer}
        data={transactions}
        keyExtractor={transaction => transaction.id}
        renderItem={({ item }: { item: Transaction }) => (
          <Transaction
            title={item.title}
            type={item.type}
            value={item.value}
          />
        )}
      />
      <Navigator currentPage="Dashboard" />
    </>
  );
};

export default Dashboard;
