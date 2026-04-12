# 🍦 Força Acamp 2026 — Plataforma de Inscrições

> **Tema:** "O Deus que destrói sonhos" — Rodrigo Bibo  
> **Data:** 18, 19 e 20 de Setembro de 2026

---

## ✅ Rodando localmente

```bash
npm install
npm run dev
# Abre em: http://localhost:5173
```

## 🏗️ Build para produção

```bash
npm run build
# Arquivos gerados em /dist
```

---

## 🌐 Deploy grátis no Vercel (recomendado)

1. Crie conta em [vercel.com](https://vercel.com)
2. Instale o Vercel CLI: `npm i -g vercel`
3. Na pasta do projeto: `vercel`
4. Siga os prompts — fica no ar em ~1 minuto ✅

---

## 🔐 Senha do ADM

Em `src/pages/LoginPage.jsx`, linha 3:
```js
const SENHA = 'forcaacamp2026'   // ← troque aqui
```

---

## 🗄️ SUPABASE — Passo a Passo Completo

O Supabase permite que **qualquer pessoa da equipe acesse as inscrições de qualquer dispositivo** (celular, computador, etc). É gratuito.

### Passo 1 — Criar conta e projeto

1. Acesse [supabase.com](https://supabase.com) e clique em **Start for free**
2. Faça login com GitHub ou e-mail
3. Clique em **New Project**
4. Preencha:
   - **Organization:** crie uma ou use a sua
   - **Name:** `forca-acamp-2026`
   - **Database Password:** anote em lugar seguro
   - **Region:** South America (São Paulo)
5. Aguarde ~2 minutos enquanto o projeto é criado

### Passo 2 — Criar a tabela de inscrições

1. No painel do Supabase, vá em **SQL Editor** (ícone de banco)
2. Clique em **New query**
3. Cole o SQL abaixo e clique em **Run**:

```sql
-- Criar tabela de inscrições
CREATE TABLE inscricoes (
  id              BIGSERIAL PRIMARY KEY,
  codigo          TEXT UNIQUE NOT NULL,
  nome            TEXT NOT NULL,
  lider           TEXT NOT NULL,
  equipe          TEXT NOT NULL,
  telefone        TEXT,
  idade           INTEGER,
  alergia         TEXT NOT NULL CHECK (alergia IN ('sim','nao')),
  alergia_desc    TEXT,
  barraca         TEXT NOT NULL CHECK (barraca IN ('sozinho','compartilhar','nao')),
  barraca_comp_qtd   INTEGER,
  barraca_comp_nomes TEXT,
  pagamento       TEXT NOT NULL CHECK (pagamento IN ('pix','dinheiro','debito','credito')),
  obs             TEXT,
  status          TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','confirmado','cancelado')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Permitir leitura/escrita pública (formulário de inscrição)
ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode inserir"
  ON inscricoes FOR INSERT WITH CHECK (true);

CREATE POLICY "Qualquer um pode ler"
  ON inscricoes FOR SELECT USING (true);

CREATE POLICY "Qualquer um pode atualizar status"
  ON inscricoes FOR UPDATE USING (true);

CREATE POLICY "Qualquer um pode deletar"
  ON inscricoes FOR DELETE USING (true);
```

### Passo 3 — Pegar as credenciais

1. No painel, vá em **Project Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public** key (começa com `eyJ...`)

### Passo 4 — Configurar o projeto

1. Na pasta do projeto, copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```

2. Abra o `.env` e preencha:
   ```env
   VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...sua_chave_aqui
   ```

3. Reinicie o servidor:
   ```bash
   npm run dev
   ```

4. ✅ O painel ADM mostrará **"🟢 Supabase conectado"**

### Passo 5 — Deploy com Supabase no Vercel

No Vercel, adicione as variáveis de ambiente:
1. Vá em **Project Settings** → **Environment Variables**
2. Adicione:
   - `VITE_SUPABASE_URL` = sua URL
   - `VITE_SUPABASE_ANON_KEY` = sua chave anon

---

## 📁 Estrutura do projeto

```
forca-acamp/
├── src/
│   ├── pages/
│   │   ├── FormPage.jsx      ← Formulário de inscrição
│   │   ├── LoginPage.jsx     ← Login do ADM
│   │   └── AdminPage.jsx     ← Painel ADM completo
│   ├── components/
│   │   ├── HeroIllustration.jsx  ← SVG fiel à capa
│   │   └── SuccessModal.jsx
│   ├── lib/
│   │   ├── supabase.js   ← Cliente Supabase
│   │   ├── storage.js    ← Supabase + fallback localStorage
│   │   ├── pdf.js        ← PDF com frases do livro
│   │   └── excel.js      ← Exportação Excel + resumo
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         ← Identidade visual completa (Poppins)
├── .env.example          ← Modelo de configuração
├── index.html
└── package.json
```

---

## 🎨 Identidade visual

Baseada fielmente na capa do livro "O Deus que destrói sonhos" de Rodrigo Bibo:
- **Fundo:** cinza calçada com textura de grid e trincas
- **Cor principal:** rosa neon `#FF1A8C`
- **Tipografia:** Poppins 400–900
- **Ilustração:** casquinha de sorvete caída, splash rosa, tênis azul-ciano
- **PDF:** inclui frase aleatória do livro em cada comprovante
