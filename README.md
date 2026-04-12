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
