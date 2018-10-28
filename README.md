# dev-twitter-bot
Get trends at Twitter from real time tweets

#### Objetivo

Usar uma api com autenticação baseada em chave para criar um ranking de quantidade de tweets gerados com as palavras chave `bolsonaro`, `nfl`, `haddad`

#### Implementação

A metodologia utilizada foi a de coletar um conjunto de 3 tweets, 1 tweet para cada palavra chave, em ciclos de 30 segundos até totalizar 10 minutos.

- A cada ciclo de 30 segundos só seriam contabilizados para cada palavra chave os tweets distintos dos anteriormente coletados.

- Foram feitas chamadas na rota `search/tweets` para coletar os tweets por palavras chave

- Log constando o funcionamento do algoritmo durante os 10 minutos consta no repositório.