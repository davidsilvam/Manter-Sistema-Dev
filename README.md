# Manter-Sistema-Dev
Sistema de consulta, inclusão e alteração de dados para a Squadra.

Tecnologias utilizadas

.Net Core 3.1 <br />
React <br />
SQL Server <br />

IDE  utilizada\
Visual Studio 2019

Para utilizar o sistema é preciso conectar ao projeto uma Conection String para um banco de dados em appsetings.js <br />

Exemplo:<br />
  "ConnectionStrings": {
    "manterSistema": "Data Source=DESKTOP-L2OS52O;Initial Catalog=manterSistema;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
  },
  \
  \
  Além disso, o banco de dados precisa satisfazer os Models criados no projeto para que o sistema consiga acessar as tabelas do banco corretamente.
