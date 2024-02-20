const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const users = [
  { email: 'biamaia@gmail.com', senha: 'senha123', nome: 'Beamaia' },
  { email: 'luisartur@gmail.com', senha: 'senha456', nome: 'Luisartur' },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const user = users.find(u => u.email === email && u.senha === senha);

  if (user) {
    res.render('profile', { user });
  } else {
    res.render('login', { error: 'Credenciais inválidas. Tente novamente.' });
  }
});

app.get('/users', (req, res) => {
  res.render('users', { users });
});

app.post('/delete-user', (req, res) => {
  const emailToDelete = req.body.email;
  const indexToDelete = users.findIndex(u => u.email === emailToDelete);

  if (indexToDelete !== -1) {
    users.splice(indexToDelete, 1);
  }

  res.redirect('/users');
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', (req, res) => {
  const { nome, email, senha, confirmSenha } = req.body;

  if (!nome || !email || !senha || !confirmSenha || senha !== confirmSenha) {
    res.render('register', { error: 'Por favor, preencha todos os campos corretamente.' });
    return;
  }

  if (users.some(u => u.email === email)) {
    res.render('register', { error: 'Este e-mail já está em uso. Tente outro.' });
    return;
  }

  const newUser = { nome, email, senha };
  users.push(newUser);

  res.redirect('/users');
});

app.listen(3000, () => {
  console.log(`Servidor iniciado em http://localhost:${3000}`);
});
