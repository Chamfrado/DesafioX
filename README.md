# DesafioX
Desafio YouX


# Pastas

BackEnd -> Contém o projeto do back-end em Spring Boot com JAVA v11

FrontEnd -> Contèm o projeto do front-end em React.js



# Iniciando o Back-End


# Instalando o Maven
Para rodar nossa aplicação precisamos instalar o Maven, para mais informações sobre a instalação acesse: https://maven.apache.org
é importante testar se o terminal reconhece o comando mvn para continuar


# Iniciando o Banco de dados

O banco de dados usado no projeto é o PostgreSQL, para a instalação do mesmo acesse: https://www.postgresql.org/download/

Depois de instalado seguir os passos: 

1- Abrir o PG Admin e criar um banco de dados chamado "shop"
2- abrir o arquivo pom.xml e procure 

            <plugin>
   				<groupId>org.flywaydb</groupId>
    			<artifactId>flyway-maven-plugin</artifactId>
    			<version>7.15.0</version>
    			<configuration>
        			<url>jdbc:postgresql://localhost:porta_psql/shop</url>
       				<user>psql_user</user>
        			<password>psql_pass</password>
   				 </configuration>
			</plugin>

e substitua porta_psql pela porta em que o servidor sql esta rodando, psql_user pelo usuario e psql_pass pela senha

3- abrir o arquivo application.properties e preencher as mesmas credenciais
4- No terminal, navegue ate a pasta Back-End
5- rode o comando: mvn flyway:migrate

Pronto nossa estrutura de banco de dados está completa


# Iniciando o Projeto

Com o terminal na pasta BackEnd rode o comando: mvn spring-boot:run

E pronto , o aplicativo ja está rodando , você pode fazer as requisições usando postman ou inmsomnia


# Iniciando o Front End

para iniciar o front end você precisa ter o Node.js instalado, para mais instruções acesse: https://nodejs.org/en/download

# Instalando dependências

Após o node estar instalado e o terminal reconhecer o comando npm, navegue para a pasta front-end/youcontroll e rode o comando npm install

# Configurando back-end 

Na pasta src/services acesse o arquivo YouControllApi e coloque a url em que o back-end está rodando

# Rodando o app 

na pasta root do front-end rode o comando npm start

E pronto o app está rodando!

# Teste do front end

Os testes foram construidos usando o Selenium IDE, para a instalação do mesmo no google chrome acesse: https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd

após a instalação, abra o app e selecione " Open an existing project " e selecione o arquivo "YouControll-Front-EndTests.side" encontrado na pasta tests