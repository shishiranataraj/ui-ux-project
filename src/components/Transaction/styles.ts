import styled from 'styled-components/native';

interface AmmountProps {
  type: 'income' | 'outcome';
}

export const Container = styled.View`
  width: 88%;
  margin: 0 auto 8px;
  height: 128px;

  background-color: #fff;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  line-height: 21px;

  color: #363f5f;
`;

export const TitleContainer = styled.View`
  margin-top: 16px;
  margin-left: 24px;
`;

export const Ammount = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 20px;
  line-height: 30px;

  margin-top: 2px;

  color: ${({ type }: AmmountProps) =>
    type === 'income' ? '#12a454' : '#E83F5B'};
`;

export const TransactionFooter = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

export const TypeContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-left: 29px;
  margin-top: 20px;
`;

export const IconContainer = styled.View`
  margin-right: 16px;
`;

export const Type = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 14px;
  line-height: 21px;

  color: #969cb3;
`;

export const Date = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 14px;
  line-height: 21px;

  color: #969cb3;

  margin-right: 24px;
`;
