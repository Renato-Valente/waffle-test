# Case Desenvolvimento Waffle
Olá, amigos. Obrigado pela oportunidade que me deram de participar desde processo seletivo.
Este é o repositório da aplicação. Eu vou demonstrar como se pode rodar o projeto localmente
na sua máquima, mas, se preferir, você também pode acessar este [link](https://waffle-test-front.onrender.com/public/) onde a aplicação está hospedada.\


## Como Rodar o projeto localmente
Após clonar o repositório, você vai se deparar com dois diretórios: /frontend e /backend.
Você já deve imaginar pelo que cada um deles é responsável 😅 \
Cada diretório é uma aplicação diferente, mas graças ao módulo node 'concurrently', nós podemos executar as duas aplicações simultaneamente. Basta digitar o comando ``` npm run start ```
no diretório raiz do projeto que ambas as aplicações serão executadas juntas. Voce pode, porém, executa-las separadamente caso deseje.\
Pra rodar o backend você deve primeiro se mudar para o diretório dele com o commando ``` cd backend ``` e então executar o comando ``` node app.js ``` para subir o servidor. \
Para rodar o frontend você deve se mover para o diretório com ``` cd frontend ``` e então executar este comando: ``` npm run dev ```. Caso tudo corra bem, você verá o endereço para acessar
as páginas com o seu navegador ser imprimida no seu terminal. O endereço deverá ser algo como ``` http://localhost:5173 ```  \ 

Antes de rodar as aplicações, não se esqueça de instalar todas as dependências necessárias com o comando ``` npm install ```  \

## Adicionando dados no banco
É possível adicionar dados na tabela de histórico de leitura fazendo uma requisição POST para este [endereço](https://waffle-test.onrender.com)\
Junto com a requisição, é necessário enviar um payload com este formato:\
{\
	"email": "teste@teste.com",\
	"id":"4244",\
	"titulo": "titulo qualquer",\
	"utm_source": "facebook",\
	"utm_medium":"socialpaid",\
	"utm_campaign": "12/12/2024",\
	"utm_channel": "web"\
}\
Os campos email, id e título são obrigatórios

## dados para login
Existem três usuários cadastrados no banco de dados:\
teste@teste.com (senha: senha)\
renatinho@teste.com (senha: 123456)\
nala@gatinha.com senha (soneca)\
Você pode popular o banco de dados com registros de leituras usando estes emails e depois vê-los serem listados na página principal <br><br>
Não é possível acessar a [página principal](https://waffle-test-front.onrender.com/public/) sem antes ter realizado o login com um desses usuários. Caso o usuário tente acessar a página principal sem estar logado, ele será redirecionado para a [página de login](https://waffle-test-front.onrender.com/public/login) automaticamente.

## banco de dados
Caso você queira rodar o projeto localmente, você precisará criar o seu próprio banco de dados.\
Após criar o seu banco posgresql, crie um arquivo .env e insira as credenciais do seu banco nele.\
Os valores esperados são os seguintes:\
DB_HOST\
DB_PORT\
DB_USER\
DB_PASSWORD\
DB_NAME

