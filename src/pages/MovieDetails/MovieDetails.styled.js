import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  > div {
    height: 400px;
    width: 250px;
  }
`;

export const ContainerDescription = styled.div`
  margin-left: 20px;
  flex-grow: 1;

  > h1,
  h2,
  h3 {
    margin-bottom: 10px;
    margin-top: 30px;
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
`;

export const AdditionalInformation = styled.div`
  margin: 20px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 10px 0;
  > p {
    margin-bottom: 10px;
  }
`;
