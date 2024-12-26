# DevTechW7 Dashboard

## **Visão Geral**

O **DevTechW7 Dashboard** é uma aplicação Vue 3 para gerenciamento de aplicações, controladores e dados relacionados a usuários. O projeto é modular, organizado e escalável, utilizando:
- **Componentes reutilizáveis** para UI.
- **Vue Router** para rotas dinâmicas.
- **Pinia** para gerenciamento de estado.
- **SCSS** para estilização avançada e consistente.

---

## **Estrutura do Projeto**
```plaintext
src/
├── assets/                # Imagens e outros recursos
├── components/            # Componentes reutilizáveis
├── enums/                 # Enums TypeScript para tipos e constantes
├── models/                # Modelos TypeScript para estrutura de dados
├── router/                # Configuração das rotas
├── services/              # Serviços para chamadas à API
├── store/                 # Gerenciamento de estado global (Pinia)
├── styles/                # SCSS com variáveis, mixins e estilos globais
├── views/                 # Páginas principais da aplicação
└── tests/                 # Testes unitários e E2E
```

# Documentação dos Componentes

## 1. **AlertDialog.vue**
### Descrição:
Componente para exibir diálogos de alerta.

### Propriedades (Props):
- **title** (String): Título do diálogo (default: "Alert").
- **message** (String): Mensagem do alerta (obrigatório).
- **visible** (Boolean): Define visibilidade (obrigatório).

### Eventos Emitidos:
- **close**: Quando o usuário fecha o diálogo.

### Exemplo de Uso:
```vue
<AlertDialog
  title="Erro"
  message="Ocorreu um erro."
  :visible="true"
  @close="handleClose"
/>
```

## 2. **ApplicationCard.vue**
### Descrição:
Exibe informações sobre uma aplicação.

### Propriedades (Props):
- **application**: (Object): Objeto da aplicação (obrigatório).
  
### Eventos Emitidos:
- **click**: Quando o card é clicado.
  
### Exemplo de Uso:
```vue
<ApplicationCard
  :application="app"
  @click="handleClick"
/>
```

## 3. **ApplicationList.vue**
### Descrição:
Lista de aplicações com busca dinâmica.

### Componentes Utilizados:
- ApplicationCard
  
### Estado Local:
- **applications**: Lista de aplicações carregadas.
- **loading**: Status de carregamento.

### Exemplo de Uso:
```vue
  <ApplicationList />
```

## 4. **CrudForm.vue**
### Descrição:
Formulário genérico para CRUD.

### Propriedades (Props):
- **data** (Object): Dados do formulário (obrigatório).
- **name** (String): Título do formulário (obrigatório).

### Eventos Emitidos:
- **save**: Quando os dados são salvos.

### Exemplo de Uso:
```vue
<CrudForm
  :data="formData"
  name="Formulário de Usuários"
  @save="handleSave"
/>
```

## 5. **LoadingButton.vue**
### Descrição:
Botão com feedback de carregamento.

### Propriedades (Props):
- **text** (String): Texto padrão (obrigatório).
- **loadingText** (String): Texto durante carregamento (default: "Carregando").
- **loading** (Boolean): Define estado de carregamento (default: false).

### Eventos Emitidos:
- **save**: Quando o botão é clicado.

### Exemplo de Uso:
```vue
<LoadingButton
  :loading="true"
  text="Salvar"
  loadingText="Salvando"
  @click="handleSubmit"
/>
```

## 6. **LoadingDialog.vue**
### Descrição:
Componente de diálogo de carregamento para feedback visual.

### Propriedades (Props):
- **visible** (Boolean): Controla a visibilidade do diálogo (obrigatório).
- **message** (String): Mensagem a ser exibida (default: "Carregando...").

### Exemplo de Uso:
```vue
<LoadingDialog
  :visible="isLoading"
  message="Processando dados..."
/>
```

## 7. **ConfirmationDialog.vue**
### Descrição:
Diálogo de confirmação para ações importantes.

### Propriedades (Props):
- **visible** (Boolean): Controla a visibilidade (obrigatório).
- **title** (String): Título do diálogo (default: "Confirmação").
- **message** (String): Mensagem de confirmação (obrigatório).

### Eventos Emitidos:
- **confirm**: Quando a ação é confirmada.
- **cancel**: Quando a ação é cancelada.

### Exemplo de Uso:
```vue
<ConfirmationDialog
  :visible="showConfirmation"
  message="Deseja prosseguir com esta ação?"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>
```

## 8. **Header.vue**
### Descrição:
Componente de cabeçalho da aplicação.

### Funcionalidades:
- Navegação principal
- Logo da aplicação
- Menu de usuário

### Exemplo de Uso:
```vue
<Header />
```

## 9. **Navigation.vue**
### Descrição:
Barra de navegação lateral com menu de opções.

### Funcionalidades:
- Links de navegação
- Controle de acesso baseado em permissões
- Indicador de rota ativa

### Exemplo de Uso:
```vue
<Navigation />
```

## 10. **UserForm.vue**
### Descrição:
Formulário para gerenciamento de usuários.

### Propriedades (Props):
- **user** (Object): Dados do usuário (opcional).
- **editing** (Boolean): Modo de edição (default: false).

### Eventos Emitidos:
- **save**: Quando o formulário é submetido.

### Exemplo de Uso:
```vue
<UserForm
  :user="userData"
  :editing="true"
  @save="handleSave"
/>
```

## 11. **AdvertisementForm.vue**
### Descrição:
Formulário para criação e edição de anúncios.

### Propriedades (Props):
- **advertisement** (Object): Dados do anúncio (opcional).
- **editing** (Boolean): Modo de edição (default: false).

### Eventos Emitidos:
- **save**: Quando o anúncio é salvo.

### Exemplo de Uso:
```vue
<AdvertisementForm
  :advertisement="adData"
  @save="handleSave"
/>
```

## 12. **AdvertisementPreview.vue**
### Descrição:
Visualização prévia de anúncios.

### Propriedades (Props):
- **advertisement** (Object): Dados do anúncio para preview (obrigatório).

### Exemplo de Uso:
```vue
<AdvertisementPreview
  :advertisement="adData"
/>
```

## 13. **AnalyticsEventCard.vue**
### Descrição:
Card para exibição de eventos analíticos.

### Propriedades (Props):
- **event** (Object): Dados do evento analítico (obrigatório).

### Exemplo de Uso:
```vue
<AnalyticsEventCard
  :event="eventData"
/>
```

## 14. **AccessRulesForm.vue**
### Descrição:
Formulário para configuração de regras de acesso.

### Propriedades (Props):
- **rules** (Array): Lista de regras de acesso (obrigatório).

### Eventos Emitidos:
- **save**: Quando as regras são salvas.

### Exemplo de Uso:
```vue
<AccessRulesForm
  :rules="accessRules"
  @save="handleSave"
/>
```

## 15. **CourseForm.vue**
### Descrição:
Formulário para gerenciamento de cursos.

### Propriedades (Props):
- **course** (Object): Dados do curso (opcional).
- **editing** (Boolean): Modo de edição (default: false).

### Eventos Emitidos:
- **save**: Quando o curso é salvo.

### Exemplo de Uso:
```vue
<CourseForm
  :course="courseData"
  :editing="true"
  @save="handleSave"
/>
```

## 16. **SendAdvertisement.vue**
### Descrição:
Componente para envio de anúncios.

### Propriedades (Props):
- **advertisement** (Object): Dados do anúncio para envio (obrigatório).

### Eventos Emitidos:
- **send**: Quando o anúncio é enviado.
- **cancel**: Quando o envio é cancelado.

### Exemplo de Uso:
```vue
<SendAdvertisement
  :advertisement="adData"
  @send="handleSend"
  @cancel="handleCancel"
/>
```

# Configuração das Rotas
- **/**: Página inicial (lista de aplicações).
- **/login**: Página de login.
- **/manage/:name**: Gerenciamento de controladores por aplicação.

# Gerenciamento de Estado
O gerenciamento de estado é feito com Pinia no arquivo store/application.ts.

# Métodos Principais
- **setApplications(applications: Application[])**: Armazena as aplicações no estado.
- **getApplicationByName(name: string)**: Retorna uma aplicação pelo nome.

# Fluxo de Dados
### 1. Login:
- O usuário insere as credenciais em **LoginView**.
- Credenciais enviadas via **axios** para o backend.
- Token salvo no **localStorage** após sucesso.
 ### 2. Lista de Aplicações:
- O componente **ApplicationList** busca dados via ApplicationService.
- Exibe as aplicações usando **ApplicationCard**.
### 3. Gerenciamento de Controladores:
- Página **ManageControllersView** carrega os dados do controlador e exibe formulários **(CrudForm)** para edição.

# Serviços de API
### ApplicationService.ts:
- **fetchApplications**: Busca todas as aplicações.
```ts
export async function fetchApplications(): Promise<Application[]> {
  const response = await axios.get('/applications');
  return response.data;
}
```
### ControllerService.ts:
- **fetchControllerData**: Busca dados de um controlador.
```ts
export async function fetchControllerData(controller: string) {
  const response = await axios.get(`/controllers/${controller}`);
  return response.data;
}
```
# Testes
### Testes Unitários:
- Localizados em **tests/.**
- Cobrem componentes principais como **ManageControllersView** e **ApplicationList**.
