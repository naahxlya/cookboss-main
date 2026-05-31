# 🍳 CookBoss

O CookBoss é um aplicativo web completo para gerenciamento de receitas, desenvolvido para o curso de **Programação Web**.

A plataforma permite que os usuários naveguem, criem, editem, excluam e adicionem receitas aos favoritos por meio de uma interface moderna e responsiva.

Este projeto foi desenvolvido para demonstrar os conceitos estudados durante o curso, incluindo:

* Desenvolvimento de aplicações web
* Frameworks de front-end
* Frameworks de back-end
* APIs REST
* Operações CRUD
* Controle de versão com Git
* Implantação e hospedagem
* Design responsivo
* Planejamento de projetos e gerenciamento de backlog

---

## 📌 Funcionalidades

### Gerenciamento de Receitas (CRUD)

* Criar novas receitas
* Visualizar todas as receitas
* Editar receitas existentes
* Excluir receitas com confirmação

### Detalhes da Receita

Cada receita inclui:

* Nome
* Categoria
* Tempo de preparo
* Nível de dificuldade
* Ingredientes
* Passos de preparo
* Imagem

### Busca e Filtros

* Buscar receitas por nome
* Filtrar por categoria
* Filtrar por dificuldade

### Favoritos

* Salvar receitas favoritas
* Favoritos armazenados permanentemente

### UI/UX

* Design responsivo (desktop + mobile)
* Interface moderna com tema gastronômico
* Modo escuro
* Notificações (Toast) Notificações
* Estados de carregamento
* Estados vazios

---

## 🛠️ Tecnologias Utilizadas

### Front-end

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Router

### Back-end

* Backend Lovable Cloud
* Funções de servidor
* Rotas de API REST

### Outras Ferramentas

* Git e GitHub
* Implantação Vercel / Lovable

---

## 📂 Estrutura do Projeto

```bash
src/
├── components/
│ ├── Navbar
│ ├── RecipeCard
│ ├── SearchBar
│ ├── Footer
│ └── UI componentes
│
├── rotas/
│ ├── índice
│ ├── receitas
│ ├── favoritos
│ ├── adicionar-receita
│ ├── editar-receita
│ └── api
│
├── lib/
│ ├── utilitários
│ └── funções de backend
```

---

## 🔌 Endpoints da API

```http
GET /api/recipes
GET /api/recipes/:id
POST /api/recipes
PUT /api/recipes/:id
DELETE /api/recipes/:id
```

---

## 🚀 Instalação

### Clonar o repositório

```bash
git clone https://github.com/naahxlya/cook-boss.git
```

### Acessar a pasta

```bash
cd cook-boss
```

### Instalar dependências

```bash
npm install
```

### Executar localmente

```bash
npm run dev
```

---

## 📱 Responsividade

O aplicativo foi testado para:

* Desktop
* Tablet
* Dispositivos móveis

---

## 📖 Objetivos Acadêmicos Abordados

Este projeto abrange os seguintes tópicos do curso:

* Tipos de Aplicativos Web
* Planejamento do Backlog
* Wireframes
* Git e Controle de Versão
* Branches e Merge
* Implantação e Hospedagem
* HTML
* CSS
* JavaScript
* React
* Ecossistema Node
* APIs
* Métodos HTTP
* Troca de dados JSON
* Implementação CRUD
* Testes e documentação

---

## 👩‍💻 Autora

Desenvolvido por **Nathalya e Letícia** para fins acadêmicos.

GitHub: https://github.com/naahxlya/cookboss

---

## 📄 Licença

Este projeto destina-se exclusivamente a fins educacionais.
