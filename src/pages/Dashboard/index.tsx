import React, { useState, useEffect, useCallback } from 'react';

import { useIsFocused } from '@react-navigation/native';

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
  category: { title: string };
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
      const response = await api.get('transactions');
      const fetchedTransactions = response.data.transactions;
      const fetchedBalance = response.data.balance;

      setTransactions(fetchedTransactions);
      setBalance(fetchedBalance);
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
            lastTransactionSentence="Last billed on 10th DEC "
          />

          <Card
            title="Debit"
            ammount={Number(balance.outcome)}
            icon={Outcome}
            lastTransactionSentence="Last billed on 10th DEC"
          />

          <Card
            title="Total"
            ammount={Number(balance.total)}
            icon={Total}
            lastTransactionSentence="Yet to be billed"
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
            category={item.category.title}
          />
        )}
      />
      <Navigator currentPage="Dashboard" />
    </>
  );
};

export default Dashboard;
